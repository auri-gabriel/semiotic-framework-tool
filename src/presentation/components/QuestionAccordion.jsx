import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const answerLabel = {
  en: 'Your answer:',
  pt_BR: 'Sua resposta:',
};

const questionTexts = {
  en: {
    required: 'Required',
    optional: 'Optional',
    answered: 'Answered',
    unanswered: 'Not answered',
  },
  pt_BR: {
    required: 'Obrigatório',
    optional: 'Opcional',
    answered: 'Respondida',
    unanswered: 'Não respondida',
  },
};

function QuestionAccordion({
  groupKey,
  stepKey,
  question,
  questionIndex,
  language,
  answer,
  onAnswerChange,
}) {
  const placeholder = question.placeholders?.[language] || '';
  const t = questionTexts[language];
  const isAnswered = answer && answer.trim() !== '';

  return (
    <div className='accordion-item border mb-2 rounded overflow-hidden'>
      <h2
        className='accordion-header'
        id={`heading-${groupKey}-${stepKey}-q${question.id}`}
      >
        <button
          className={`accordion-button collapsed ${
            isAnswered ? 'bg-light' : ''
          }`}
          type='button'
          data-bs-toggle='collapse'
          data-bs-target={`#collapse-${groupKey}-${stepKey}-q${question.id}`}
          aria-expanded='false'
          aria-controls={`collapse-${groupKey}-${stepKey}-q${question.id}`}
        >
          <div className='d-flex align-items-center justify-content-between w-100 me-3'>
            <div className='d-flex align-items-start'>
              <div
                className={`rounded me-3 d-flex align-items-center justify-content-center ${
                  isAnswered ? 'bg-success' : 'bg-light border'
                }`}
                style={{ width: '24px', height: '24px', minWidth: '24px' }}
              >
                {isAnswered ? (
                  <i className='bi bi-check text-white small'></i>
                ) : (
                  <span className='text-muted' style={{ fontSize: '0.7rem' }}>
                    {questionIndex + 1}
                  </span>
                )}
              </div>
              <div className='text-start'>
                <div className='fw-medium'>{question.texts[language]}</div>
                <small className='text-muted'>
                  {isAnswered ? t.answered : t.unanswered}
                </small>
              </div>
            </div>
            <div className='flex-shrink-0'>
              {isAnswered && (
                <i className='bi bi-check-circle-fill text-success me-2'></i>
              )}
            </div>
          </div>
        </button>
      </h2>
      <div
        id={`collapse-${groupKey}-${stepKey}-q${question.id}`}
        className='accordion-collapse collapse'
        aria-labelledby={`heading-${groupKey}-${stepKey}-q${question.id}`}
      >
        <div className='accordion-body bg-white p-4'>
          <div className='mb-3'>
            <label
              htmlFor={`answer-${question.id}`}
              className='form-label fw-semibold mb-3'
            >
              <i className='bi bi-pencil-square me-2'></i>
              {answerLabel[language]}
            </label>
            <div className='border rounded p-1' style={{ minHeight: '200px' }}>
              <CKEditor
                editor={ClassicEditor}
                data={answer}
                config={{
                  placeholder: placeholder,
                  toolbar: [
                    'heading',
                    '|',
                    'bold',
                    'italic',
                    'link',
                    'bulletedList',
                    'numberedList',
                    '|',
                    'outdent',
                    'indent',
                    '|',
                    'blockQuote',
                    'insertTable',
                    'undo',
                    'redo',
                  ],
                }}
                onChange={(_, editor) => {
                  const data = editor.getData();
                  onAnswerChange(question.id, data);
                }}
              />
            </div>
          </div>

          {isAnswered && (
            <div className='alert alert-success border-0 py-2 mb-0'>
              <small>
                <i className='bi bi-check-circle me-2'></i>
                {t.answered} • {answer.replace(/<[^>]*>/g, '').length}{' '}
                characters
              </small>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default QuestionAccordion;
