/*
 * Copyright (c) 2025 GEInfoEdu
 * SPDX-License-Identifier: GPL-3.0-only
 * Author: Auri Gabriel Castro de Melo
 */

import React, { useRef } from 'react';

const texts = {
  en: {
    export: 'Export',
    exportXML: 'Export XML',
    exportLadder: 'Semiotic Ladder',
    exportLadderAnswered: 'Only answered questions',
    exportWithoutOverview: 'Without overview',
    exportIncludeDescriptions: 'Include step descriptions',
    importXML: 'Import XML',
    exportPDF: 'as PDF',
    exportDOCX: 'as DOCX',
    exportHTML: 'as HTML',
    exportEngLayers: 'Software Engineering Layers',
    dataExport: 'Data Export',
    documentExport: 'Document Export',
    exportXMLDesc: 'Save current data as XML file',
    exportLadderDesc: 'Generate PDF or HTML report',
    exportEngLayersDesc: 'Generate PDF or HTML report',
  },
  pt_BR: {
    export: 'Exportar',
    exportXML: 'Exportar XML',
    exportLadder: 'Escada Semiótica',
    exportLadderAnswered: 'Apenas perguntas respondidas',
    exportWithoutOverview: 'Sem visão geral',
    exportIncludeDescriptions: 'Incluir descrições dos degraus',
    importXML: 'Importar XML',
    exportPDF: 'em PDF',
    exportDOCX: 'em DOCX',
    exportHTML: 'em HTML',
    exportEngLayers: 'Camadas de Engenharia de Software',
    dataExport: 'Exportação de Dados',
    documentExport: 'Exportação de Documentos',
    exportXMLDesc: 'Salvar dados atuais como arquivo XML',
    exportLadderDesc: 'Gerar relatório em PDF ou HTML',
    exportEngLayersDesc: 'Gerar relatório em PDF ou HTML',
  },
};

