---
title: "Ferramenta Framework Semiótico - Especificação de Requisitos de Software (ERS)"
author: [Auri Gabriel]
date: "2025-05-28"
keywords: [Requisitos de Software, Engenharia de Software, ERS, Escada Semiótica, Camadas de Pressman]
titlepage: true
---

# Especificação de Requisitos de Software (ERS)

## 1. Introdução

### 1.1 Propósito
Este documento tem como objetivo descrever os requisitos da ferramenta de apoio
à Engenharia de Software baseada na Escada Semiótica e nas camadas propostas
por Pressman e Maxim. A ferramenta visa auxiliar no ensino e na prática da
engenharia de software por meio da modelagem, visualização e documentação de
elementos semióticos.

### 1.2 Escopo
A ferramenta será uma aplicação web que funcionará totalmente no navegador, sem
necessidade de backend discreto. Permitirá o gerenciamento de elementos semióticos,
visualizações gráficas, importação/exportação de arquivos XML, além da geração
de relatórios e checklists em PDF. O projeto será distribuído como um Recurso
Educacional Aberto (REA), incentivando o uso e adaptação por parte da
comunidade.

### 1.3 Definições, Acrônimos e Abreviações
- **ERS**: Especificação de Requisitos de Software  
- **XML**: Extensible Markup Language  
- **PDF**: Portable Document Format  
- **REA**: Recurso Educacional Aberto  
- **UI**: Interface de Usuário  

### 1.4 Referências

### 1.5 Visão Geral
Este documento detalha os requisitos funcionais e não funcionais da ferramenta,
descrevendo suas funcionalidades, interfaces e restrições.

## 2. Descrição Geral

### 2.1 Perspectiva do Produto
O produto será uma aplicação web standalone, utilizando tecnologias client-side
(HTML, CSS, JavaScript) com uma interface gráfica componentizada. Não dependerá
de servidores externos para operar.

### 2.2 Funções do Produto
- Gerenciar elementos da Escada Semiótica e das Camadas de Engenharia de Software
- Importar e exportar elementos em XML
- Visualizar dados em formatos gráficos
- Gerar relatórios e checklists em PDF

### 2.3 Características dos Usuários
Usuários esperados incluem estudantes, professores e profissionais de
Engenharia de Software, com conhecimento básico de informática.

### 2.4 Restrições
- Executar exclusivamente no lado cliente (navegador)
- Exportação e importação devem seguir formatos padronizados e extensíveis
- Interface deve ser componentizada para manutenção facilitada

### 2.5 Suposições e Dependências
- Navegador moderno com suporte a JavaScript
- Biblioteca de terceiros para geração de PDF (ex: jsPDF)
- Parser XML disponível em JavaScript

## 3. Funcionalidades do Sistema

### 3.1 Gerenciamento de Perguntas
**Descrição:** Funcionalidade de visualizar e responder perguntas, e editar via XML.  
**Entradas:** Reposta.  
**Saídas:** Confirmação de ações e exibição atualizada das perguntas.

### 3.2 Importação e Exportação de Arquivos
**Descrição:** Permite importar e exportar dados em XML, além de exportar relatórios e checklists em PDF.  
**Entradas:** Arquivos XML, solicitação de exportação.  
**Saídas:** Dados carregados, arquivos gerados.

### 3.3 Geração de Relatórios e Checklists
**Descrição:** Criação de documentos PDF contendo informações do projeto e listas de verificação de conformidade.  
**Entradas:** Estado atual do projeto.  
**Saídas:** PDF com relatório e checklist.

## 4. Requisitos de Interfaces Externas

### 4.1 Interfaces do Usuário
- Interface web responsiva e intuitiva
- Componentes visuais reativos (ex: botões, cards, tabelas, modais)

### 4.2 Interfaces de Hardware
- Não aplicável (executa apenas no navegador)

### 4.3 Interfaces de Software
- Parser e gerador XML (JavaScript)
- Biblioteca de geração de PDF (ex: jsPDF)

### 4.4 Interfaces de Comunicação
- Não aplicável (sem backend ou comunicação em rede)

## 5. Requisitos do Sistema

### 5.1 Requisitos Funcionais
| Código | Requisito Funcional                                                                       | Prioridade |
|--------|-------------------------------------------------------------------------------------------|------------|
| RF01   | O sistema deve permitir a criação de perguntas.                                           | Alta       |
| RF02   | O sistema deve permitir a criação de classificações.                                      | Alta       |
| RF03   | O sistema deve permitir a reposta e visualização de perguntas.                            | Alta       |
| RF04   | O sistema deve importar elementos a partir de arquivos XML válidos.                       | Alta       |
| RF05   | O sistema deve exportar os elementos atuais para um arquivo XML.                          | Alta       |
| RF06   | O sistema deve exportar um relatório em PDF com as informações dos elementos.             | Alta       |
| RF07   | O sistema deve exportar um checklist de conformidade em PDF.                              | Média      |
| RF08   | O sistema deve renderizar visualmente os elementos na Escada Semiótica.                   | Média      |
| RF09   | O sistema deve renderizar visualmente os elementos nas Camadas de Engenharia de Software. | Média      |
| RF10   | O sistema deve exibir os elementos também em uma tabela simples.                          | Média      |

### 5.2 Requisitos de Desempenho

### 5.3 Requisitos de Segurança
- Os dados devem ser mantidos localmente no navegador (ex: LocalStorage).

### 5.4 Atributos de Qualidade
- **Usabilidade:** Interface clara, responsiva e fácil de utilizar.
- **Portabilidade:** Compatível com navegadores modernos (Chrome, Firefox, Edge).
- **Manutenibilidade:** Estrutura de código modular e componentizada.

## 6. Outros Requisitos Não Funcionais

### 6.1 Conformidade Legal e Regulatória
- Licenciamento como Recurso Educacional Aberto (REA)

### 6.2 Regras de Negócio
- Exportações devem seguir a estrutura XML acordada.

## Apêndices

### Apêndice A: Glossário
- **Checklist:** Documento com itens de verificação para conformidade de projeto.
- **Escada Semiótica:** Modelo teórico que categoriza níveis de representação de conhecimento.
- **Camadas de Engenharia de Software:** Modelo baseado em qualidade, processo, métodos e ferramentas.

### Apêndice B: Referências
- Obra "Engenharia de Software" de Pressman e Maxim

### Apêndice C: Índice
(Não aplicável)


