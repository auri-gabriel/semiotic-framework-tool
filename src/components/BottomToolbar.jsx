import React, { useRef } from 'react';

const toolbarTexts = {
  en: {
    export: 'Export',
    exportXML: 'Export XML',
    importXML: 'Import',
  },
  pt_BR: {
    export: 'Exportar',
    exportXML: 'Exportar XML',
    importXML: 'Importar',
  },
};

function BottomToolbar({ answers, onImportXML, onExport, language }) {
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
          <div>
            <input
              type='file'
              accept='.xml'
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <button
              className='btn btn-outline-light d-flex align-items-center'
              onClick={handleImportClick}
            >
              <i className='bi bi-upload me-2'></i>
              {t.importXML}
            </button>
          </div>
          <div>
            <div className='btn-group dropup'>
              <button
                className='btn btn-primary dropdown-toggle d-flex align-items-center'
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
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default BottomToolbar;
