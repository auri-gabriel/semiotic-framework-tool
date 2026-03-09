import React, { useEffect, useState } from 'react';
import Tooltip from 'bootstrap/js/dist/tooltip';
import SemioticAccordion from '../components/SemioticAccordion';
import BottomToolbar from '../components/BottomToolbar';
import { useLanguage } from '../hooks/useLanguage';
import { useSemioticData } from '../hooks/useSemioticData';
import { useAnswers } from '../hooks/useAnswers';
import { useExport } from '../hooks/useExport';
import SectionTitle from '../components/SectionTitle';

const texts = {
  en: {
    title: 'Start',
    projectInfoTitle: 'Project Information',
    projectMetadataAccordionTitle: 'Project Metadata',
    projectInfoHelper: 'project title, focal problem, and authorship.',
    projectTitleLabel: 'Project Title',
    projectTitlePlaceholder: 'Enter the project title',
    focalProblemLabel: 'Focal Problem',
    focalProblemPlaceholder:
      'Describe the central problem this project aims to solve',
    authorshipLabel: 'Authorship',
    authorshipPlaceholder: 'Person, team, or organization responsible',
    intro:
      "Ready to get started? First, fill in the project information — project title, focal problem, and authorship. Then select one of the blocks related to human information functions or the information technology (IT) platform to display the related questions. It's quick and easy — just read and answer.\n\nEach block corresponds to a step in Ronald Stamper's Semiotic Framework. The questions were designed to help software engineers, in collaboration with experts in the educational domain, specify the human and technical aspects involved in developing software for this domain.",
    newFormSuggestion:
      'Starting a new project? Choose one of the cleanup options below based on what you want to keep.',
    clearActionsTitle: 'What each option clears:',
    definitionsTooltip:
      "Definitions are the tool's customized question settings (for example, edited/imported question texts and structure).",
    clearAnswers: 'Clear Responses (Keep Settings)',
    clearAnswersDesc: 'Delete all saved responses but keep custom definitions',
    clearAnswersScopePrefix:
      'Removes: answers only • Keeps: project information and ',
    clearAnswersScopeHighlighted: 'customized definitions',
    clearAll: 'Reset Tool (Clear Everything)',
    clearAllDesc: 'Delete all saved responses and reset definitions to default',
    clearAllScopePrefix: 'Removes: answers, project information, and ',
    clearAllScopeHighlighted: 'customized definitions',
    clearAllScopeSuffix: ' • Restores default tool definitions',
    clearAnswersConfirmTitle: 'Clear Answers Only',
    clearAnswersConfirmMessage:
      'Are you sure you want to delete all your responses? Your custom definitions will be preserved. This action cannot be undone.',
    clearAllConfirmTitle: 'Clear All & Reset Definitions',
    clearAllConfirmMessage:
      'Are you sure you want to delete all your responses and reset questions to default? This action cannot be undone.',
    clearConfirmButton: 'Yes, Clear',
    clearAllConfirmButton: 'Yes, Clear All',
    cancelButton: 'Cancel',
  },
  pt_BR: {
    title: 'Iniciar',
    projectInfoTitle: 'Informações do Projeto',
    projectMetadataAccordionTitle: 'Metadados do Projeto',
    projectInfoHelper:
      'título do projeto, problema focal e autoria.',
    projectTitleLabel: 'Título do Projeto',
    projectTitlePlaceholder: 'Digite o título do projeto',
    focalProblemLabel: 'Problema Focal',
    focalProblemPlaceholder:
      'Descreva o problema central que este projeto busca resolver',
    authorshipLabel: 'Autoria',
    authorshipPlaceholder: 'Pessoa, equipe ou organização responsável',
    intro:
      'Tudo pronto para começar? Inicialmente, preencha as informações sobre o projeto — título do projeto, problema focal e a autoria. Em seguida, selecione um dos blocos relacionados às funções humanas da informação ou à plataforma de tecnologia da informação (TI) para mostrar as perguntas relacionadas. É simples e rápido — basta ler e responder.\n\nCada bloco corresponde a um degrau do Framework Semiótico de Ronald Stamper. Já as questões foram propostas para auxiliar engenheiros de software, em colaboração com especialistas do Domínio Educacional, na especificação de aspectos humanos e técnicos envolvidos no desenvolvimento de software para esse domínio.',
    newFormSuggestion:
      'Começando um novo projeto? Escolha abaixo a opção de limpeza conforme o que você deseja manter.',
    clearActionsTitle: 'O que cada opção limpa:',
    definitionsTooltip:
      'Definições são as personalizações das perguntas da ferramenta (por exemplo, textos e estrutura editados/importados).',
    clearAnswers: 'Limpar Respostas (Manter Configurações)',
    clearAnswersDesc:
      'Excluir todas as respostas salvas mas manter definições personalizadas',
    clearAnswersScopePrefix:
      'Remove: apenas respostas • Mantém: informações do projeto e ',
    clearAnswersScopeHighlighted: 'definições personalizadas',
    clearAll: 'Restaurar Ferramenta (Limpar Tudo)',
    clearAllDesc:
      'Excluir todas as respostas salvas e restaurar definições para o padrão',
    clearAllScopePrefix: 'Remove: respostas, informações do projeto e ',
    clearAllScopeHighlighted: 'definições personalizadas',
    clearAllScopeSuffix: ' • Restaura as definições padrão da ferramenta',
    clearAnswersConfirmTitle: 'Limpar Apenas Respostas',
    clearAnswersConfirmMessage:
      'Tem certeza de que deseja excluir todas as suas respostas? Suas definições personalizadas serão preservadas. Esta ação não pode ser desfeita.',
    clearAllConfirmTitle: 'Limpar Tudo e Restaurar Definições',
    clearAllConfirmMessage:
      'Tem certeza de que deseja excluir todas as suas respostas e restaurar as perguntas para o padrão da ferramenta? Esta ação não pode ser desfeita.',
    clearConfirmButton: 'Sim, Limpar',
    clearAllConfirmButton: 'Sim, Limpar Tudo',
    cancelButton: 'Cancelar',
  },
};

