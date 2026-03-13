/*
 * Copyright (c) 2025 GEInfoEdu
 * SPDX-License-Identifier: GPL-3.0-only
 * Author: Auri Gabriel Castro de Melo
 */

const DEFAULT_PROJECT_TITLE = 'project';

function pad(value) {
  return String(value).padStart(2, '0');
}

export function generateTimestamp(date = new Date()) {
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hour = pad(date.getHours());
  const minute = pad(date.getMinutes());
  const second = pad(date.getSeconds());

  return `${year}${month}${day}-${hour}${minute}${second}`;
}

export function sanitizeProjectTitle(projectTitle = '') {
  const normalized = String(projectTitle).trim().toLowerCase();
  const slug = normalized.replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

  return slug || DEFAULT_PROJECT_TITLE;
}

export function sanitizeExportType(exportType = '') {
  const normalized = String(exportType).trim().toLowerCase();
  return normalized.replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

export function buildExportFileBaseName(
  projectMetadata = {},
  date = new Date(),
  exportType = '',
) {
  const projectTitle = sanitizeProjectTitle(projectMetadata?.title);
  const timestamp = generateTimestamp(date);
  const type = sanitizeExportType(exportType);
  return type
    ? `${projectTitle}-${type}-${timestamp}`
    : `${projectTitle}-${timestamp}`;
}
