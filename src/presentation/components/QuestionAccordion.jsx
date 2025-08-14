import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const answerLabel = {
  en: 'Your answer:',
  pt_BR: 'Sua resposta:',
};

const characterCountLabel = {
  en: 'Characters:',
  pt_BR: 'Caracteres:',
};

const wordCountLabel = {
  en: 'Words:',
  pt_BR: 'Palavras:',
};

// Helper function to strip HTML tags and get plain text
const stripHtml = (html) => {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
};

// Helper function to count characters (excluding HTML tags)
const getCharacterCount = (html) => {
  const plainText = stripHtml(html);
  return plainText.length;
};

// Helper function to count words (excluding HTML tags)
const getWordCount = (html) => {
  const plainText = stripHtml(html);
  const words = plainText.trim().split(/\s+/);
  return plainText.trim() === '' ? 0 : words.length;
};

function QuestionAccordion({
  groupKey,
  stepKey,
  question,
  language,
  answer,
  onAnswerChange,
}) {
  const placeholder = question.placeholders?.[language] || '';
  const characterCount = getCharacterCount(answer || '');
  const wordCount = getWordCount(answer || '');

  return (
    <div className='accordion-item'>
      <h2
        className='accordion-header'
        id={`heading-${groupKey}-${stepKey}-q${question.id}`}
      >
        <button
          className='accordion-button collapsed'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target={`#collapse-${groupKey}-${stepKey}-q${question.id}`}
          aria-expanded='false'
          aria-controls={`collapse-${groupKey}-${stepKey}-q${question.id}`}
        >
          {question.texts[language]}
        </button>
      </h2>
      <div
        id={`collapse-${groupKey}-${stepKey}-q${question.id}`}
        className='accordion-collapse collapse'
        aria-labelledby={`heading-${groupKey}-${stepKey}-q${question.id}`}
      >
        <div className='accordion-body'>
          <label htmlFor={`answer-${question.id}`} className='form-label'>
            <i className='bi bi-pencil-square me-2'></i>
            {answerLabel[language]}
          </label>
          <CKEditor
            editor={ClassicEditor}
            data={answer}
            config={{
              placeholder: placeholder,
            }}
            onChange={(_, editor) => {
              const data = editor.getData();
              onAnswerChange(question.id, data);
            }}
          />
          <div className='mt-2 text-muted small'>
            <span className='me-3'>
              <i className='bi bi-textarea-t me-1'></i>
              {characterCountLabel[language]} {characterCount}
            </span>
            <span>
              <i className='bi bi-journal-text me-1'></i>
              {wordCountLabel[language]} {wordCount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionAccordion;
