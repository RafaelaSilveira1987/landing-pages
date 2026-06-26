# Landing Page — Contador Tributarista

Landing page estática para captação de leads de consultoria tributária.

## Arquivos

- `index.html`: estrutura da página e copy de venda.
- `assets/css/style.css`: layout, responsividade, cores e animações.
- `assets/js/app.js`: menu mobile, formulário, máscara de telefone/CNPJ, WhatsApp, FAQ e botão voltar ao topo.
- `assets/img/logo.svg`: logo provisória em SVG.

## Como personalizar rápido

### 1. WhatsApp

Abra `assets/js/app.js` e altere:

```js
whatsappNumber: "5500000000000"
```

Use DDI + DDD + número. Exemplo:

```js
whatsappNumber: "5585999999999"
```

### 2. E-mail

No `index.html`, procure por:

```html
contato@seudominio.com
```

Troque pelo e-mail do contador.

### 3. Nome da marca

A logo está em SVG provisório. Você pode substituir o arquivo `assets/img/logo.svg` por outra logo mantendo o mesmo nome, ou editar o texto diretamente no SVG.

### 4. Receber leads no n8n ou CRM

No `assets/js/app.js`, cole a URL do webhook:

```js
webhookUrl: "https://seu-webhook-aqui"
```

Se deixar vazio, o formulário apenas abre o WhatsApp com os dados preenchidos.

## Observação importante

A copy evita promessa de redução garantida de impostos. Para serviços tributários, isso é melhor comercialmente e mais seguro: vende autoridade sem parecer aventura fiscal.