const BottomToolbar = ({
  onImportXML,
  onExport,
  language,
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
}) => {
  const fileInputRef = useRef();
  const t = texts[language];

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
                style={{
                  minWidth: '280px',
                  maxWidth: '90vw',
                  maxHeight: '60vh',
                  overflowY: 'auto',
                }}
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

                {/* Semiotic Ladder - collapsed submenu */}
                <li>
                  <button
                    className='dropdown-item d-flex align-items-start'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target='#semioticSubmenu'
                    aria-expanded='false'
                    aria-controls='semioticSubmenu'
                    style={{ whiteSpace: 'normal' }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className='flex-shrink-0 me-2 mt-1'>
                      <i className='bi bi-ladder' aria-hidden='true'></i>
                    </div>
                    <div className='text-break'>
                      <div className='fw-medium'>{t.exportLadder}</div>
                      <small className='text-muted'>{t.exportLadderDesc}</small>
                    </div>
                    <div className='ms-auto'>
                      <i
                        className='bi bi-caret-down-fill'
                        aria-hidden='true'
                      ></i>
                    </div>
                  </button>

                  <div
                    id='semioticSubmenu'
                    className='collapse'
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className='px-4 py-2'>
                      <div className='d-grid gap-2'>
                        <div className='form-check'>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            id='exportOnlyAnswered'
                            checked={exportOnlyAnswered}
                            onChange={(e) => {
                              setExportOnlyAnswered(e.target.checked);
                            }}
                          />
                          <label
                            className='form-check-label text-muted'
                            htmlFor='exportOnlyAnswered'
                          >
                            <small>{t.exportLadderAnswered}</small>
                          </label>
                        </div>

                        <div className='form-check'>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            id='exportWithoutOverview'
                            checked={exportWithoutOverview}
                            onChange={(e) => {
                              setExportWithoutOverview(e.target.checked);
                            }}
                          />
                          <label
                            className='form-check-label text-muted'
                            htmlFor='exportWithoutOverview'
                          >
                            <small>{t.exportWithoutOverview}</small>
                          </label>
                        </div>

                        <div className='form-check'>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            id='exportIncludeDescriptions'
                            checked={exportIncludeDescriptions}
                            onChange={(e) => {
                              setExportIncludeDescriptions(e.target.checked);
                            }}
                          />
                          <label
                            className='form-check-label text-muted'
                            htmlFor='exportIncludeDescriptions'
                          >
                            <small>{t.exportIncludeDescriptions}</small>
                          </label>
                        </div>

                        <button
                          className='btn btn-sm btn-outline-primary text-start mt-2'
                          onClick={() =>
                            onExport('semiotic-ladder', {
                              onlyAnswered: exportOnlyAnswered,
                              format: 'pdf',
                            })
                          }
                        >
                          <i
                            className='bi bi-file-pdf me-2'
                            aria-hidden='true'
                          ></i>
                          {t.exportPDF}
                        </button>
                        <button
                          className='btn btn-sm btn-outline-secondary text-start'
                          onClick={() =>
                            onExport('semiotic-ladder', {
                              onlyAnswered: exportOnlyAnswered,
                              format: 'html',
                            })
                          }
                        >
                          <i
                            className='bi bi-filetype-html me-2'
                            aria-hidden='true'
                          ></i>
                          {t.exportHTML}
                        </button>
                      </div>
                    </div>
                  </div>
                </li>

                {/* Engineering Layers - collapsed submenu */}
                <li>
                  <button
                    className='dropdown-item d-flex align-items-start'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target='#engineeringSubmenu'
                    aria-expanded='false'
                    aria-controls='engineeringSubmenu'
                    style={{ whiteSpace: 'normal' }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className='flex-shrink-0 me-2 mt-1'>
                      <i className='bi bi-layers' aria-hidden='true'></i>
                    </div>
                    <div className='text-break'>
                      <div className='fw-medium'>{t.exportEngLayers}</div>
                      <small className='text-muted'>
                        {t.exportEngLayersDesc}
                      </small>
                    </div>
                    <div className='ms-auto'>
                      <i
                        className='bi bi-caret-down-fill'
                        aria-hidden='true'
                      ></i>
                    </div>
                  </button>

                  <div
                    id='engineeringSubmenu'
                    className='collapse'
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className='px-4 py-2'>
                      <div className='d-grid gap-2'>
                        <div className='form-check'>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            id='exportOnlyAnsweredEng'
                            checked={exportEngOnlyAnswered}
                            onChange={(e) => {
                              setExportEngOnlyAnswered(e.target.checked);
                            }}
                          />
                          <label
                            className='form-check-label text-muted'
                            htmlFor='exportOnlyAnsweredEng'
                          >
                            <small>{t.exportLadderAnswered}</small>
                          </label>
                        </div>

                        <div className='form-check'>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            id='exportEngWithoutOverview'
                            checked={exportEngWithoutOverview}
                            onChange={(e) => {
                              setExportEngWithoutOverview(e.target.checked);
                            }}
                          />
                          <label
                            className='form-check-label text-muted'
                            htmlFor='exportEngWithoutOverview'
                          >
                            <small>{t.exportWithoutOverview}</small>
                          </label>
                        </div>

                        {/*
                        <div className='form-check'>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            id='exportEngIncludeDescriptions'
                            checked={exportEngIncludeDescriptions}
                            onChange={(e) => {
                              setExportEngIncludeDescriptions(e.target.checked);
                            }}
                          />
                          <label
                            className='form-check-label text-muted'
                            htmlFor='exportEngIncludeDescriptions'
                          >
                            <small>{t.exportIncludeDescriptions}</small>
                          </label>
                        </div>
                        */}

                        <button
                          className='btn btn-sm btn-outline-primary text-start mt-2'
                          onClick={() =>
                            onExport('engineering-layers', {
                              onlyAnswered: exportEngOnlyAnswered,
                              format: 'pdf',
                            })
                          }
                        >
                          <i
                            className='bi bi-file-pdf me-2'
                            aria-hidden='true'
                          ></i>
                          {t.exportPDF}
                        </button>
                        <button
                          className='btn btn-sm btn-outline-secondary text-start'
                          onClick={() =>
                            onExport('engineering-layers', {
                              onlyAnswered: exportEngOnlyAnswered,
                              format: 'html',
                            })
                          }
                        >
                          <i
                            className='bi bi-filetype-html me-2'
                            aria-hidden='true'
                          ></i>
                          {t.exportHTML}
                        </button>
                      </div>
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
};
export default BottomToolbar;
