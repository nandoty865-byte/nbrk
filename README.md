# VistaPro Base V2 + Auth Mock com MSW

Base inicial em React + Vite + TypeScript para o projeto VistaPro, agora com mock REST local de autenticação.

## O que já vem pronto
- login mock REST com `POST /auth/login`
- refresh token com `POST /auth/refresh`
- logout com `POST /auth/logout`
- perfil autenticado em `GET /auth/me`
- rotas públicas e protegidas
- branding centralizado
- shell autenticado com sidebar
- páginas públicas e páginas de status
- UsersPage inicial
- AccessManagementPage inicial
- base simples de permissões por módulo/ação

## Credenciais
- `admin@vistapro.local` / `123456`
- `gestor@vistapro.local` / `123456`
- `operacao@vistapro.local` / `123456`
- `auditoria@vistapro.local` / `123456`
- `atendimento@vistapro.local` / `123456`

## Rodando localmente
```bash
npm install
npm run mock:init
npm run dev
```

## Arquivos novos da integração
- `src/mocks/browser.ts`
- `src/mocks/data.ts`
- `src/mocks/handlers.ts`
- `src/lib/http.ts`
- `src/lib/storage.ts`
- `src/services/authService.ts`

## Próximas evoluções sugeridas
- trocar os handlers MSW por API real
- manter o mesmo `authService` para a troca ser transparente
- evoluir ACL com persistência por perfil/usuário
- refinar SEO e páginas internas
