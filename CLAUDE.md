# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

Start development server with hot-reload:
```bash
yarn develop
```

Build the Strapi admin panel:
```bash
yarn build
```

Start production server:
```bash
yarn start
```

Run ESLint for code quality:
```bash
yarn lint
```

Fix ESLint issues automatically:
```bash
yarn lint:fix
```

Access Strapi CLI:
```bash
yarn strapi
```

## Architecture Overview

This is a Strapi v3.1.4 CMS application serving as the headless content management system for www.simonjamesrowe.com. The application provides both GraphQL and REST APIs, using MongoDB as the database via mongoose connector.

### Content Model Architecture

The content model represents a personal/professional website with interconnected content types:

**Core Content Types** (located in `/api/`):
- `blog` - Blog posts with rich text content, images, tags, and skills relationships
- `job` - Career entries with company details, descriptions, skills, and resume inclusion flags
- `skills` - Technical skills with ratings (1-10), descriptions, images, and cross-references
- `profile` - User profile information
- `skills-group` - Skill categorization system
- `social-media` - Social media links
- `tag` - Content tagging system
- `tour-step` - UI tour/onboarding steps

**Relationship Patterns**:
- Many-to-Many: Skills ↔ Jobs, Skills ↔ Blogs (bidirectional with `dominant` flags)
- One-to-Many: Tags → Blogs
- Content filtering via flags: `published`, `includeOnResume`, `education`

Each content type follows Strapi's standard structure:
```
api/[content-type]/
├── models/[content-type].settings.json  # Schema definition
├── controllers/[content-type].js        # Request handlers
├── services/[content-type].js          # Business logic
└── config/routes.json                  # Route definitions
```

### Configuration

**Database** (`config/database.js`):
- MongoDB connection via mongoose
- Environment variables: `DATABASE_HOST`, `DATABASE_PORT`, `DATABASE_NAME`, `DATABASE_USERNAME`, `DATABASE_PASSWORD`
- Defaults: localhost:27017/strapi

**Server** (`config/server.js`):
- Runs on HOST='0.0.0.0', PORT=1337 (Docker-friendly)
- Admin JWT secret configuration with fallback

**Middleware** (`config/middleware.js`):
- Standard stack: responseTime → logger → cors → responses → gzip → parser → router
- Static file serving from ./public with 60s caching

### Deployment

**Containerization**:
- Multi-stage Docker build using `strapi/base` image
- Production environment: `NODE_ENV=production`

**CI/CD Pipeline** (`.github/workflows/master-build.yml`):
- Triggers on push to main branch
- Automatic version bumping and Git tagging
- GitHub release creation with changelog
- Docker image build and push to GitHub Container Registry
- Image location: `ghcr.io/simonjamesrowe/strapi-cms/strapi-cms:[version]`

### Key Plugins

- `strapi-plugin-graphql` - GraphQL API layer
- `strapi-plugin-upload` - File/media management
- `strapi-plugin-users-permissions` - Authentication & authorization
- `strapi-plugin-content-manager` - Admin panel content management
- `strapi-plugin-content-type-builder` - Schema management

### Code Standards

**ESLint Configuration**:
- Parser: babel-eslint
- Rules: Single quotes, 2-space indentation, Unix line endings
- EditorConfig included for consistent formatting

### Important Notes

**Strapi Version**: Currently running Strapi v3.1.4 which is **End of Life** and no longer maintained.

**Upgrade Required**: A comprehensive upgrade plan is documented in `STRAPI_UPGRADE_PLAN.md`. The current Node.js version (24.x) is incompatible with all current Strapi versions, requiring environment changes before upgrading to Strapi v4 or v5.