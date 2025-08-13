import React from 'react';

const ProgressIndicator = ({
  current,
  total,
  language,
  className = '',
  showText = true,
  variant = 'primary',
}) => {
  const percentage = total > 0 ? Math.round((current / total) * 100) : 0;

  const progressTexts = {
    en: {
      answered: 'answered',
      of: 'of',
      questions: 'questions',
      progress: 'Progress',
    },
    pt_BR: {
      answered: 'respondidas',
      of: 'de',
      questions: 'perguntas',
      progress: 'Progresso',
    },
  };

  const t = progressTexts[language] || progressTexts.en;

  return (
    <div className={`progress-indicator ${className}`}>
      {showText && (
        <div className='d-flex justify-content-between align-items-center mb-2'>
          <small className='text-muted'>
            {t.progress}: {current} {t.of} {total} {t.questions} {t.answered}
          </small>
          <small className='text-muted fw-bold'>{percentage}%</small>
        </div>
      )}
      <div className='progress' style={{ height: '8px' }}>
        <div
          className={`progress-bar bg-${variant}`}
          role='progressbar'
          style={{ width: `${percentage}%` }}
          aria-valuenow={percentage}
          aria-valuemin='0'
          aria-valuemax='100'
        ></div>
      </div>
    </div>
  );
};

export default ProgressIndicator;