const StartSection = () => {
  const { language } = useLanguage();
  const { semioticLadderGrouping } = useSemioticData();
  const {
    answers,
    projectMetadata,
    updateAnswer,
    importAnswers,
    clearAnswers,
    setProjectMetadata,
    clearProjectMetadata,
    resetToDefaultDefinitions,
  } = useAnswers();
  const {
    handleExport,
    exportOnlyAnswered,
    setExportOnlyAnswered,
    exportEngOnlyAnswered,
    setExportEngOnlyAnswered,
    exportWithoutOverview,
    setExportWithoutOverview,
    exportEngWithoutOverview,
    setExportEngWithoutOverview,
    exportIncludeDescriptions,
    setExportIncludeDescriptions,
    exportEngIncludeDescriptions,
    setExportEngIncludeDescriptions,
  } = useExport();

  const [showClearModal, setShowClearModal] = useState(false);
  const [clearType, setClearType] = useState('answers'); // 'answers' or 'all'

  const t = texts[language];
  const projectInfoAnsweredCount = [
    projectMetadata.title,
    projectMetadata.focalProblem,
    projectMetadata.authorship,
  ].filter((value) => value?.trim()).length;
  const projectInfoTotalCount = 3;

  const handleClearAnswersClick = () => {
    setClearType('answers');
    setShowClearModal(true);
  };

  const handleClearAllClick = () => {
    setClearType('all');
    setShowClearModal(true);
  };

  const handleClearConfirm = () => {
    if (clearType === 'answers') {
      clearAnswers();
    } else {
      clearAnswers();
      clearProjectMetadata();
      resetToDefaultDefinitions();
    }
    setShowClearModal(false);
  };

  const handleClearCancel = () => {
    setShowClearModal(false);
  };

  const getCurrentModalTexts = () => {
    if (clearType === 'answers') {
      return {
        title: t.clearAnswersConfirmTitle,
        message: t.clearAnswersConfirmMessage,
        confirmButton: t.clearConfirmButton,
      };
    } else {
      return {
        title: t.clearAllConfirmTitle,
        message: t.clearAllConfirmMessage,
        confirmButton: t.clearAllConfirmButton,
      };
    }
  };

  const modalTexts = getCurrentModalTexts();

  useEffect(() => {
    const tooltipTriggerList = document.querySelectorAll(
      '[data-bs-toggle="tooltip"]',
    );
    const tooltipInstances = Array.from(tooltipTriggerList).map(
      (tooltipTriggerEl) => new Tooltip(tooltipTriggerEl),
    );

    return () => {
      tooltipInstances.forEach((tooltipInstance) => tooltipInstance.dispose());
    };
  }, [language]);

  return (
    <section className='pt-5 border-top' id='start'>
      <div className='container mb-5'>
        <SectionTitle title={t.title} />

        <p className='mb-4' style={{ whiteSpace: 'pre-line' }}>
          {t.intro}
        </p>

        <h3>{t.projectInfoTitle}</h3>

        <div className='accordion mb-4' id='projectInfoAccordion'>
          <div className='accordion-item'>
            <h4 className='accordion-header' id='heading-project-info'>
              <button
                className='accordion-button collapsed bg-white'
                type='button'
                data-bs-toggle='collapse'
                data-bs-target='#collapse-project-info'
                aria-expanded='false'
                aria-controls='collapse-project-info'
              >
                <div className='d-flex justify-content-between align-items-center w-100'>
                  <span>{t.projectMetadataAccordionTitle}</span>
                  <span className='badge bg-secondary mx-2'>
                    {projectInfoAnsweredCount}/{projectInfoTotalCount}
                  </span>
                </div>
              </button>
            </h4>

            <div
              id='collapse-project-info'
              className='accordion-collapse collapse'
              aria-labelledby='heading-project-info'
            >
              <div className='accordion-body bg-white'>
                <div className='alert alert-light mb-3' role='alert'>
                  <div className='d-flex align-items-start'>
                    <i
                      className='bi bi-info-circle-fill text-primary me-2'
                      aria-hidden='true'
                    ></i>
                    <div>{t.projectInfoHelper}</div>
                  </div>
                </div>

                <div className='mb-3'>
                  <label
                    htmlFor='projectTitle'
                    className='form-label fw-medium'
                  >
                    {t.projectTitleLabel}
                  </label>
                  <input
                    id='projectTitle'
                    type='text'
                    className='form-control'
                    value={projectMetadata.title}
                    onChange={(event) =>
                      setProjectMetadata({ title: event.target.value })
                    }
                    placeholder={t.projectTitlePlaceholder}
                  />
                </div>

                <div className='mb-3'>
                  <label
                    htmlFor='focalProblem'
                    className='form-label fw-medium'
                  >
                    {t.focalProblemLabel}
                  </label>
                  <textarea
                    id='focalProblem'
                    className='form-control'
                    rows='3'
                    value={projectMetadata.focalProblem}
                    onChange={(event) =>
                      setProjectMetadata({ focalProblem: event.target.value })
                    }
                    placeholder={t.focalProblemPlaceholder}
                  />
                </div>

                <div>
                  <label htmlFor='authorship' className='form-label fw-medium'>
                    {t.authorshipLabel}
                  </label>
                  <input
                    id='authorship'
                    type='text'
                    className='form-control'
                    value={projectMetadata.authorship}
                    onChange={(event) =>
                      setProjectMetadata({ authorship: event.target.value })
                    }
                    placeholder={t.authorshipPlaceholder}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <SemioticAccordion
          grouping={semioticLadderGrouping}
          language={language}
          answers={answers}
          onAnswerChange={updateAnswer}
        />

        <div className='alert alert-light border mb-3' role='status'>
          <div className='mb-2'>
            <p className='text-muted mb-0'>
              <i className='bi bi-info-circle me-2' aria-hidden='true'></i>
              {t.newFormSuggestion}
            </p>
          </div>
          <p className='fw-semibold mb-2'>{t.clearActionsTitle}</p>
          <p className='mb-1'>
            <i
              className='bi bi-eraser me-2 text-warning'
              aria-hidden='true'
            ></i>
            {t.clearAnswersScopePrefix}
            <span
              data-bs-toggle='tooltip'
              data-bs-trigger='click'
              data-bs-placement='top'
              data-bs-title={t.definitionsTooltip}
              aria-label={t.definitionsTooltip}
              tabIndex='0'
              style={{
                textDecoration: 'underline dotted',
                textUnderlineOffset: '3px',
                cursor: 'help',
              }}
            >
              {t.clearAnswersScopeHighlighted}
            </span>
          </p>
          <p className='mb-0'>
            <i className='bi bi-trash me-2 text-danger' aria-hidden='true'></i>
            {t.clearAllScopePrefix}
            <span
              data-bs-toggle='tooltip'
              data-bs-trigger='click'
              data-bs-placement='top'
              data-bs-title={t.definitionsTooltip}
              aria-label={t.definitionsTooltip}
              tabIndex='0'
              style={{
                textDecoration: 'underline dotted',
                textUnderlineOffset: '3px',
                cursor: 'help',
              }}
            >
              {t.clearAllScopeHighlighted}
            </span>
            {t.clearAllScopeSuffix}
          </p>
        </div>

        {/* Clear Buttons */}
        <div className='mb-4 text-start d-flex gap-2 flex-wrap'>
          <button
            type='button'
            className='btn btn-warning'
            onClick={handleClearAnswersClick}
            title={t.clearAnswersDesc}
          >
            <i className='bi bi-eraser me-2' aria-hidden='true'></i>
            {t.clearAnswers}
          </button>
          <button
            type='button'
            className='btn btn-danger'
            onClick={handleClearAllClick}
            title={t.clearAllDesc}
          >
            <i className='bi bi-trash me-2' aria-hidden='true'></i>
            {t.clearAll}
          </button>
        </div>
      </div>

      <BottomToolbar
        answers={answers}
        onImportXML={importAnswers}
        onExport={handleExport}
        language={language}
        exportOnlyAnswered={exportOnlyAnswered}
        setExportOnlyAnswered={setExportOnlyAnswered}
        exportEngOnlyAnswered={exportEngOnlyAnswered}
        setExportEngOnlyAnswered={setExportEngOnlyAnswered}
        exportWithoutOverview={exportWithoutOverview}
        setExportWithoutOverview={setExportWithoutOverview}
        exportEngWithoutOverview={exportEngWithoutOverview}
        setExportEngWithoutOverview={setExportEngWithoutOverview}
        exportIncludeDescriptions={exportIncludeDescriptions}
        setExportIncludeDescriptions={setExportIncludeDescriptions}
        exportEngIncludeDescriptions={exportEngIncludeDescriptions}
        setExportEngIncludeDescriptions={setExportEngIncludeDescriptions}
      />

      {/* Clear Confirmation Modal */}
      <div
        className={`modal fade ${showClearModal ? 'show' : ''}`}
        style={{ display: showClearModal ? 'block' : 'none' }}
        tabIndex='-1'
        role='dialog'
        aria-labelledby='clearModalLabel'
        aria-hidden={!showClearModal}
      >
        <div className='modal-dialog modal-dialog-centered' role='document'>
          <div className='modal-content border-0 shadow-lg'>
            <div
              className={`modal-header ${
                clearType === 'answers' ? 'bg-warning' : 'bg-danger'
              } text-white border-0`}
            >
              <h5
                className={`modal-title fw-bold ${
                  clearType === 'answers' ? '' : 'text-white'
                }`}
                id='clearModalLabel'
              >
                <i
                  className='bi bi-exclamation-triangle-fill me-2'
                  aria-hidden='true'
                ></i>
                {modalTexts.title}
              </h5>
              <button
                type='button'
                className='btn-close btn-close-white'
                aria-label='Close'
                onClick={handleClearCancel}
              ></button>
            </div>
            <div className='modal-body px-4 py-4'>
              <div className='d-flex align-items-start'>
                <div className='flex-shrink-0 me-3'>
                  <div
                    className={`${
                      clearType === 'answers' ? 'bg-warning' : 'bg-danger'
                    } bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center`}
                    style={{ width: '48px', height: '48px' }}
                  >
                    <i
                      className={`bi ${
                        clearType === 'answers'
                          ? 'bi-eraser text-warning'
                          : 'bi-trash text-danger'
                      } fs-4`}
                      aria-hidden='true'
                    ></i>
                  </div>
                </div>
                <div className='flex-grow-1'>
                  <p className='mb-0 text-dark' style={{ lineHeight: '1.6' }}>
                    {modalTexts.message}
                  </p>
                </div>
              </div>
            </div>
            <div className='modal-footer border-0 px-4 pb-4'>
              <button
                type='button'
                className='btn btn-outline-secondary me-2'
                onClick={handleClearCancel}
              >
                {t.cancelButton}
              </button>
              <button
                type='button'
                className={`btn ${
                  clearType === 'answers' ? 'btn-warning' : 'btn-danger'
                }`}
                onClick={handleClearConfirm}
              >
                <i
                  className={`bi ${
                    clearType === 'answers' ? 'bi-eraser' : 'bi-trash'
                  } me-2`}
                  aria-hidden='true'
                ></i>
                {modalTexts.confirmButton}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal backdrop */}
      {showClearModal && (
        <div
          className='modal-backdrop fade show'
          onClick={handleClearCancel}
        ></div>
      )}
    </section>
  );
};

export default StartSection;
