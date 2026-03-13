import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const PROJECT_ROOT = process.cwd();

const SOURCE_DIR = path.join(PROJECT_ROOT, 'src');
const ROOT_CONFIG_EXTENSIONS = new Set(['.js', '.jsx']);
const SOURCE_EXTENSIONS = new Set(['.js', '.jsx', '.scss']);

const EXCLUDED_DIR_NAMES = new Set(['node_modules', 'dist', 'out']);
const EXCLUDED_RELATIVE_PREFIXES = ['public/fonts/'];
const EXCLUDED_FILES = new Set(['package-lock.json']);

const HEADER_MARKER = 'SPDX-License-Identifier: GPL-3.0-only';
const HEADER_LINES = [
  'Copyright (c) 2025 GEInfoEdu',
  HEADER_MARKER,
  'Author: Auri Gabriel Castro de Melo',
];

function toPosixPath(filePath) {
  return filePath.split(path.sep).join('/');
}

function getRelativePath(filePath) {
  return toPosixPath(path.relative(PROJECT_ROOT, filePath));
}

function isExcludedPath(filePath) {
  const relativePath = getRelativePath(filePath);

  if (EXCLUDED_FILES.has(relativePath)) {
    return true;
  }

  if (
    EXCLUDED_RELATIVE_PREFIXES.some((prefix) => relativePath.startsWith(prefix))
  ) {
    return true;
  }

  const segments = relativePath.split('/');
  return segments.some((segment) => EXCLUDED_DIR_NAMES.has(segment));
}

function buildBlockComment() {
  return `/*\n * ${HEADER_LINES.join('\n * ')}\n */\n\n`;
}

function findInsertionIndex(content) {
  if (content.startsWith('#!')) {
    const newLineIndex = content.indexOf('\n');
    if (newLineIndex === -1) {
      return content.length;
    }
    return newLineIndex + 1;
  }

  if (content.charCodeAt(0) === 0xfeff) {
    return 1;
  }

  return 0;
}

function normalizeExistingHeader(content, insertionIndex, blockComment) {
  const prefix = content.slice(0, insertionIndex);
  const body = content.slice(insertionIndex);
  const blockCommentMatch = body.match(/^\/\*[\s\S]*?\*\/\n*/);

  if (!blockCommentMatch) {
    return null;
  }

  const currentHeader = blockCommentMatch[0];
  if (!currentHeader.includes(HEADER_MARKER)) {
    return null;
  }

  const normalizedBody = blockComment + body.slice(currentHeader.length);
  const normalizedContent = prefix + normalizedBody;

  if (normalizedContent === content) {
    return null;
  }

  return normalizedContent;
}

async function addHeaderToFile(filePath) {
  if (isExcludedPath(filePath)) {
    return { changed: false, reason: 'excluded' };
  }

  const content = await fs.readFile(filePath, 'utf8');
  const insertionIndex = findInsertionIndex(content);
  const blockComment = buildBlockComment();

  const normalizedContent = normalizeExistingHeader(
    content,
    insertionIndex,
    blockComment,
  );
  if (normalizedContent) {
    await fs.writeFile(filePath, normalizedContent, 'utf8');
    return { changed: true, reason: 'header-normalized' };
  }

  if (content.includes(HEADER_MARKER)) {
    return { changed: false, reason: 'already-present' };
  }

  const updatedContent =
    content.slice(0, insertionIndex) +
    blockComment +
    content.slice(insertionIndex);

  await fs.writeFile(filePath, updatedContent, 'utf8');
  return { changed: true, reason: 'header-added' };
}

async function walkDirectory(directoryPath, extensions, acc = []) {
  const entries = await fs.readdir(directoryPath, { withFileTypes: true });

  for (const entry of entries) {
    const entryPath = path.join(directoryPath, entry.name);

    if (entry.isDirectory()) {
      if (EXCLUDED_DIR_NAMES.has(entry.name)) {
        continue;
      }
      await walkDirectory(entryPath, extensions, acc);
      continue;
    }

    if (!entry.isFile()) {
      continue;
    }

    const extension = path.extname(entry.name);
    if (extensions.has(extension)) {
      acc.push(entryPath);
    }
  }

  return acc;
}

async function getTargetFiles() {
  const files = [];

  try {
    const sourceFiles = await walkDirectory(SOURCE_DIR, SOURCE_EXTENSIONS);
    files.push(...sourceFiles);
  } catch (error) {
    if (error.code !== 'ENOENT') {
      throw error;
    }
  }

  const rootEntries = await fs.readdir(PROJECT_ROOT, { withFileTypes: true });
  for (const entry of rootEntries) {
    if (!entry.isFile()) {
      continue;
    }

    const extension = path.extname(entry.name);
    if (!ROOT_CONFIG_EXTENSIONS.has(extension)) {
      continue;
    }

    const fullPath = path.join(PROJECT_ROOT, entry.name);
    if (!isExcludedPath(fullPath)) {
      files.push(fullPath);
    }
  }

  return files;
}

async function run() {
  const files = await getTargetFiles();

  let changedCount = 0;
  let skippedCount = 0;

  for (const file of files) {
    const result = await addHeaderToFile(file);
    if (result.changed) {
      changedCount += 1;
      console.log(`updated: ${getRelativePath(file)}`);
    } else {
      skippedCount += 1;
    }
  }

  console.log(
    `\nDone. Updated ${changedCount} file(s), skipped ${skippedCount} file(s).`,
  );
}

run().catch((error) => {
  console.error('Failed to add headers:', error);
  throw error;
});
