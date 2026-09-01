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


SOBRE GASTOS NO CARTÃO DE CRÉDITO
---------------------------------------
Ao vincular um gasto avulso a um cartão, ele deixa de descontar na hora
do "disponível hoje" do Painel. Em vez disso, ele entra na fatura que
vence no dia configurado no cartão: se a compra foi feita até esse dia,
cai na fatura deste mês; depois desse dia, cai na fatura do mês
seguinte. O saldo só é afetado quando a fatura realmente "vence".

A aba Gastos continua mostrando todas as compras pela data real (pra
você não perder o controle de quando comprou o quê) — ela só não soma
mais os gastos de cartão ainda não vencidos no total que afeta seu
saldo. Cada gasto de cartão mostra uma notinha indicando em qual fatura
ele vai cair.

Configure o dia de vencimento de cada cartão na aba Cartões, ao
adicionar ou editar.


SOBRE O EXTRATO MENSAL (REDESENHADO)
-------------------------------------------
Ao expandir um mês na aba Meses, o extrato agora mostra os lançamentos
organizados em grupos — primeiro "Contas, parcelas e cartão" (tudo que é
recorrente ou parcelado, incluindo faturas de cartão previstas pra
aquele mês), depois "Gastos variáveis" (compras avulsas sem cartão) e,
quando existir, "Entradas". Tem também uma aba interna "Categorias" com
um gráfico de quais categorias mais pesaram naquele mês.


SOBRE AS ANIMAÇÕES E VIBRAÇÃO
------------------------------------
Todo elemento tocável (botões, chips, cards, teclado) reage visualmente
na hora do toque, pra sempre dar a sensação de confirmação. Em
Android/Chrome, alguns toques (digitar no teclado, marcar conta como
paga, salvar) também disparam uma vibração curta. No iPhone, o Safari
não implementa a API de vibração do navegador (é uma limitação da
Apple, não do app) — então no iOS só a animação visual funciona, mas
ela já cobre a sensação de "toquei em algo de verdade".


SOBRE A VISÃO MENSAL (SEM DATA FIXA)
-----------------------------------------
A aba Meses começa mostrando os próximos 6 meses, mas não para numa data
fixa: tem um botão "ver mais meses" no fim da lista que estende a
projeção sempre que você quiser, 6 em 6 meses, quantas vezes precisar.


SOBRE ANEXOS EM GASTOS E ENTRADAS
---------------------------------------
Ao lançar ou editar um gasto ou entrada, dá pra anexar uma foto (do
comprovante, por exemplo) ou um PDF. Itens com anexo mostram um ícone de
clipe na lista — toque nele pra abrir uma pré-visualização dentro do
próprio app (imagem ou PDF), com um botão de Baixar caso queira salvar o
arquivo de novo no aparelho. Funciona como um pequeno repositório de
comprovantes vinculado a cada lançamento.

Fotos anexadas são redimensionadas automaticamente antes de salvar, pra
não pesar demais no armazenamento do navegador. Arquivos muito grandes
(fotos em altíssima resolução ou PDFs pesados) podem ser recusados com
um aviso — nesse caso, tente uma versão mais leve do arquivo.


SOBRE CARTÕES DE CRÉDITO
----------------------------
Na aba Cartões você cadastra cartões com nome, limite total, dia de
vencimento da fatura e (opcional) uma foto do cartão real — a foto é
redimensionada automaticamente antes de salvar, pra não pesar no
armazenamento do navegador. Sem foto, o cartão usa uma das cores
predefinidas.

Ao cadastrar uma conta fixa, uma aquisição parcelada ou um gasto avulso,
dá pra vincular a um cartão (além do banco, se quiser os dois). O
"usado" mostrado no cartão soma: o que ainda falta pagar nas contas com
prazo e aquisições vinculadas a ele, mais os gastos avulsos com fatura
atual ou futura ainda não vencida.


SOBRE EDITAR E APAGAR CONTAS FIXAS
----------------------------------------
Cada conta fixa, na aba Contas, tem seus próprios ícones de editar
(lápis) e apagar (lixeira) na própria linha — não é mais preciso entrar
em Ajustes pra isso.


SOBRE OS DADOS
-----------------
Os dados (renda, contas, gastos, entradas, aquisições parceladas, bancos,
cartões, anexos etc.) ficam salvos com localStorage, direto no
navegador/app instalado do seu iPhone. Eles continuam lá mesmo depois de
fechar o app, trocar de tela ou reiniciar o aparelho.

Importante: esse armazenamento é local ao dispositivo e ao navegador.
Ele NÃO sincroniza sozinho entre iPhone, iPad e computador, e se você
limpar os dados do Safari ou desinstalar o app da Tela de Início, os
dados dessa instalação específica se perdem. Não existe um backup na
nuvem automático nesta versão. Fotos de cartões e anexos ocupam mais
espaço que o resto dos dados — se você notar o armazenamento ficando
cheio, use arquivos menores ou remova anexos que não precisa mais.


SOBRE CONTAS FIXAS POR PERÍODO
-----------------------------------
Ao cadastrar uma conta fixa, você pode dar um prazo (6, 12, 24, 36 meses
ou um número customizado) — útil pra lançar de uma vez um contrato de
aluguel de 1 ano, por exemplo. Deixando em "Sem prazo", a conta continua
recorrente indefinidamente, mês após mês, como antes.

Quando uma conta com prazo chega ao fim das parcelas, ela é marcada como
"Quitada" e some dos totais do mês, mas continua no histórico.


SOBRE BANCOS
----------------
Você pode cadastrar bancos ou locais (ex: Nubank, Itaú, um nome de
pessoa) e vincular contas fixas, aquisições parceladas, gastos e
entradas a eles. Na aba Meses -> Bancos, cada banco mostra uma barra de
progresso das dívidas vinculadas com prazo definido, além do total já
recebido e gasto diretamente ligado a ele -- assim dá pra ver onde você
deve mais e onde tem mais dinheiro entrando.


ATUALIZANDO O APP NO FUTURO
-------------------------------
Se você (ou o Claude) editar o index.html, CSS ou qualquer arquivo:
  1. Suba os arquivos atualizados no mesmo lugar (substituindo os antigos).
  2. Abra sw.js e troque o número da versão do cache, por exemplo:
       const CACHE_NAME = 'piloto-pwa-v6';
     vira:
       const CACHE_NAME = 'piloto-pwa-v7';
  3. Suba o sw.js atualizado também.
Isso garante que o Service Worker limpe o cache antigo e todo mundo
que já instalou o app receba a versão nova, em vez de ficar preso
numa versão desatualizada guardada no cache do iPhone.


COMPATIBILIDADE
-------------------
O mesmo projeto funciona sem alterações em: iPhone/Safari, iPad,
Android/Chrome, e navegadores de desktop (Chrome, Edge, Firefox).
A adaptação pra iOS não remove nem quebra nada da experiência em
outras plataformas. A pré-visualização de PDF dentro do app depende do
navegador — em versões mais antigas do Safari, o botão Baixar sempre
funciona como alternativa confiável. A vibração tátil não funciona no
iOS por limitação do Safari (ver seção acima).
