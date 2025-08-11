import React, { useRef } from 'react';

function BottomToolbar({
  answers,
  onImportXML,
  onExport,
  language,
  translations,
}) {
  const fileInputRef = useRef();

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
      className='bg-dark border-top py-2 px-3 d-flex justify-content-between align-items-center shadow-sm container'
      style={{
        position: 'sticky',
        bottom: 0,
        zIndex: 1050,
        marginBottom: '1.5rem',
      }}
    >
      <div>
        <div className='btn-group'>
          <button
            className='btn btn-primary dropdown-toggle d-flex align-items-center'
            type='button'
            data-bs-toggle='dropdown'
            aria-expanded='false'
          >
            <i className='bi bi-download me-2'></i>
            {translations[language].export}
          </button>
          <ul className='dropdown-menu'>
            <li>
              <button className='dropdown-item' onClick={() => onExport('xml')}>
                {translations[language].exportXML}
              </button>
            </li>
          </ul>
        </div>
      </div>
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
          {translations[language].importXML}
        </button>
      </div>
    </div>
  );
}
export default BottomToolbar;
