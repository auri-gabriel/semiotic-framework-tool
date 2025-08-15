import React, { useRef } from 'react';

const toolbarTexts = {
  en: {
    export: 'Export',
    exportXML: 'Export XML',
    exportLadder: 'Export Semiotic Ladder',
    exportLadderAnswered: 'Only answered questions',
    importXML: 'Import XML',
    exportPDF: 'as PDF',
    exportDOCX: 'as DOCX',
    exportPreview: 'Preview HTML',
    exportEngLayers: 'Export Engineering Layers',
    dataExport: 'Data Export',
    documentExport: 'Document Export',
    exportXMLDesc: 'Save current data as XML file',
    exportLadderDesc: 'Generate PDF report of Semiotic Ladder',
    exportLadderPreviewDesc:
      'Open HTML preview in new tab for debugging (dev only)',
    exportEngLayersDesc: 'Generate PDF report of Engineering Layers',
    exportEngLayersPreviewDesc:
      'Open HTML preview in new tab for debugging (dev only)',
  },
  pt_BR: {
    export: 'Exportar',
    exportXML: 'Exportar XML',
    exportLadder: 'Exportar Escada Semiótica',
    exportLadderAnswered: 'Apenas perguntas respondidas',
    importXML: 'Importar XML',
    exportPDF: 'em PDF',
    exportDOCX: 'em DOCX',
    exportPreview: 'Pré-visualizar HTML',
    exportEngLayers: 'Exportar Camadas de Engenharia',
    dataExport: 'Exportação de Dados',
    documentExport: 'Exportação de Documentos',
    exportXMLDesc: 'Salvar dados atuais como arquivo XML',
    exportLadderDesc: 'Gerar relatório PDF da Escada Semiótica',
    exportLadderPreviewDesc:
      'Abrir pré-visualização HTML em nova aba para depuração (dev apenas)',
    exportEngLayersDesc: 'Gerar relatório PDF das Camadas de Engenharia',
    exportEngLayersPreviewDesc:
      'Abrir pré-visualização HTML em nova aba para depuração (dev apenas)',
  },
};

