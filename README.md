# Noja Digital — Website

Website estático da Noja Digital, preparado para publicação no GitHub Pages ou Vercel.

## Estrutura
- `index.html` — página principal e funcionalidades do website.
- `assets/` — fotografias do portfólio e logótipos da marca.
- `privacidade.html` e `termos.html` — páginas legais (estilo em `legal.css`).
- `favicon/` — ícones do site (`favicon.ico`, `favicon-32.png`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`, `site.webmanifest`).
- `vercel.json` — URLs limpas na Vercel (sem `.html`).
- `README.md` — instruções de publicação.

## Portfólio
As imagens são ficheiros locais, sem dependência de links externos. Os projetos têm imagens distintas para Backdrops, Calendário Editorial, Spot Institucional, Design de Evento, Reels de Produto e Campanha de Leads. O projeto de Reels de Produto utiliza os logótipos fornecidos pela Noja Digital, com o fundo preto removido, aplicados na camisola e no painel atrás do personagem.

## Publicar no GitHub Pages
1. Cria um repositório no GitHub.
2. Envia todos os ficheiros da raiz (`index.html`, páginas legais, ícones, `README.md`) e a pasta `assets/` para a raiz do repositório.
3. Vai a **Settings → Pages**.
4. Em **Build and deployment**, escolhe **Deploy from a branch**.
5. Seleciona a branch `main` e a pasta `/ (root)` e guarda.

## Publicar na Vercel
1. Importa o repositório GitHub na Vercel.
2. Mantém as configurações padrão para um website estático.
3. Clica em **Deploy**.

Não é necessário instalar dependências nem executar um processo de build.

## URLs limpas
O site usa `noja-digital.com/`, `/privacidade` e `/termos` (sem `index.html` nem `.html`).
- Os links internos já apontam para os endereços limpos.
- Um pequeno script em cada página limpa a barra do navegador se alguém abrir o endereço com `.html`.
- Na Vercel, o `vercel.json` (`cleanUrls`) trata disto no servidor. No GitHub Pages as páginas já abrem sem `.html`.
