import React, { useEffect, useRef } from 'react';
import pell from 'pell';
import 'pell/dist/pell.min.css';

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
  const editorRef = useRef(null);
  const pellInstance = useRef(null);

  useEffect(() => {
    // Only initialize once
    if (!editorRef.current || pellInstance.current) return;

    pellInstance.current = pell.init({
      element: editorRef.current,
      onChange: (html) => {
        onAnswerChange(question.id, html);
      },
      defaultParagraphSeparator: 'p',
      styleWithCSS: false,
      actions: [
        'bold',
        'italic',
        'underline',
        'strikethrough',
        'heading1',
        'heading2',
        'paragraph',
        'quote',
        'olist',
        'ulist',
        'link',
        'image',
      ],
    });

    // Set initial value
    pellInstance.current.content.innerHTML = answer || '';

    return () => {
      pellInstance.current = null;
      if (editorRef.current) editorRef.current.innerHTML = '';
    };
  }, [question.id, onAnswerChange]);

  // Update content when "answer" changes externally
  useEffect(() => {
    if (
      pellInstance.current &&
      pellInstance.current.content &&
      pellInstance.current.content.innerHTML !== answer
    ) {
      pellInstance.current.content.innerHTML = answer || '';
    }
  }, [answer]);

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
          <div
            id={`answer-${question.id}`}
            ref={editorRef}
            style={{
              border: '1px solid #ccc',
              borderRadius: '4px',
              minHeight: 100,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default QuestionAccordion;