function BottomToolbar({
  onImportXML,
  onExport,
  language,
  exportOnlyAnswered,
  setExportOnlyAnswered,
  exportEngOnlyAnswered,
  setExportEngOnlyAnswered,
}) {
  const fileInputRef = useRef();
  const t = toolbarTexts[language];
  const isDev = import.meta.env.DEV;

  const handleImportClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'text/xml') {
      const reader = new FileReader();
      reader.onload = (event) => {
        onImportXML(event.target.result);
      };
      reader.readAsText(file);
    }
    e.target.value = '';
  };

  return (
    <div
      className='bg-dark py-2 px-3 shadow-sm'
      style={{
        position: 'sticky',
        bottom: 0,
        zIndex: 999,
        WebkitOverflowScrolling: 'touch',
        whiteSpace: 'nowrap',
      }}
    >
      <div className='container'>
        <div className='d-flex gap-3 align-items-center'>
          {/* Import Button */}
          <div>
            <label htmlFor='xmlFileInput' className='visually-hidden'>
              {t.importXML}
            </label>
            <input
              id='xmlFileInput'
              type='file'
              accept='.xml'
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
              aria-label={t.importXML}
            />
            {/* Mobile (small) button */}
            <button
              className='btn btn-outline-light btn-sm d-sm-none d-inline-flex align-items-center'
              onClick={handleImportClick}
              aria-describedby='xmlFileInput'
            >
              <i className='bi bi-upload me-2' aria-hidden='true'></i>
              {t.importXML}
            </button>
            {/* Desktop (normal) button */}
            <button
              className='btn btn-outline-light d-none d-sm-inline-flex align-items-center'
              onClick={handleImportClick}
              aria-describedby='xmlFileInput'
            >
              <i className='bi bi-upload me-2' aria-hidden='true'></i>
              {t.importXML}
            </button>
          </div>

          {/* Export Button with Dropdown */}
          <div>
            <div className='btn-group dropup'>
              {/* Mobile (small) button */}
              <button
                className='btn btn-primary btn-sm dropdown-toggle d-sm-none d-inline-flex align-items-center'
                type='button'
                data-bs-toggle='dropdown'
                aria-expanded='false'
                aria-label={`${t.export} - ${t.dataExport} ${t.documentExport}`}
              >
                <i className='bi bi-download me-2' aria-hidden='true'></i>
                {t.export}
              </button>
              {/* Desktop (normal) button */}
              <button
                className='btn btn-primary dropdown-toggle d-none d-sm-inline-flex align-items-center'
                type='button'
                data-bs-toggle='dropdown'
                aria-expanded='false'
                aria-label={`${t.export} - ${t.dataExport} ${t.documentExport}`}
              >
                <i className='bi bi-download me-2' aria-hidden='true'></i>
                {t.export}
              </button>
              <ul
                className='dropdown-menu'
                style={{ minWidth: '280px', maxWidth: '90vw' }}
              >
                {/* Data Export Section */}
                <li>
                  <h6 className='dropdown-header d-flex align-items-center'>
                    <i className='bi bi-database me-2' aria-hidden='true'></i>
                    {t.dataExport}
                  </h6>
                </li>
                <li>
                  <button
                    className='dropdown-item d-flex align-items-start'
                    onClick={() => onExport('xml')}
                    style={{ whiteSpace: 'normal' }}
                  >
                    <div className='flex-shrink-0 me-2 mt-1'>
                      <i
                        className='bi bi-file-earmark-code'
                        aria-hidden='true'
                      ></i>
                    </div>
                    <div className='text-break'>
                      <div className='fw-medium'>{t.exportXML}</div>
                      <small className='text-muted'>{t.exportXMLDesc}</small>
                    </div>
                  </button>
                </li>

                {/* Document Export Section */}
                <li>
                  <hr className='dropdown-divider' />
                </li>
                <li>
                  <h6 className='dropdown-header d-flex align-items-center'>
                    <i
                      className='bi bi-file-earmark-pdf me-2'
                      aria-hidden='true'
                    ></i>
                    {t.documentExport}
                  </h6>
                </li>

                {/* Semiotic Ladder Export */}
                <li>
                  <button
                    className='dropdown-item d-flex align-items-start'
                    onClick={() =>
                      onExport('semiotic-ladder', {
                        onlyAnswered: exportOnlyAnswered,
                        format: 'pdf',
                      })
                    }
                    style={{ whiteSpace: 'normal' }}
                  >
                    <div className='flex-shrink-0 me-2 mt-1'>
                      <i className='bi bi-ladder' aria-hidden='true'></i>
                    </div>
                    <div className='text-break'>
                      <div className='fw-medium'>
                        {t.exportLadder} {t.exportPDF}
                      </div>
                      <small className='text-muted'>{t.exportLadderDesc}</small>
                    </div>
                  </button>
                </li>

                {/* Semiotic Ladder HTML Preview (Development Only) */}
                {isDev && (
                  <li>
                    <button
                      className='dropdown-item d-flex align-items-start'
                      onClick={() =>
                        onExport('semiotic-ladder', {
                          onlyAnswered: exportOnlyAnswered,
                          format: 'preview',
                        })
                      }
                      style={{ whiteSpace: 'normal' }}
                    >
                      <div className='flex-shrink-0 me-2 mt-1'>
                        <i className='bi bi-eye' aria-hidden='true'></i>
                      </div>
                      <div className='text-break'>
                        <div className='fw-medium'>
                          {t.exportLadder} {t.exportPreview}
                        </div>
                        <small className='text-muted'>
                          {t.exportLadderPreviewDesc}
                        </small>
                      </div>
                    </button>
                  </li>
                )}

                <li>
                  <div
                    className='dropdown-item-text px-4 py-1'
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className='form-check form-check-sm'>
                      <input
                        className='form-check-input'
                        type='checkbox'
                        id='exportOnlyAnswered'
                        checked={exportOnlyAnswered}
                        onChange={(e) => {
                          e.stopPropagation();
                          setExportOnlyAnswered(e.target.checked);
                        }}
                      />
                      <label
                        className='form-check-label text-muted'
                        htmlFor='exportOnlyAnswered'
                        onClick={(e) => e.stopPropagation()}
                      >
                        <small>{t.exportLadderAnswered}</small>
                      </label>
                    </div>
                  </div>
                </li>

                {/* Engineering Layers Export */}
                <li>
                  <button
                    className='dropdown-item d-flex align-items-start'
                    onClick={() =>
                      onExport('engineering-layers', {
                        onlyAnswered: exportEngOnlyAnswered,
                        format: 'pdf',
                      })
                    }
                    style={{ whiteSpace: 'normal' }}
                  >
                    <div className='flex-shrink-0 me-2 mt-1'>
                      <i className='bi bi-layers' aria-hidden='true'></i>
                    </div>
                    <div className='text-break'>
                      <div className='fw-medium'>
                        {t.exportEngLayers} {t.exportPDF}
                      </div>
                      <small className='text-muted'>
                        {t.exportEngLayersDesc}
                      </small>
                    </div>
                  </button>
                </li>

                {/* Engineering Layers HTML Preview (Development Only) */}
                {isDev && (
                  <li>
                    <button
                      className='dropdown-item d-flex align-items-start'
                      onClick={() =>
                        onExport('engineering-layers', {
                          onlyAnswered: exportEngOnlyAnswered,
                          format: 'preview',
                        })
                      }
                      style={{ whiteSpace: 'normal' }}
                    >
                      <div className='flex-shrink-0 me-2 mt-1'>
                        <i className='bi bi-eye' aria-hidden='true'></i>
                      </div>
                      <div className='text-break'>
                        <div className='fw-medium'>
                          {t.exportEngLayers} {t.exportPreview}
                        </div>
                        <small className='text-muted'>
                          {t.exportEngLayersPreviewDesc}
                        </small>
                      </div>
                    </button>
                  </li>
                )}

                <li>
                  <div
                    className='dropdown-item-text px-4 py-1'
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className='form-check form-check-sm'>
                      <input
                        className='form-check-input'
                        type='checkbox'
                        id='exportOnlyAnsweredEng'
                        checked={exportEngOnlyAnswered}
                        onChange={(e) => {
                          e.stopPropagation();
                          setExportEngOnlyAnswered(e.target.checked);
                        }}
                      />
                      <label
                        className='form-check-label text-muted'
                        htmlFor='exportOnlyAnsweredEng'
                        onClick={(e) => e.stopPropagation()}
                      >
                        <small>{t.exportLadderAnswered}</small>
                      </label>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BottomToolbar;
