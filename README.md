# 🛡️ Michiguardian

**Michiguardian** es una aplicación fullstack para almacenar y gestionar contraseñas de forma segura, con cifrado en cliente y sincronización en la nube.

## 🚀 Características principales

- Cifrado AES-256 en cliente
- Master password con hash Argon2/Bcrypt
- API segura con JWT y Refresh Tokens
- Soporte para exportar/importar contraseñas
- Integración futura con 2FA y biometría

## 📦 Stack Tecnológico

### Frontend

- Next.js 15
- React 19
- Tailwind

### Backend 

- Node.js + Express
- Sequelize + MySQL
- JWT
- Bcrypt
- Dotenv

### Infraestructura

- Docker + Docker Compose
- GitHub Actions (CI/CD)
- MySQL como base de datos principal

## 🗂 Estructura del proyecto

```text
michiguardian/
├─ .github/workflows/ # CI/CD
├─ backend/ # API y lógica de negocio
├─ frontend/ # UI y lógica de cliente
├─ infra/ # Configuración de Docker
├─ tests/ # Pruebas unitarias/integración
├─ docs/ # Documentación
├─ CHANGELOG.md
├─ VERSION
├─ README.md
└─ .gitignore
```

## 📜 Versionado

Este proyecto sigue [Semantic Versioning](https://semver.org/lang/es/).  
Formato: `MAJOR.MINOR.PATCH`

- **MAJOR**: Cambios incompatibles
- **MINOR**: Funcionalidades nuevas compatibles
- **PATCH**: Correcciones y mejoras internas

Las versiones se registran en `VERSION` y en `CHANGELOG.md`.

## ⚙️ Instalación para desarrollo

### Clonar el repositorio

```bash
git clone https://github.com/usuario/michiguardian.git
```

## Backend (desarrollo)

```bash
cd michiguardian
cd backend
npm install
cp .env.example .env
npm run dev
```

## Frontend (desarrollo)

```bash
cd frontend
npm install
npm run dev
```

## 🗺 Roadmap

El roadmap detallado está en docs/roadmap.md.

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo LICENSE para más detalles.
