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
  },
  pt_BR: {
    export: 'Exportar',
    exportXML: 'Exportar XML',
    exportLadder: 'Exportar Escada Semiótica',
    exportLadderAnswered: 'Apenas perguntas respondidas',
    importXML: 'Importar XML',
    exportPDF: 'em PDF',
    exportDOCX: 'em DOCX',
  },
};

function BottomToolbar({
  answers,
  onImportXML,
  onExport,
  language,
  exportOnlyAnswered,
  setExportOnlyAnswered,
}) {
  const fileInputRef = useRef();
  const t = toolbarTexts[language];

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
            <input
              type='file'
              accept='.xml'
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            {/* Mobile (small) button */}
            <button
              className='btn btn-outline-light btn-sm d-sm-none d-inline-flex align-items-center'
              onClick={handleImportClick}
            >
              <i className='bi bi-upload me-2'></i>
              {t.importXML}
            </button>
            {/* Desktop (normal) button */}
            <button
              className='btn btn-outline-light d-none d-sm-inline-flex align-items-center'
              onClick={handleImportClick}
            >
              <i className='bi bi-upload me-2'></i>
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
              >
                <i className='bi bi-download me-2'></i>
                {t.export}
              </button>
              {/* Desktop (normal) button */}
              <button
                className='btn btn-primary dropdown-toggle d-none d-sm-inline-flex align-items-center'
                type='button'
                data-bs-toggle='dropdown'
                aria-expanded='false'
              >
                <i className='bi bi-download me-2'></i>
                {t.export}
              </button>
              <ul className='dropdown-menu'>
                <li>
                  <button
                    className='dropdown-item'
                    onClick={() => onExport('xml')}
                  >
                    {t.exportXML}
                  </button>
                </li>
                <li>
                  <hr class='dropdown-divider' />
                </li>
                <li>
                  <div className='dropdown-item'>
                    <div className='mt-2 d-flex gap-2'>
                      <button
                        className='btn btn-outline-secondary btn-sm'
                        onClick={() =>
                          onExport('semiotic-ladder', {
                            onlyAnswered: exportOnlyAnswered,
                            format: 'pdf',
                          })
                        }
                      >
                        {t.exportLadder} {t.exportPDF}
                      </button>
                    </div>
                    <div className='form-check'>
                      <input
                        className='form-check-input'
                        type='checkbox'
                        id='exportOnlyAnswered'
                        checked={exportOnlyAnswered}
                        onChange={(e) =>
                          setExportOnlyAnswered(e.target.checked)
                        }
                      />
                      <label
                        className='form-check-label'
                        htmlFor='exportOnlyAnswered'
                      >
                        {t.exportLadderAnswered}
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
