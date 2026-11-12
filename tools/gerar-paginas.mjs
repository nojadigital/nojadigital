#!/usr/bin/env node
/**
 * Gera as páginas de serviço (servicos/*.html), o sitemap.xml e atualiza os blocos
 * marcados do index.html (lista de serviços, FAQ e links do rodapé).
 *
 * Uso (na raiz do projeto):   node tools/gerar-paginas.mjs
 * Não é necessário para publicar o site: o resultado já está no repositório.
 * Só precisas de o correr se alterares os textos dos serviços abaixo.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://noja-digital.com";
const EMAIL = "contacto@noja-digital.com";
const PHONE = "+244943277105";
const TODAY = new Date().toISOString().slice(0, 10);
const OG = `${SITE}/assets/og-noja-digital.jpg`;
// ⚠️ Confirma que estes são os endereços reais das redes da Noja Digital.
const SOCIAL = {
  instagram: "https://www.instagram.com/nojadigital",
  facebook: "https://www.facebook.com/nojadigital",
  linkedin: "https://www.linkedin.com/company/nojadigital",
};

const GROUPS = [
  { n: "01", t: "Soluções Digitais", d: "Serviços digitais e acesso a soluções de pagamento.", ids: [0, 2] },
  { n: "02", t: "Criatividade e Produção", d: "Ideias transformadas em identidade visual e conteúdo audiovisual.", ids: [1, 3] },
  { n: "03", t: "Marketing Digital", d: "Estratégia, presença online e campanhas para fazer a marca crescer.", ids: [4, 5] },
  { n: "04", t: "Tecnologia e Desenvolvimento", d: "Plataformas digitais feitas para apresentar, vender e expandir o teu negócio.", ids: [8, 9, 10] },
  { n: "05", t: "Apoio Administrativo", d: "Acompanhamento e orientação em processos administrativos.", ids: [6, 7] },
];

// A ordem deste array tem de coincidir com a do array S do index.html.
const S = [
  { slug: "carregamento-digital", e: "card", t: "Carregamento Digital",
    title: "Carregamento Digital e Moedas TikTok | Noja Digital",
    desc: "Carregamento digital rápido e seguro de carteiras digitais e moedas TikTok em Angola. Acompanhamento do pedido e atendimento por WhatsApp.",
    lead: "Carregamento rápido e seguro de carteiras digitais e de moedas TikTok, com acompanhamento do pedido do início ao fim e atendimento por WhatsApp.",
    d: "Carregamento rápido e seguro de carteiras digitais e moedas TikTok.",
    b: ["Processamento rápido", "Acompanhamento do pedido", "Atendimento por WhatsApp"],
    i: ["Carteiras digitais", "Moedas e créditos TikTok", "Pedidos recorrentes", "Simulação de valores"],
    f: [["Quanto demora?", "O prazo é confirmado na proposta."], ["Como pago?", "Os métodos são indicados após o pedido."]] },
  { slug: "audiovisual", e: "video", t: "Audiovisual",
    title: "Produção Audiovisual e Vídeo em Angola | Noja Digital",
    desc: "Produção audiovisual em Angola: vídeos publicitários e institucionais, fotografia, edição e conteúdos digitais para redes sociais.",
    lead: "Produção publicitária, vídeos institucionais e conteúdos digitais, com equipa criativa e vários formatos para redes sociais, televisão e eventos.",
    d: "Produção publicitária, vídeos institucionais e conteúdos digitais.",
    b: ["Equipa criativa", "Vários formatos", "Direção de arte"],
    i: ["Filmagens e produção publicitária", "Edição e pós-produção", "Fotografia", "Vídeos institucionais"],
    f: [["Fazem vídeos para redes sociais?", "Sim, em formatos verticais e horizontais."]] },
  { slug: "conta-visa", e: "id", t: "Conta Visa",
    title: "Conta Visa em Angola: Orientação e Acompanhamento | Noja Digital",
    desc: "Orientação sobre requisitos e processo de solicitação de conta Visa em Angola, com apoio na documentação e acompanhamento do pedido.",
    lead: "Orientação sobre requisitos e processo de solicitação de conta Visa, com apoio na documentação e acompanhamento do estado do pedido.",
    d: "Orientação sobre requisitos e processo de solicitação, com acompanhamento.",
    b: ["Requisitos explicados", "Apoio na documentação", "Acompanhamento"],
    i: ["Esclarecimento de requisitos", "Apoio na solicitação", "Acompanhamento do estado", "Orientação pós-pedido"],
    n: "A emissão é da responsabilidade das instituições emissoras e sujeita às suas condições e à lei aplicável. Prestamos apenas informação e acompanhamento.",
    f: [["A agência emite a conta?", "Não. A emissão é da instituição emissora."]] },
  { slug: "design-grafico", e: "palette", t: "Design Gráfico",
    title: "Design Gráfico e Identidade Visual em Angola | Noja Digital",
    desc: "Design gráfico em Angola: logotipos, identidade visual, posters, panfletos, roll-ups, backdrops e materiais publicitários prontos para impressão.",
    lead: "Logotipos, identidade visual e materiais publicitários com consistência visual e prontos para impressão ou para o digital.",
    d: "Logotipos, identidade visual e materiais publicitários.",
    b: ["Identidade distinta", "Pronto para impressão", "Consistência visual"],
    i: ["Logotipos e identidade visual", "Posters e panfletos", "Roll-ups e backdrops", "Banners e publicidade"],
    f: [["Recebo os ficheiros originais?", "Sim, conforme combinado na proposta."]] },
  { slug: "gestao-de-redes-sociais", e: "chat", t: "Gestão de Redes Sociais",
    title: "Gestão de Redes Sociais em Angola | Noja Digital",
    desc: "Gestão de redes sociais em Angola: estratégia, calendário editorial, criação de conteúdos, comunidade e relatórios de desempenho.",
    lead: "Estratégia, criação de conteúdos e gestão de comunidade nas tuas redes sociais, com calendário editorial e relatórios periódicos.",
    d: "Estratégia, conteúdos e gestão de comunidade, com relatórios.",
    b: ["Calendário editorial", "Comunidade ativa", "Relatórios periódicos"],
    i: ["Estratégia e planeamento", "Criação de conteúdos", "Publicação e comunidade", "Análise de desempenho"],
    f: [["Que redes gerem?", "Instagram, Facebook, TikTok e outras, conforme o plano."]] },
  { slug: "gestao-de-anuncios", e: "mega", t: "Gestão de Anúncios",
    title: "Gestão de Anúncios Meta e TikTok Ads em Angola | Noja Digital",
    desc: "Gestão de anúncios em Angola: campanhas Meta Ads (Facebook e Instagram) e TikTok Ads, captação de leads, otimização e relatórios.",
    lead: "Campanhas Meta Ads e TikTok Ads com segmentação rigorosa, foco em leads e otimização contínua, acompanhadas por relatórios.",
    d: "Campanhas Meta Ads e TikTok Ads, leads e otimização.",
    b: ["Segmentação rigorosa", "Otimização contínua", "Foco em leads"],
    i: ["Campanhas Meta Ads", "Campanhas TikTok Ads", "Captação de leads", "Otimização e relatórios"],
    f: [["O investimento em anúncios está incluído?", "Não; é pago diretamente às plataformas."]] },
  { slug: "agendamento-de-passaporte", e: "passport", t: "Agendamento de Passaporte",
    title: "Agendamento de Passaporte em Angola (SME) | Noja Digital",
    desc: "Apoio no agendamento de passaporte no site do SME em Angola: documentos necessários, preenchimento, marcação e comprovativo.",
    lead: "Suporte no agendamento do passaporte no site do SME, passo a passo, até à confirmação da marcação.",
    d: "Suporte no agendamento no site do SME, até à confirmação.",
    b: ["Apoio passo a passo", "Menos erros", "Acompanhamento até à confirmação"],
    i: ["Documentos necessários", "Preenchimento no site do SME", "Marcação de data e local", "Comprovativo do agendamento"],
    n: "A emissão do passaporte é do Serviço de Migração e Estrangeiros (SME). Prestamos apenas suporte no agendamento e não garantimos datas.",
    f: [["A agência emite o passaporte?", "Não; a emissão é feita pelo SME."]] },
  { slug: "constituicao-de-empresas", e: "building", t: "Constituição de Empresas",
    title: "Constituição de Empresas em Angola | Noja Digital",
    desc: "Apoio na constituição de empresas em Angola: tipo de sociedade, organização da documentação, pedidos e registos, com acompanhamento até à conclusão.",
    lead: "Suporte administrativo na constituição da tua empresa, com orientação documental e acompanhamento até à conclusão do processo.",
    d: "Suporte na constituição da empresa, com acompanhamento até à conclusão.",
    b: ["Acompanhamento até à conclusão", "Orientação documental", "Comunicação clara"],
    i: ["Tipo de sociedade", "Organização da documentação", "Pedidos e registos", "Apoio até à conclusão"],
    n: "Prestamos suporte administrativo; prazos e decisões dependem dos organismos competentes. Para questões jurídicas, recomendamos um profissional habilitado.",
    f: [["Acompanham até ao fim?", "Sim, até à conclusão do processo."]] },
  { slug: "criacao-de-websites", e: "globe", t: "Criação de Websites",
    title: "Criação de Websites em Angola | Noja Digital",
    desc: "Criação de websites em Angola: sites institucionais, landing pages e portfólios rápidos, responsivos e preparados para SEO. Pede orçamento.",
    lead: "Websites institucionais, landing pages e portfólios rápidos, responsivos e preparados para serem encontrados nos motores de pesquisa.",
    d: "Websites institucionais, landing pages e portfólios, rápidos e responsivos.",
    b: ["Design responsivo", "Carregamento rápido", "Preparado para SEO"],
    i: ["Sites institucionais", "Landing pages", "Portfólios e blogs", "Domínio, alojamento e manutenção"],
    f: [["Incluem domínio e alojamento?", "Podem ser incluídos; fica definido na proposta."], ["Consigo editar o conteúdo?", "Sim, podemos prever um painel de gestão."]] },
  { slug: "lojas-online", e: "cart", t: "Lojas Online (E-commerce)",
    title: "Lojas Online e E-commerce em Angola | Noja Digital",
    desc: "Criação de lojas online em Angola: catálogo, carrinho, pagamentos e gestão de encomendas. Soluções de e-commerce à medida do teu negócio.",
    lead: "Lojas online com catálogo fácil de gerir, compra simples e integração com pagamentos, para vender os teus produtos na internet.",
    d: "Catálogo, carrinho, pagamentos e gestão de encomendas.",
    b: ["Catálogo fácil de gerir", "Compra simples", "Integração com pagamentos"],
    i: ["Lojas online", "Catálogo e gestão de produtos", "Carrinho e checkout", "Pagamentos e entregas"],
    n: "Os meios de pagamento disponíveis dependem dos prestadores e da legislação aplicáveis.",
    f: [["Que meios de pagamento posso aceitar?", "Depende dos prestadores disponíveis; avaliamos na proposta."], ["Posso gerir os produtos sozinho?", "Sim, com um painel de gestão."]] },
  { slug: "desenvolvimento-de-aplicativos", e: "phone", t: "Desenvolvimento de Aplicativos",
    title: "Desenvolvimento de Apps e Aplicações Web em Angola | Noja Digital",
    desc: "Desenvolvimento de aplicativos em Angola: apps móveis Android e iOS e aplicações web à medida, do desenho UI/UX à publicação.",
    lead: "Aplicações móveis e web à medida do teu negócio, do desenho da interface à publicação, com acompanhamento em todas as etapas.",
    d: "Aplicações móveis e web à medida do teu negócio, do desenho à publicação.",
    b: ["Desenhado à medida", "Experiência intuitiva", "Acompanhamento até à publicação"],
    i: ["Apps móveis (Android e iOS)", "Aplicações web", "Desenho de interface (UI/UX)", "Publicação e manutenção"],
    f: [["Quanto tempo demora?", "Depende da complexidade; indicamos prazos na proposta."], ["Publicam nas lojas de apps?", "Apoiamos o processo, sujeito às regras de cada loja."]] },
];

// Perguntas frequentes visíveis na página inicial (+ marcação FAQPage).
const FAQ = [
  ["Como peço um orçamento?", "Clica em «Pedir orçamento», preenche o formulário com o serviço e a descrição do projeto e respondemos o mais depressa possível."],
  ["Incluem domínio e alojamento na criação de websites?", "Podem ser incluídos; fica definido na proposta."],
  ["Que meios de pagamento posso aceitar na minha loja online?", "Depende dos prestadores disponíveis; avaliamos na proposta."],
  ["O investimento em anúncios está incluído na gestão de anúncios?", "Não; é pago diretamente às plataformas (Meta, TikTok)."],
  ["A Noja Digital emite o passaporte ou a conta Visa?", "Não. A emissão do passaporte é do Serviço de Migração e Estrangeiros (SME) e a da conta Visa das instituições emissoras. Prestamos apoio e acompanhamento no processo."],
  ["Fazem vídeos para redes sociais?", "Sim, em formatos verticais e horizontais."],
];

const IC = {card:'<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20M6 15h4"/>',video:'<path d="m22 8-6 4 6 4V8Z"/><rect x="2" y="6" width="14" height="12" rx="2"/>',id:'<rect x="2" y="4" width="20" height="16" rx="2"/><circle cx="8.5" cy="11" r="2"/><path d="M5.5 17c.6-2.4 4.4-2.4 6 0M15 9h4M15 13h4"/>',palette:'<path d="M12 22a10 10 0 1 1 10-10c0 3-2 4-4 4h-2a2 2 0 0 0-1 3.5c.5.7.2 2.5-3 2.5Z"/><circle cx="7.5" cy="11" r="1"/><circle cx="12" cy="7" r="1"/><circle cx="16.5" cy="11" r="1"/>',chat:'<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z"/><path d="M8.5 12h.01M12 12h.01M15.5 12h.01"/>',mega:'<path d="m3 11 18-5v12L3 14v-3Z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>',passport:'<rect x="5" y="2" width="14" height="20" rx="2"/><circle cx="12" cy="10" r="3"/><path d="M9 17h6"/>',building:'<path d="M3 21h18M6 21V5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v16M14 9h3a1 1 0 0 1 1 1v11"/><path d="M9 8h2M9 12h2M9 16h2"/>',globe:'<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/>',cart:'<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/>',phone:'<rect x="6" y="2" width="12" height="20" rx="3"/><path d="M11 18h2"/>'};
const svgIc = (k) => `<svg viewBox="0 0 24 24" aria-hidden="true">${IC[k]}</svg>`;
const ARROW = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>';

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const url = (s) => `/servicos/${s.slug}`;

// ---------- ícones sociais (estilo UI moderno) ----------
const SOC = {
  instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none"/>',
  facebook: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
  linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
  email: '<path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/><path d="m22 6.5-10 7-10-7"/>',
};
const socIcon = (k) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${SOC[k]}</svg>`;
export const social = (variant = "", withEmailText = false) =>
  `<div class="soc ${variant}">` +
  `<a class="si ig" href="${SOCIAL.instagram}" target="_blank" rel="noopener me" aria-label="Instagram da Noja Digital" title="Instagram">${socIcon("instagram")}</a>` +
  `<a class="si fb" href="${SOCIAL.facebook}" target="_blank" rel="noopener me" aria-label="Facebook da Noja Digital" title="Facebook">${socIcon("facebook")}</a>` +
  `<a class="si li" href="${SOCIAL.linkedin}" target="_blank" rel="noopener me" aria-label="LinkedIn da Noja Digital" title="LinkedIn">${socIcon("linkedin")}</a>` +
  `<a class="si em${withEmailText ? " wide" : ""}" href="mailto:${EMAIL}" aria-label="Enviar e-mail para ${EMAIL}" title="${EMAIL}">${socIcon("email")}${withEmailText ? `<span>${EMAIL}</span>` : ""}</a>` +
  `</div>`;

// ---------- JSON-LD ----------
const ld = (o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`;
const faqLd = (items) => ({ "@type": "FAQPage", mainEntity: items.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) });

// ---------- <head> partilhado ----------
const head = ({ title, desc, path, ogType = "website", graph, extra = "" }) => `<!DOCTYPE html>
<html lang="pt-AO">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">
<link rel="canonical" href="${SITE}${path}">
<link rel="alternate" hreflang="pt-AO" href="${SITE}${path}">
<link rel="alternate" hreflang="x-default" href="${SITE}${path}">
<meta name="theme-color" content="#0b0b0c">
<meta name="author" content="Noja Digital">
<meta name="format-detection" content="telephone=yes">
<meta property="og:type" content="${ogType}">
<meta property="og:site_name" content="Noja Digital">
<meta property="og:locale" content="pt_PT">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${SITE}${path}">
<meta property="og:image" content="${OG}">
<meta property="og:image:secure_url" content="${OG}">
<meta property="og:image:type" content="image/jpeg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Noja Digital: soluções digitais e administrativas para fazer o teu negócio avançar">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(desc)}">
<meta name="twitter:image" content="${OG}">
<meta name="twitter:image:alt" content="Noja Digital: soluções digitais e administrativas para fazer o teu negócio avançar">
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32.png">
<link rel="icon" type="image/png" sizes="192x192" href="/favicon/icon-192.png">
<link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png">
<link rel="manifest" href="/favicon/site.webmanifest">
<link rel="sitemap" type="application/xml" href="/sitemap.xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500;600&display=swap">
${extra}${ld({ "@context": "https://schema.org", "@graph": graph })}
</head>`;

const ORG_REF = { "@id": `${SITE}/#org` };
const orgNode = () => ({
  "@type": "Organization", "@id": `${SITE}/#org`, name: "Noja Digital", url: `${SITE}/`,
  logo: { "@type": "ImageObject", url: `${SITE}/favicon/icon-512.png`, width: 512, height: 512 },
  image: OG, email: EMAIL, telephone: PHONE,
  description: "Websites, lojas online, aplicativos, marketing digital, audiovisual, design, carregamento digital e apoio administrativo em Angola.",
  areaServed: { "@type": "Country", name: "Angola" },
  sameAs: Object.values(SOCIAL),
  contactPoint: [{ "@type": "ContactPoint", contactType: "customer service", email: EMAIL, telephone: PHONE, areaServed: "AO", availableLanguage: ["pt"] }],
  hasOfferCatalog: { "@type": "OfferCatalog", name: "Serviços da Noja Digital", itemListElement: S.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.t, url: SITE + url(s) } })) },
});

// ---------- páginas de serviço ----------
const groupOf = (i) => GROUPS.find((g) => g.ids.includes(i)).t;
const servicePage = (s, i) => {
  const path = url(s);
  const others = S.map((x, n) => [x, n]).filter(([, n]) => n !== i);
  const graph = [
    orgNode(),
    { "@type": "WebSite", "@id": `${SITE}/#website`, url: `${SITE}/`, name: "Noja Digital", inLanguage: "pt-AO", publisher: ORG_REF },
    { "@type": "WebPage", "@id": `${SITE}${path}#webpage`, url: `${SITE}${path}`, name: s.title, description: s.desc, inLanguage: "pt-AO", isPartOf: { "@id": `${SITE}/#website` }, primaryImageOfPage: { "@type": "ImageObject", url: OG }, breadcrumb: { "@id": `${SITE}${path}#breadcrumb` } },
    { "@type": "BreadcrumbList", "@id": `${SITE}${path}#breadcrumb`, itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: `${SITE}/` },
      { "@type": "ListItem", position: 2, name: "Serviços", item: `${SITE}/#servicos` },
      { "@type": "ListItem", position: 3, name: s.t, item: `${SITE}${path}` } ] },
    { "@type": "Service", "@id": `${SITE}${path}#service`, name: s.t, serviceType: s.t, description: s.desc, url: `${SITE}${path}`, provider: ORG_REF, areaServed: { "@type": "Country", name: "Angola" }, mainEntityOfPage: { "@id": `${SITE}${path}#webpage` } },
    faqLd(s.f),
  ];
  return `${head({ title: s.title, desc: s.desc, path, graph, extra: '<link rel="stylesheet" href="/servico.css">\n' })}
<body>
<header class="top"><a class="lg" href="/"><img src="/assets/noja-logo-horizontal.png" alt="Noja Digital" width="175" height="24"></a><a class="bk" href="/#servicos">← Todos os serviços</a></header>
<main>
<nav class="bc" aria-label="Caminho"><a href="/">Início</a><span>/</span><a href="/#servicos">Serviços</a><span>/</span><span aria-current="page">${esc(s.t)}</span></nav>
<span class="eyebrow">${esc(groupOf(i))}</span>
<h1>${esc(s.t)} <b>em Angola</b></h1>
<p class="lead">${esc(s.lead)}</p>
<div class="row"><a class="bt" href="/?orcamento=${s.slug}" rel="nofollow">Pedir orçamento</a><a class="bt o" href="/#contacto">Falar connosco</a></div>
<div class="chips">${s.b.map((b) => `<span>${esc(b)}</span>`).join("")}</div>
<h2>O que inclui</h2>
<ul class="inc">${s.i.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
${s.n ? `<p class="nt"><b>Aviso:</b> ${esc(s.n)}</p>` : ""}
<h2>Perguntas frequentes</h2>
<div class="faq">${s.f.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("")}</div>
<h2>Outros serviços</h2>
<ul class="more">${others.map(([x]) => `<li><a href="${url(x)}">${esc(x.t)}</a></li>`).join("")}</ul>
<div class="cta"><h2>Vamos começar?</h2><p>Conta-nos o que precisas e respondemos o mais depressa possível.</p><a class="bt k" href="/?orcamento=${s.slug}" rel="nofollow">Preencher formulário</a>${social("dk", true)}</div>
</main>
<footer><span>© 2026 Noja Digital</span><div class="fl2">${social("ic")}<span><a href="/privacidade">Privacidade</a><a href="/termos">Termos</a></span></div></footer>
</body>
</html>
`;
};

mkdirSync(join(ROOT, "servicos"), { recursive: true });
S.forEach((s, i) => writeFileSync(join(ROOT, "servicos", `${s.slug}.html`), servicePage(s, i)));

// ---------- blocos do index.html ----------
const servicesBlock = GROUPS.map((g) =>
  `<div class="sgroup rv"><div class="sghead"><span class="sgnum">${g.n}</span><div><h3>${g.t}</h3><p>${g.d}</p></div></div><div class="sgitems">${g.ids.map((n) => { const x = S[n];
    return `<a class="cd" href="${url(x)}" data-o="${n}"><span class="e">${svgIc(x.e)}</span><div><h3>${esc(x.t)}</h3><p>${esc(x.d)}</p></div><span class="ar">${ARROW}</span></a>`; }).join("")}</div></div>`).join("\n");
const faqBlock = FAQ.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("\n");
const footerServices = S.map((s) => `<li><a href="${url(s)}">${esc(s.t.replace(" (E-commerce)", ""))}</a></li>`).join("");
const socialCta = social("dk", true);
const socialFooter = social("ic");
const indexGraph = [
  orgNode(),
  { "@type": "WebSite", "@id": `${SITE}/#website`, url: `${SITE}/`, name: "Noja Digital", inLanguage: "pt-AO", publisher: ORG_REF },
  { "@type": "WebPage", "@id": `${SITE}/#webpage`, url: `${SITE}/`, name: "Noja Digital: Websites, Marketing e Serviços Digitais em Angola", inLanguage: "pt-AO", isPartOf: { "@id": `${SITE}/#website` }, about: ORG_REF, primaryImageOfPage: { "@type": "ImageObject", url: OG } },
  faqLd(FAQ),
];

let idx = readFileSync(join(ROOT, "index.html"), "utf8");
const inject = (name, html) => {
  const re = new RegExp(`(<!--S:${name}-->)[\\s\\S]*?(<!--/S:${name}-->)`);
  if (!re.test(idx)) throw new Error(`Marcador em falta no index.html: ${name}`);
  idx = idx.replace(re, (_, a, b) => `${a}${html}${b}`);
};
inject("servicos", servicesBlock);
inject("faq", faqBlock);
inject("rodape-servicos", footerServices);
inject("social-cta", socialCta);
inject("social-rodape", socialFooter);
inject("jsonld", ld({ "@context": "https://schema.org", "@graph": indexGraph }));
writeFileSync(join(ROOT, "index.html"), idx);

// ---------- sitemap.xml ----------
const urls = [
  { loc: "/", prio: "1.0", images: ["/assets/og-noja-digital.jpg", "/assets/identidade-visual.webp", "/assets/spot-institucional.webp", "/assets/campanha-leads.webp", "/assets/calendario-editorial.jpg", "/assets/backdrops.webp", "/assets/reels-produto.webp", "/assets/design-evento.webp"] },
  ...S.map((s) => ({ loc: url(s), prio: "0.8" })),
  { loc: "/privacidade", prio: "0.3" },
  { loc: "/termos", prio: "0.3" },
];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.map((u) => `  <url>
    <loc>${SITE}${u.loc === "/" ? "/" : u.loc}</loc>
    <lastmod>${TODAY}</lastmod>
    <xhtml:link rel="alternate" hreflang="pt-AO" href="${SITE}${u.loc}"/>
    <priority>${u.prio}</priority>${(u.images || []).map((im) => `\n    <image:image><image:loc>${SITE}${im}</image:loc></image:image>`).join("")}
  </url>`).join("\n")}
</urlset>
`;
writeFileSync(join(ROOT, "sitemap.xml"), sitemap);
console.log(`OK: ${S.length} páginas de serviço, sitemap com ${urls.length} URLs.`);
