import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const answerLabel = {
  en: 'Your answer:',
  pt_BR: 'Sua resposta:',
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
        </div>
      </div>
    </div>
  );
}

export default QuestionAccordion;
