## UC01: Visualizar Perguntas
**Ator Principal**: Usuário  
**Ator Secundário**: N/A  

**Descrição**: Permite ao usuário navegar pela Escada Semiótica, visualizando os grupos semióticos, degraus e as perguntas associadas.  

**Pré-Condições**: O sistema deve estar carregado e com o arquivo XML válido disponível.  

**Pós-Condições**: O usuário visualiza as perguntas associadas aos degraus da Escada Semiótica.  

### Fluxo Principal:
| Ações do Ator | Ações do Sistema |
|:--------------|:----------------|
| 1. Acessa a Escada Semiótica. | 2. Lista os grupos semióticos. |
| 3. Expande um grupo semiótico. | 4. Lista os degraus associados a esse grupo. |
| 5. Expande um degrau. | 6. Exibe as perguntas associadas ao degrau, conforme o XML. |

---

## UC02: Responder Pergunta
**Ator Principal**: Usuário  
**Ator Secundário**: N/A  

**Descrição**: Permite ao usuário responder ou editar respostas às perguntas dos degraus da Escada Semiótica.  

**Pré-Condições**: A pergunta deve estar visível ao usuário.  

**Pós-Condições**: A resposta é salva automaticamente no armazenamento local do navegador.  

### Fluxo Principal:
| Ações do Ator | Ações do Sistema |
|:--------------|:----------------|
| 1. Expande uma pergunta. |  |
| 2. Escreve ou edita a resposta. | 3. Salva automaticamente a resposta no armazenamento local. |

---

## UC03: Exportar Respostas
**Ator Principal**: Usuário  
**Ator Secundário**: N/A  

**Descrição**: Gera um arquivo XML contendo todas as respostas do usuário para download.  

**Pré-Condições**: O usuário deve ter respondido pelo menos uma pergunta.  

**Pós-Condições**: O arquivo XML com as respostas é baixado.  

### Fluxo Principal:
| Ações do Ator | Ações do Sistema |
|:--------------|:----------------|
| 1. Pressiona o botão "Exportar respostas". | 2. Gera o arquivo XML com as respostas. |
| | 3. Inicia o download automático do arquivo. |

---

## UC04: Importar Respostas
**Ator Principal**: Usuário  
**Ator Secundário**: N/A  

**Descrição**: Permite ao usuário carregar um arquivo XML com respostas anteriores para popular a Escada Semiótica.  

**Pré-Condições**: O usuário deve possuir um arquivo XML válido com respostas.  

**Pós-Condições**: As respostas importadas são carregadas no sistema e associadas às respectivas perguntas.  

### Fluxo Principal:
| Ações do Ator | Ações do Sistema |
|:--------------|:----------------|
| 1. Pressiona o botão "Importar respostas". | 2. Exibe seletor de arquivos. |
| 3. Seleciona o arquivo XML. | 4. Lê e valida o conteúdo do arquivo. |
| | 5. Associa as respostas às perguntas na Escada Semiótica. |

---

## UC05: Exportar Documento
**Ator Principal**: Usuário  
**Ator Secundário**: N/A  

**Descrição**: Permite ao usuário gerar e baixar um documento contendo todas as respostas organizadas de acordo com critérios definidos (como degraus, camadas ou checklist).  

**Pré-Condições**: O usuário deve ter respostas salvas no sistema.  

**Pós-Condições**: O documento gerado é baixado.  

### Fluxo Principal:
| Ações do Ator | Ações do Sistema |
|:--------------|:----------------|
| 1. Pressiona o botão "Exportar documento". | 2. Solicita critério de agrupamento (ex.: por degrau, camada, checklist). |
| 3. Seleciona o critério. | 4. Gera o documento com base nas respostas e no critério. |
| | 5. Inicia o download do documento. |

