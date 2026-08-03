<div align="center">

Language Assistant

An evolving AI-assisted language-learning experience with a modern Persian RTL interface.



Repository · Issues

</div>

[!IMPORTANT]Language Assistant is under active development. The authentication interface is the most developed part of the current repository. Dashboard, chat services, learning pages, and backend integrations are still incomplete or scaffolded.

Table of Contents

Overview

Project Vision

What Is Implemented

What Is Still in Development

Technology Stack

Architecture

Project Structure

Getting Started

Environment Configuration

Scripts

Roadmap

Contributing

Security and Privacy

License

Overview

Language Assistant is an early-stage web application intended to make language practice more interactive, personalized, and approachable. The product direction combines a Persian-first interface with future conversational learning tools, structured practice, progress tracking, and pronunciation-focused experiences.

The repository already contains a polished animated login interface and the beginnings of a modular application architecture. It uses the Next.js App Router for the main application while also retaining some additional route and page scaffolding that is expected to be consolidated as development continues.

Project Vision

The planned product is a focused learning companion that can help users:

Practice realistic conversations at an appropriate difficulty level.

Receive clear corrections and explanations.

Build vocabulary through context rather than isolated memorization.

Review mistakes and learning history.

Follow personalized exercises and progress goals.

Practice pronunciation and speaking through future voice features.

Use a responsive Persian RTL interface without sacrificing support for target-language content.

AI, chat, pronunciation, and adaptive-learning features are part of the roadmap and should not be considered complete in the current version.

What Is Implemented

The current repository includes:

A Next.js 16 and React 19 application foundation.

TypeScript and Tailwind CSS 4 configuration.

A client-rendered login experience loaded dynamically from the home route.

A Persian right-to-left authentication interface.

Framer Motion animations, gradients, and glass-style visual treatment.

Username and password fields.

Zod-based input validation.

Loading and error feedback for login submission.

A redirect flow prepared for /dashboard after successful authentication.

Dependencies and folders prepared for Clerk, Axios, React Hook Form, Zustand, API services, layouts, routing, and utility modules.

What Is Still in Development

The following areas are currently incomplete or placeholders:

The dashboard route does not yet contain an implementation.

The chat API service is not yet implemented.

The login request does not yet point to a completed backend endpoint.

Chat, home, product, and product-list page scaffolds are unfinished.

Header, footer, sidebar, and broader application layout modules require implementation or consolidation.

Authentication strategy still needs to be finalized between custom API logic and Clerk.

Automated tests and deployment documentation have not yet been added.

This distinction is intentional: the repository is a work in progress, and the README avoids claiming that planned AI functionality already works.

Technology Stack

Area

Technology

Framework

Next.js 16.2.3

UI Library

React 19.2.4

Language

TypeScript 5

Styling

Tailwind CSS 4

Animation

Framer Motion 12

Forms

React Hook Form

Validation

Zod 4

HTTP

Axios

Authentication Foundation

Clerk for Next.js and custom login scaffolding

Client State

Zustand 5

Server Foundation

Express 5 dependency for future service work

Code Quality

ESLint 9 and Next.js ESLint configuration

Architecture

flowchart LR
    U[Learner] --> N[Next.js App Router]
    N --> A[Authentication UI]
    N --> D[Dashboard]
    N --> C[Conversation Experience]
    A --> V[Zod / Form Validation]
    A --> S[Authentication Service]
    C --> API[Chat API Service]
    D --> Z[Zustand State]
    S --> B[Backend / Clerk]
    API --> AI[Language Model Provider]

The diagram represents the intended direction. Authentication UI exists today; dashboard, chat-service, backend, and AI-provider connections are still being built.

Project Structure

