# Portfolio Landing Pages - RS Automação Digital

Estrutura pronta para subir no GitHub e publicar no Easypanel usando Dockerfile + Nginx.

## Estrutura

```txt
portfolio-landing-pages-v2/
├── Dockerfile
├── nginx.conf
├── index.html
├── assets/
│   ├── css/styles.css
│   ├── js/app.js
│   └── images/
├── pericia/
├── contabilidade/
├── nanook/
└── rs-automacao/
```

## Como usar

1. Suba esta pasta para um repositório no GitHub.
2. No Easypanel, crie um novo App.
3. Escolha o repositório do GitHub.
4. Configure:

```txt
Build Method: Dockerfile
Dockerfile Path: ./Dockerfile
Target Port: 80
```

5. Configure o domínio em Domain & Proxy.

## Onde colocar as landing pages reais

Substitua o conteúdo de cada subpasta pelo conteúdo final da respectiva landing page:

```txt
/pericia/
/contabilidade/
/nanook/
/rs-automacao/
```

Cada pasta precisa ter um `index.html` principal.

## WhatsApp

No arquivo `index.html`, procure por:

```html
https://wa.me/5500000000000
```

Troque pelo número real no formato internacional, por exemplo:

```html
https://wa.me/5511999999999
```


## Correção de CSS

Esta versão usa caminhos relativos (`./assets/...`) no `index.html`.
Assim funciona tanto abrindo localmente no navegador quanto publicado no Easypanel/Nginx.

Se substituir os arquivos das landing pages dentro das subpastas, mantenha os caminhos dos assets conforme a posição do arquivo:

- página principal: `./assets/css/styles.css`
- páginas dentro de subpastas: `../assets/...`



## Versão v4

Tema híbrido claro/escuro: fundo claro, cards brancos e blocos escuros apenas nos pontos de destaque. Ideal para portfólio comercial sem ficar pesado demais.
