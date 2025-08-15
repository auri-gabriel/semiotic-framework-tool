import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const texts = {
  en: {
    answerLabel: 'Your answer:',
    characterCount: 'Characters:',
    wordCount: 'Words:',
  },
  pt_BR: {
    answerLabel: 'Sua resposta:',
    characterCount: 'Caracteres:',
    wordCount: 'Palavras:',
  },
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
  const t = texts[language];
  const placeholder = question.placeholders?.[language] || '';
  const characterCount = getCharacterCount(answer || '');
  const wordCount = getWordCount(answer || '');

  // Check if the question has a meaningful answer
  const hasAnswer = answer && stripHtml(answer).trim().length > 0;

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
          <div className='d-flex align-items-center w-100'>
            <span className='me-2'>
              {hasAnswer ? (
                <i
                  className='bi bi-check-circle-fill text-success'
                  aria-hidden='true'
                ></i>
              ) : (
                <i className='bi bi-circle text-muted' aria-hidden='true'></i>
              )}
            </span>
            <span>{question.texts[language]}</span>
          </div>
        </button>
      </h2>
      <div
        id={`collapse-${groupKey}-${stepKey}-q${question.id}`}
        className='accordion-collapse collapse'
        aria-labelledby={`heading-${groupKey}-${stepKey}-q${question.id}`}
      >
        <div className='accordion-body'>
          <label htmlFor={`answer-${question.id}`} className='form-label'>
            <i className='bi bi-pencil-square me-2' aria-hidden='true'></i>
            {t.answerLabel}
          </label>
          <ReactQuill
            value={answer || ''}
            onChange={(content) => {
              onAnswerChange(question.id, content);
            }}
            placeholder={placeholder}
            theme='snow'
            modules={{
              toolbar: [
                [{ header: [1, 2, 3, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                // Deactivate the ordered list because it's currently bugged on the html2pdf.js rendering
                // TODO: Fix the rendering of ordered lists, maybe even refactor the whole pdf rendering pipeline
                // [{ list: 'ordered' }, { list: 'bullet' }],
                [{ list: 'bullet' }],
                ['link'],
                ['clean'],
              ],
            }}
            formats={[
              'header',
              'bold',
              'italic',
              'underline',
              'strike',
              'list',
              'link',
            ]}
            preserveWhitespace={false}
          />
          <div className='mt-2 text-muted small'>
            <span className='me-3'>
              <i className='bi bi-textarea-t me-1' aria-hidden='true'></i>
              {t.characterCount} {characterCount}
            </span>
            <span>
              <i className='bi bi-journal-text me-1' aria-hidden='true'></i>
              {t.wordCount} {wordCount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionAccordion;
