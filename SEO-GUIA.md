# Guia de SEO e partilha — Noja Digital

## O que já está feito no código
- **Sitemap** (`/sitemap.xml`) com 14 páginas: início, 11 serviços, privacidade e termos. **robots.txt** aponta para ele.
- **Uma página por serviço** (`/servicos/...`), cada uma com título, descrição, breadcrumbs e FAQ próprios. É o que permite aparecer em pesquisas como "criação de websites Angola".
- **Dados estruturados (JSON-LD)**: Organization, WebSite, Service, BreadcrumbList e FAQPage.
- **Pré-visualização ao partilhar** (WhatsApp, Facebook, Instagram, LinkedIn, X, Telegram): Open Graph + Twitter Card com imagem 1200×630 (`assets/og-noja-digital.jpg`).
- **Stories**: `assets/story-noja-digital.jpg` (1080×1920) está pronta para publicares nos Stories com o link/sticker.
- **Velocidade**: imagens do portfólio passaram de ~2 MB para ~100 KB (WebP); cache longa e cabeçalhos de segurança no `vercel.json`; redirecionamento `www` → `noja-digital.com`.
- Página `404.html`, favicon na raiz, manifest atualizado, `lang="pt-AO"`.

## O que tens de fazer (só tu consegues)
1. **Ativar o envio do formulário (1 minuto).** O formulário envia para `contacto@noja-digital.com` através do FormSubmit. Depois de publicares, faz **um envio de teste** pelo site: chega um e-mail de ativação a esse endereço. Clica em "Activate". A partir daí todos os pedidos chegam à caixa de entrada (vê também o spam na primeira vez).
2. **Confirmar as redes sociais.** Os links usam `instagram.com/nojadigital`, `facebook.com/nojadigital` e `linkedin.com/company/nojadigital`. Se os teus perfis têm outro nome, corrige em `tools/gerar-paginas.mjs` (objeto `SOCIAL`) e corre `node tools/gerar-paginas.mjs`; ou substitui nos ficheiros.
3. **Google Search Console** (search.google.com/search-console): adiciona `https://noja-digital.com`, verifica (podes usar a meta tag comentada no `<head>` do index.html), vai a *Sitemaps* e submete `sitemap.xml`. Depois, em *Inspeção de URL*, pede indexação da página inicial e dos serviços.
4. **Bing Webmaster Tools** (bing.com/webmasters): podes importar o site diretamente do Search Console. Submete o mesmo sitemap.
5. **Google Business Profile** (business.google.com): cria o perfil da empresa com o mesmo nome, telefone e site. É o que mais ajuda em pesquisas locais.
6. **IndexNow** (Bing, Yandex e outros): a chave já está em `/dd24ad1791a0a119526094cd1f49016a.txt`. Depois de publicar, corre uma vez:
   `curl "https://api.indexnow.org/indexnow?url=https://noja-digital.com/&key=dd24ad1791a0a119526094cd1f49016a"`
7. **Testar as pré-visualizações** depois de publicar: developers.facebook.com/tools/debug (Facebook/Instagram/WhatsApp — clica em "Scrape Again"), opengraph.xyz e linkedin.com/post-inspector. Se mudares a imagem mais tarde, volta a fazer "Scrape Again", porque as redes guardam a anterior em cache.

## Sobre o "1.º lugar"
Ninguém pode garantir o 1.º lugar no Google, e quem o promete não está a ser honesto. O código ajuda o Google a **encontrar e perceber** o site, mas a posição depende também de conteúdo, concorrência e reputação. O que mais move o resultado, por ordem:
- Perfil no Google Business Profile e avaliações de clientes reais.
- Links de outros sites para o teu (diretórios angolanos, parceiros, redes sociais com o site na bio).
- Conteúdo útil e regular (artigos como "Como agendar o passaporte no SME", "Quanto custa um website em Angola").
- Trocar "Conteúdo de demonstração" e "Projeto de demonstração" por trabalhos reais assim que os tiveres: o Google e os clientes valorizam isso.
- Acrescentar morada/cidade quando quiseres aparecer em pesquisas locais (ex.: "agência digital em Luanda").
