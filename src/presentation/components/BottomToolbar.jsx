import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';

function BottomToolbar({
  onImportXML,
  onExport,
  exportOnlyAnswered,
  setExportOnlyAnswered,
  exportEngOnlyAnswered,
  setExportEngOnlyAnswered,
}) {
  const fileInputRef = useRef();
  const { t } = useTranslation();
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
              {t('toolbar.importXML')}
            </label>
            <input
              id='xmlFileInput'
              type='file'
              accept='.xml'
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
              aria-label={t('toolbar.importXML')}
            />
            {/* Mobile (small) button */}
            <button
              className='btn btn-outline-light btn-sm d-sm-none d-inline-flex align-items-center'
              onClick={handleImportClick}
              aria-describedby='xmlFileInput'
            >
              <i className='bi bi-upload me-2' aria-hidden='true'></i>
              {t('toolbar.importXML')}
            </button>
            {/* Desktop (normal) button */}
            <button
              className='btn btn-outline-light d-none d-sm-inline-flex align-items-center'
              onClick={handleImportClick}
              aria-describedby='xmlFileInput'
            >
              <i className='bi bi-upload me-2' aria-hidden='true'></i>
              {t('toolbar.importXML')}
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
                aria-label={`${t('toolbar.export')} - ${t(
                  'toolbar.dataExport'
                )} ${t('toolbar.documentExport')}`}
              >
                <i className='bi bi-download me-2' aria-hidden='true'></i>
                {t('toolbar.export')}
              </button>
              {/* Desktop (normal) button */}
              <button
                className='btn btn-primary dropdown-toggle d-none d-sm-inline-flex align-items-center'
                type='button'
                data-bs-toggle='dropdown'
                aria-expanded='false'
                aria-label={`${t('toolbar.export')} - ${t(
                  'toolbar.dataExport'
                )} ${t('toolbar.documentExport')}`}
              >
                <i className='bi bi-download me-2' aria-hidden='true'></i>
                {t('toolbar.export')}
              </button>
              <ul
                className='dropdown-menu'
                style={{ minWidth: '280px', maxWidth: '90vw' }}
              >
                {/* Data Export Section */}
                <li>
                  <h6 className='dropdown-header d-flex align-items-center'>
                    <i className='bi bi-database me-2' aria-hidden='true'></i>
                    {t('toolbar.dataExport')}
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
                      <div className='fw-medium'>{t('toolbar.exportXML')}</div>
                      <small className='text-muted'>
                        {t('toolbar.exportXMLDesc')}
                      </small>
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
                    {t('toolbar.documentExport')}
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
                        {t('toolbar.exportLadder')} {t('toolbar.exportPDF')}
                      </div>
                      <small className='text-muted'>
                        {t('toolbar.exportLadderDesc')}
                      </small>
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
                          {t('toolbar.exportLadder')}{' '}
                          {t('toolbar.exportPreview')}
                        </div>
                        <small className='text-muted'>
                          {t('toolbar.exportLadderPreviewDesc')}
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
                        <small>{t('toolbar.exportLadderAnswered')}</small>
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
                        {t('toolbar.exportEngLayers')} {t('toolbar.exportPDF')}
                      </div>
                      <small className='text-muted'>
                        {t('toolbar.exportEngLayersDesc')}
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
                          {t('toolbar.exportEngLayers')}{' '}
                          {t('toolbar.exportPreview')}
                        </div>
                        <small className='text-muted'>
                          {t('toolbar.exportEngLayersPreviewDesc')}
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
                        <small>{t('toolbar.exportLadderAnswered')}</small>
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
