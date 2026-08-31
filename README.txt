PILOTO — PWA (Progressive Web App)
====================================

O QUE TEM NESSA PASTA
----------------------
index.html            → o app inteiro (telas, estilo e lógica)
manifest.json          → identidade do app pra virar "instalável"
sw.js                   → Service Worker (funcionamento offline)
icon.svg                → ícone vetorial do app
apple-touch-icon.png    → ícone 180x180 usado pelo iOS
README.txt              → este arquivo


REQUISITO OBRIGATÓRIO: HTTPS
------------------------------
Service Worker e "Adicionar à Tela de Início" com PWA só funcionam
de verdade em dois cenários:

  1) o site servido por HTTPS, ou
  2) acessado como http://localhost (só pra testes no seu computador)

NÃO adianta mandar o index.html sozinho pelo WhatsApp/AirDrop e abrir
puro no Safari — nesse caso o Service Worker não registra, o manifest
não é lido e o app nunca vira "instalável" de verdade. É por isso que
essa pasta inteira precisa ser hospedada num servidor real.


COMO HOSPEDAR (qualquer uma das opções abaixo serve)
-------------------------------------------------------
Opção simples e gratuita — GitHub Pages:
  1. Crie uma conta em github.com (grátis).
  2. Crie um repositório novo, público.
  3. Envie os 5 arquivos desta pasta (Add file → Upload files),
     todos juntos, na raiz do repositório.
  4. Vá em Settings → Pages, escolha a branch "main" e a pasta "/ (root)",
     salve.
  5. Espere ~1 minuto. Vai aparecer um link tipo:
     https://seuusuario.github.io/nome-do-repositorio/
  6. Esse é o endereço final do seu app.

Qualquer outro host de arquivos estáticos com HTTPS funciona igual
(Netlify, Vercel, Cloudflare Pages, etc.) — é só enviar essa pasta
inteira (os 5 arquivos juntos, mantendo os nomes) pra raiz do site.


INSTALAÇÃO NO IPHONE
----------------------
  1. Abra o link do app no Safari (não em outro navegador — no iOS,
     só o Safari permite instalar PWA na Tela de Início).
  2. Toque no ícone de Compartilhar (quadrado com seta pra cima).
  3. Toque em "Adicionar à Tela de Início".
  4. Toque em "Adicionar".
  5. Abra pelo ícone criado — o app abre em tela cheia, sem a barra
     do Safari, exatamente como um aplicativo instalado.


SOBRE OS DADOS
-----------------
Os dados (renda, contas, gastos, aquisições parceladas etc.) ficam
salvos com localStorage, direto no navegador/app instalado do seu
iPhone. Eles continuam lá mesmo depois de fechar o app, trocar de
tela ou reiniciar o aparelho.

Importante: esse armazenamento é local ao dispositivo e ao navegador.
Ele NÃO sincroniza sozinho entre iPhone, iPad e computador, e se você
limpar os dados do Safari ou desinstalar o app da Tela de Início, os
dados dessa instalação específica se perdem. Não existe um backup na
nuvem automático nesta versão.


SOBRE O "PLANO DE ESTABILIZAÇÃO" (aba Plano)
------------------------------------------------
O botão "Gerar plano" tenta chamar um endpoint próprio do seu backend
(./api/generate-plan), que você precisa implementar e hospedar junto
do site, caso queira uma versão com IA de verdade (o backend é quem
guardaria a chave secreta da Anthropic, nunca o navegador).

Como esse endpoint não existe por padrão nesta pasta, o app detecta
isso automaticamente e usa um plano gerado por regras locais, sem
travar nem exibir erro pro usuário. Ou seja: funciona perfeitamente
sem nenhum backend — só não vai ter a personalização de IA até você
(opcionalmente) montar esse backend.


ATUALIZANDO O APP NO FUTURO
-------------------------------
Se você (ou o Claude) editar o index.html, CSS ou qualquer arquivo:
  1. Suba os arquivos atualizados no mesmo lugar (substituindo os antigos).
  2. Abra sw.js e troque o número da versão do cache, por exemplo:
       const CACHE_NAME = 'piloto-pwa-v1';
     vira:
       const CACHE_NAME = 'piloto-pwa-v2';
  3. Suba o sw.js atualizado também.
Isso garante que o Service Worker limpe o cache antigo e todo mundo
que já instalou o app receba a versão nova, em vez de ficar preso
numa versão desatualizada guardada no cache do iPhone.


COMPATIBILIDADE
-------------------
O mesmo projeto funciona sem alterações em: iPhone/Safari, iPad,
Android/Chrome, e navegadores de desktop (Chrome, Edge, Firefox).
A adaptação pra iOS não remove nem quebra nada da experiência em
outras plataformas.
