# Noja Digital — Website

Website estático da Noja Digital, pronto para publicação no GitHub Pages ou para deploy na Vercel.

## Conteúdo

- `index.html` — página principal completa (HTML, CSS e JavaScript).
- `assets/` — pasta reservada para fotografias e outros recursos locais.
- `assets/IMAGENS.md` — lista das fotografias ilustrativas atualmente utilizadas pelo portfólio.

## Como visualizar localmente

1. Descompacte o ficheiro ZIP.
2. Abra `index.html` no navegador.

Não é necessário instalar dependências nem executar comandos de build.

## Publicar no GitHub Pages

1. Crie um repositório no GitHub (por exemplo, `noja-digital`).
2. Carregue todos os ficheiros e pastas deste pacote para a raiz do repositório.
3. Abra **Settings → Pages**.
4. Em **Build and deployment**, escolha **Deploy from a branch**.
5. Selecione a branch `main` e a pasta `/ (root)`, depois clique em **Save**.
6. Aguarde a publicação. O GitHub apresentará o endereço público do site na secção Pages.

## Publicar na Vercel

Importe o repositório GitHub na Vercel. Como o projeto é HTML estático, não precisa de framework nem de comando de build; a raiz do projeto pode ser publicada diretamente.

## Fotografias do portfólio

As imagens de demonstração do portfólio são atualmente carregadas a partir do Unsplash através de URLs externas presentes no `index.html`. Por isso, é necessária ligação à internet para as visualizar. A pasta `assets/` está preparada para receber fotografias locais: quando tiveres os ficheiros, coloca-os nessa pasta e atualiza os respetivos caminhos no HTML.

**Nota:** as imagens são ilustrativas e não devem ser apresentadas como trabalhos reais da agência. Confirma também as condições/licenças aplicáveis antes de reutilizar imagens de terceiros num projeto comercial.

## Antes de publicar

- Confirma o número de WhatsApp, e-mail e restantes contactos no `index.html`.
- Revê os textos legais de privacidade e termos, que ainda estão identificados como conteúdo de demonstração.
- O formulário é demonstrativo: não grava pedidos numa base de dados. O utilizador pode continuar o contacto pelo WhatsApp.
- Confirma se os serviços e descrições correspondem à oferta atual da empresa.