-language-assistant/
├── app/
│   ├── api/
│   │   └── services/        # Chat/config service scaffolding
│   ├── app/
│   │   ├── (auth)/          # Authentication route-group scaffolding
│   │   └── dashboard/       # Dashboard route under development
│   ├── pages/               # Early page scaffolds awaiting consolidation
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx             # Dynamically renders the login form
├── public/                  # Static assets
├── src/
│   ├── components/
│   │   └── auth/            # Current login implementation
│   ├── layout/              # Header, footer, and sidebar scaffolding
│   ├── router/              # Routing experiments/configuration
│   ├── styles/              # Shared style modules
│   ├── utils/               # Shared utility modules
│   ├── app.tsx
│   └── main.tsx
├── next.config.ts
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── package.json

Getting Started

Prerequisites

Node.js 20 LTS recommended

npm 10 or newer recommended

Git

Installation

git clone https://github.com/Aihan-2005/-language-assistant.git language-assistant
cd language-assistant
npm install

The clone command uses a clean local folder name because the GitHub repository name begins with a hyphen.

Start development

npm run dev

Open http://localhost:3000.

Create a production build

npm run build
npm run start

Environment Configuration

The current login screen can render without a completed external service configuration, but successful authentication requires a real backend or Clerk integration.

Create .env.local when authentication work begins:

# Clerk — required only when Clerk integration is enabled
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Add the final backend or AI-provider variables after the service layer is implemented.
# Do not expose secret API keys through NEXT_PUBLIC_* variables.

A future .env.example should contain variable names and safe placeholder values only—never real secrets.

Scripts

Command

Description

npm run dev

Start the Next.js development server

npm run build

Create an optimized production build

npm run start

Run the production server

npm run lint

Run ESLint

Roadmap

Phase 1 — Foundation

Initialize Next.js, React, TypeScript, and Tailwind CSS.

Build the first Persian RTL login interface.

Add client-side validation, loading, and error states.

Prepare dashboard, service, layout, and route scaffolding.

Consolidate duplicate routing experiments into one clear App Router structure.

Add a committed .env.example.

Phase 2 — Authentication and Dashboard

Choose and document the final authentication strategy.

Connect login and registration to a real service.

Add protected routes and session handling.

Build the dashboard shell, header, sidebar, and responsive navigation.

Add user profile and learning-preference settings.

Phase 3 — Learning Experience

Implement the chat service and conversation interface.

Add proficiency-level and learning-goal selection.

Add correction, explanation, and example-response workflows.

Save conversation history and user mistakes.

Add vocabulary review and spaced-practice foundations.

Add progress summaries and practice streaks.

Phase 4 — Voice and Intelligence

Add speech input with clear recording controls.

Add text-to-speech playback for model responses.

Add pronunciation feedback with transparent confidence indicators.

Add adaptive exercises based on prior mistakes.

Add safety controls, rate limits, and content moderation.

Phase 5 — Quality and Release

Add unit, component, and end-to-end tests.

Add automated lint, type-check, and build workflows.

Audit accessibility for RTL and keyboard use.

Add privacy documentation and data-retention controls.

Deploy a stable public preview.

Publish versioned release notes.

Contributing

Contributions are welcome while the architecture is evolving.

Fork the repository.

Create a focused branch:

git checkout -b feat/conversation-ui

Install dependencies and start the app.

Keep route and architecture changes well documented.

Run checks before opening a pull request:

npm run lint
npm run build

Include screenshots or a short recording for visible interface changes.

Clearly state whether the contribution is complete, experimental, or blocked by a backend dependency.

Security and Privacy

A language-learning assistant may process personal messages, voice recordings, and learning history. Before production use:

Never commit Clerk, model-provider, database, or backend secrets.

Keep AI-provider keys on the server.

Avoid logging passwords, access tokens, full conversations, or raw voice recordings.

Explain what user data is stored, why it is stored, and how it can be deleted.

Validate all authentication and chat inputs server-side.

Add rate limiting and abuse prevention to public endpoints.

Treat generated corrections as assistance, not guaranteed linguistic authority.

Obtain clear consent before storing or analyzing voice data.

License

No open-source license is currently published in the repository. Until a license is added, the source remains under the copyright holder's default rights.

<div align="center">

Built and maintained by Aihan-2005.

A Persian-first foundation for more natural, personal, and consistent language practice.

</div>
