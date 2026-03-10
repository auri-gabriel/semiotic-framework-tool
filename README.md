# Semiotic Framework Tool

A web-based participatory framework tool that implements the Semiotic Ladder framework proposed by Ronald Stamper, integrated with Pressman's Software Engineering Layers. This tool facilitates the development of educational software through structured semiotic modeling and participatory design approaches.

## 🎯 Overview

**fs.SwEdu** (Semiotic Framework for Software Education) is a participatory framework designed to help software engineers and developers in the development of software for the educational domain. The tool takes into account human information functions and IT platform aspects, providing a structured approach to educational software development through semiotic modeling and visualization.

### Key Features

- **🔄 Semiotic Ladder Integration**: Based on Liu's Semiotic Framework (2000) and Pressman's Software Engineering Layers
- **📝 Interactive Question System**: Guided questionnaires organized by semiotic groups and steps
- **📄 Document Generation**: Export responses as PDF documents in multiple formats
- **🌐 Multilingual Support**: Available in English and Portuguese (Brazil)
- **💾 Data Management**: Import/export answers in XML format
- **🎨 Modern UI**: Bootstrap-based responsive interface
- **📱 Client-Side Only**: Runs entirely in the browser with no backend required

## 🛠️ Technology Stack

- **Frontend**: React 19.1.0 with Vite
- **Styling**: Bootstrap 5.3.7 + SASS
- **Rich Text Editing**: ReactQuill (react-quill-new)
- **PDF Generation**: html2pdf.js
- **Build Tool**: Vite 6.3.5
- **Linting**: ESLint 9

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/auri-gabriel/semiotic-framework-tool.git
   cd semiotic-framework-tool
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to access the application.

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
npm run headers:add # Add SPDX/author headers to source files
```

### Header Automation

Use `npm run headers:add` to insert standard copyright/license headers in source files.

- Applies only to `src/**/*.js`, `src/**/*.jsx`, `src/**/*.scss`, and root `*.js`/`*.jsx` config files.
- Ignores third-party/generated paths such as `node_modules/`, `dist/`, `out/`, and `public/fonts/`.
- Is idempotent: files that already contain `SPDX-License-Identifier: GPL-3.0-only` are not modified.

## 🔁 Branching, CI, and Release Flow

This repository follows a lightweight Git Flow-style process:

- **`feature/*` branches**: new work starts here
- **`develop` branch**: integration branch for completed features
- **`main` branch**: production branch

### Automation

- **CI (`.github/workflows/ci.yml`)** runs on pushes to `feature/*`, `develop`, and `main`, and on pull requests to `develop`/`main`.
- CI validates commit messages against Conventional Commits.
- CI validates code quality with `npm ci`, `npm run lint`, and `npm run build`.
- **Release + deploy (`.github/workflows/release-deploy.yml`)** runs automatically on pushes to `main` (typically after merging `develop` into `main`).
- On that push, the workflow uses semantic versioning (from commit messages) to create a GitHub Release and then deploys `dist/` to GitHub Pages.

### Recommended Team Practice

Use Conventional Commits so versioning is computed automatically:

- `feat:` -> **minor** version bump
- `fix:` -> **patch** version bump
- `BREAKING CHANGE:` (or `type!:`) -> **major** version bump

Examples: `feat(auth): add SSO login`, `fix(pdf): prevent empty export`, `feat!: redesign XML schema`.

## 📖 How to Use

### 1. Language Selection

Choose between English and Portuguese (Brazil) using the language selector in the navigation bar.

### 2. Answer Questions

- Navigate to the "Start" section
- Expand semiotic groups and steps to reveal questions about your educational software project
- Use the rich text editor to provide detailed answers about requirements, design, and implementation
- Track your progress with the answer counters

### 3. Export Documents

- Use the bottom toolbar to export your responses
- Choose between "Semiotic Ladder" or "Engineering Layers" format
- Select whether to include only answered questions
- Generate PDF documents with your educational software development analysis

### 4. Data Management

- **Export**: Save your answers as XML files for backup
- **Import**: Load previously saved XML answer files
- **Clear**: Reset all answers to start fresh

## 🏗️ Project Structure

```text
src/
├── business/               # Business logic layer
│   └── SemioticLadderManager.js
├── data/                  # Data layer
│   ├── config.js         # Configuration settings
│   ├── assets/           # Static assets and definitions
│   └── services/         # Data services
│       ├── EngineeringLayersService.js
│       ├── HtmlTemplateService.js
│       ├── PdfService.js
│       ├── SemioticLadderService.js
│       ├── XmlReaderService.js
│       └── XmlService.js
└── presentation/          # Presentation layer
    ├── App.jsx           # Main application component
    ├── components/       # React components
    ├── contexts/         # React contexts
    ├── hooks/           # Custom React hooks
    └── scss/            # Stylesheets
```

## 📚 Theoretical Foundation

The tool is based on two main theoretical frameworks for educational software development:

1. **Semiotic Ladder (Liu, 2000)**: A framework for understanding information systems through semiotic analysis, applied to educational software contexts
2. **Pressman's Software Engineering Layers**: Structured approach to software engineering processes, specifically adapted for educational software development

## 🤝 Contributing

This project is developed as part of the GEInfoEdu Research Group and welcomes contributions:

### Research Team

**Professors:**

- Prof. Dr. Aline Vieira de Mello (Alegrete Campus)
- Prof. Dr. Amanda Meincke Melo (Alegrete Campus) – Research Group Leader
- Prof. Dr. Jean Felipe Patikowski Cheiran (Alegrete Campus)

**Students:**

- Auri Gabriel Castro de Melo (Software Engineering)
- Renilson Pereira Torres (Computer Science, PIBIC-Af 2024)
- Gabriel Souza Rodrigues de Amorim (Software Engineering, PRO-IC MC 2023)

### How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Contact

For questions, suggestions, or collaboration opportunities, please contact the GEInfoEdu Research Group.

## 🔗 References

- Liu, K. **Semiotics in Information Systems Engineering.** Cambridge, England: Cambridge University Press, 2000.
- Pressman, R. S., & Maxim, B. R. **Software Engineering: A Practitioner's Approach.** 8th ed. McGraw-Hill, 2016.

---

**Note**: This tool runs entirely in the browser and does not require any server-side setup. All data processing is performed client-side, ensuring privacy and ease of deployment.
