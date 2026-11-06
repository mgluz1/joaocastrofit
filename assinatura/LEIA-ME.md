# Assinatura mglabs

Rodapé "desenvolvido por" + logo mglabs, pronto pra qualquer site ou landing page.

## Como usar

1. Copie esta pasta (`assinatura/`) pra raiz do projeto.
2. Antes do `</body>`, adicione:

```html
<script src="assinatura/assinatura.js" defer></script>
```

Pronto: a assinatura aparece centralizada no fim da página.

## Opções

```html
<!-- Rodapé escuro: a logo ganha um fundo claro pra não sumir -->
<script src="assinatura/assinatura.js" data-tema="escuro" defer></script>

<!-- Dentro de um elemento específico (ex.: dentro do <footer>) -->
<script src="assinatura/assinatura.js" data-alvo="footer" defer></script>

<!-- Outro destino pro link -->
<script src="assinatura/assinatura.js" data-href="https://mglabs.com.br" defer></script>
```

## Notas

- O link padrão abre o WhatsApp da mglabs. Quando houver domínio, troque a constante `LINK` no topo de `assinatura.js`.
- Não depende do CSS do projeto (usa Shadow DOM) e herda a fonte e a cor do texto do site.
- Arquivos: `assinatura.js` (script) e `logo-mglabs.png` (a mesma logo do rodapé do site da mglabs). Mantenha os dois juntos.
