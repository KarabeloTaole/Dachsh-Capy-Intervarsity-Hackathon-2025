# Vendor

## Third-Party Dependencies

This project uses standard npm package management for all third-party dependencies. No custom vendor libraries or submodules are included in this folder.

## Dependencies Overview

All third-party libraries are managed through `package.json` and installed via npm. The main dependencies include:

### Production Dependencies
- **React** (v19.1.1) - MIT License - Frontend framework
- **React DOM** (v19.1.1) - MIT License - React DOM bindings
- **React Router DOM** (v7.9.1) - MIT License - Client-side routing
- **Recharts** (v3.2.0) - MIT License - Chart and data visualization library
- **React Confetti** (v6.4.0) - MIT License - Confetti animation component

### Development Dependencies
- **Vite** (v7.1.2) - MIT License - Build tool and development server
- **Tailwind CSS** (v4.1.13) - MIT License - Utility-first CSS framework
- **ESLint** (v9.33.0) - MIT License - Code linting
- **PostCSS** (v8.5.6) - MIT License - CSS processing
- **Autoprefixer** (v10.4.21) - MIT License - CSS vendor prefixing

## Licensing Information

All dependencies are open-source and use permissive licenses (primarily MIT). Full license details for each package can be found in their respective `node_modules/[package-name]/LICENSE` files after running `npm install`.

## Package Management

- **Package Manager**: npm
- **Lock File**: `package-lock.json` (tracked in git for reproducible builds)
- **Installation**: Dependencies are installed to `node_modules/` (ignored by .gitignore)

## No Custom Vendor Code

This project does not include:
- Custom third-party libraries in the vendor folder
- Git submodules
- Manually included dependencies
- Self-hosted libraries

All dependencies are fetched from the npm registry during the installation process.

## Dependency Installation

To install all project dependencies:

```bash
cd src/dc-savings
npm install
```

This will:
1. Read `package.json` for dependency list
2. Install packages to `node_modules/`
3. Generate/update `package-lock.json` for version locking

## Security and Updates

- Dependencies are managed through npm's security advisory system
- Run `npm audit` to check for known vulnerabilities
- Use `npm update` to update dependencies (with caution for major versions)

---

*This folder remains empty as all third-party code is managed through npm package management.*