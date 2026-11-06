/* Assinatura mglabs — "desenvolvido por" + logo, no rodapé de qualquer site.
   Uso: <script src="assinatura/assinatura.js" defer></script> antes de </body>.
   Opções (atributos no <script>):
     data-tema="escuro"     rodapé escuro: a logo ganha um fundo claro pra continuar legível
     data-alvo="#seletor"   injeta dentro desse elemento em vez de no fim do <body>
     data-href="https://…"  muda o destino do link */
(function () {
  var script = document.currentScript;
  if (!script || document.querySelector("mglabs-assinatura")) return;

  // var LINK = "https://wa.me/5562981330312?text=Ol%C3%A1%2C%20Miguel%21%20Vi%20sua%20assinatura%20no%20rodap%C3%A9%20de%20um%20site%20e%20quero%20um%20site%20assim.";
  var LINK = "https://mglabss.netlify.app/";
  var LOGO = new URL("logo-mglabs.png", script.src).href;
  var escuro = script.dataset.tema === "escuro";

  // Shadow DOM: o CSS do projeto não vaza pra cá nem o nosso pra lá.
  // A fonte e a cor do texto herdam do site (inherit atravessa o shadow).
  var CSS =
    ":host{display:block;margin:0;padding:20px 16px;text-align:center}" +
    "a{display:inline-flex;align-items:center;gap:8px;font:inherit;font-size:12px;" +
    "letter-spacing:.02em;color:inherit;text-decoration:none;" +
    "border-radius:8px}" +
    "span{opacity:.65;transition:opacity .25s ease}" +
    "img{display:block;height:22px;width:auto;opacity:.9;transition:opacity .25s ease}" +
    "a:hover span,a:hover img,a:focus-visible span,a:focus-visible img{opacity:1}" +
    "a:focus-visible{outline:2px solid currentColor;outline-offset:4px}" +
    (escuro ? "img{background:#fff;padding:5px 8px;border-radius:8px;height:30px;box-sizing:border-box}" : "") +
    "@media(prefers-reduced-motion:reduce){span,img{transition:none}}";

  function montar() {
    var host = document.createElement("mglabs-assinatura");
    var raiz = host.attachShadow({ mode: "open" });
    raiz.innerHTML =
      "<style>" + CSS + "</style>" +
      '<a href="' + (script.dataset.href || LINK) + '" target="_blank" rel="noopener" aria-label="Desenvolvido por mglabs">' +
      "<span>desenvolvido por</span>" +
      '<img src="' + LOGO + '" alt="mglabs" width="563" height="160" loading="lazy" decoding="async">' +
      "</a>";
    var alvo = script.dataset.alvo && document.querySelector(script.dataset.alvo);
    (alvo || document.body).appendChild(host);
  }

  if (document.body) montar();
  else document.addEventListener("DOMContentLoaded", montar);
})();
