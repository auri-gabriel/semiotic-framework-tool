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
      className='fixed-bottom bg-dark border-top py-2 px-3 d-flex justify-content-between align-items-center shadow-sm container'
      style={{ zIndex: 1050 }}
    >
      <div>
        <button
          className='btn btn-primary me-2'
          onClick={() => onExport('json')}
        >
          {translations[language].exportJSON}
        </button>
        <button
          className='btn btn-primary me-2'
          onClick={() => onExport('csv')}
        >
          {translations[language].exportCSV}
        </button>
        <button
          className='btn btn-primary me-2'
          onClick={() => onExport('xml')}
        >
          {translations[language].exportXML}
        </button>
      </div>
      <div>
        <input
          type='file'
          accept='.xml'
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <button className='btn btn-outline-light' onClick={handleImportClick}>
          {translations[language].importXML}
        </button>
      </div>
    </div>
  );
}

export default BottomToolbar;
