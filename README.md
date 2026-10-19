# Ástria — site institucional

Site institucional da Ástria, criado com React e Vite. A experiência combina uma identidade visual espacial, uma cena de galáxias em Three.js, animações com GSAP e uma interface adaptável para desktop, tablet e celular.

O site oferece conteúdo em português e inglês, alternância entre temas escuro e claro e animações vinculadas à navegação pela página.

## Requisitos

- Node.js 20.19.0 ou superior
- npm
- Python 3 (opcional, para usar o script de inicialização)

## Executar localmente

Instale as dependências e inicie o servidor de desenvolvimento:

```bash
npm install
npm run dev
```

Abra o endereço exibido pelo Vite no terminal, normalmente `http://localhost:5173`.

Como alternativa, inicie o projeto com o script Python:

```bash
python3 run_project.py
```

O script confere se Node.js e npm estão disponíveis, instala as dependências quando `node_modules` não existe e inicia o servidor Vite.

## Build de produção

```bash
npm run build
npm start
```

O build gera os arquivos estáticos em `dist/`. O servidor de produção usa a variável `PORT` quando fornecida pela plataforma de hospedagem.

## Deploy no Railway

O arquivo `railway.json` configura o comando de build (`npm run build`), o comando de inicialização (`npm run start`) e a verificação de saúde. Conecte o repositório GitHub ao Railway para iniciar o deploy.

## Tecnologias

- React 19 e Vite 7
- Three.js e React Three Fiber
- GSAP com ScrollTrigger
- CSS responsivo
