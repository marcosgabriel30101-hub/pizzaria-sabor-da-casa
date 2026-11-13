# Pizzaria Sabor de Casa — versão Node.js

Projeto migrado com o visual e as páginas originais preservados. Inclui backend Node.js/Express, banco SQLite, API de catálogo e pedidos, painel administrativo e ferramenta Python para exportar pedidos em CSV.

## Requisitos
- Node.js 20 ou superior
- npm
- Python 3.9+ (somente para exportar relatórios CSV)

## Instalação no Windows
1. Extraia este ZIP em uma pasta.
2. Abra essa pasta no VS Code.
3. Abra o terminal dentro da pasta do projeto.
4. Execute:

```bash
npm install
```

5. Copie `.env.example` para `.env`.
6. Edite o `.env` e defina uma senha forte em `ADMIN_PASSWORD` e uma chave aleatória longa em `SESSION_SECRET`.
7. Inicie o sistema:

```bash
npm start
```

8. Acesse a loja em `http://localhost:3000`.
9. Acesse o painel em `http://localhost:3000/admin`.

## Primeiro acesso ao painel
Se você não configurar o arquivo `.env`, a instalação local usa:
- Usuário: `admin`
- Senha inicial: `SaborCasa@2026`

**Antes de colocar o site na internet, configure obrigatoriamente `ADMIN_PASSWORD` e `SESSION_SECRET` no `.env`.** O painel usa sessão SQLite com cookie HttpOnly, proteção de tentativas de login e senha armazenada com hash bcrypt.

## O que o painel permite
- Visão geral com pedidos, pendências, produtos ativos e vendas registradas.
- Listar pedidos, consultar dados de entrega e observações.
- Atualizar status: Novo, Em preparo, Saiu para entrega, Concluído e Cancelado.
- Editar nome, descrição, preço, categoria, caminho da imagem e disponibilidade de produtos.
- Cadastrar produtos novos e pausar/reativar itens.
- Os preços e produtos gerenciados são carregados pela API na loja.

## Pedidos e WhatsApp
Ao finalizar, o site registra o pedido no banco e abre a conversa do WhatsApp com o resumo. O painel só registra pedidos feitos depois que o backend estiver rodando; pedidos antigos que foram enviados apenas pelo WhatsApp não são importados automaticamente.

O número de WhatsApp está configurado no `script.js` original. Se precisar alterá-lo, procure `telefonePizzaria`.

## Banco de dados e relatórios
O banco SQLite é criado automaticamente em `data/pizzaria.sqlite`. Faça backup desse arquivo regularmente.

Para exportar os pedidos para CSV com Python:

```bash
python scripts/export_orders.py
```

O arquivo será salvo em `data/pedidos.csv` e poderá ser aberto no Excel.

## Publicação
Hospede em um servidor que suporte Node.js 20+. Configure as variáveis do `.env`, use HTTPS e mantenha o arquivo SQLite em armazenamento persistente. Não publique a pasta `data/`, `.env` ou `node_modules/` em repositórios públicos.

## Observações
- O Python está incluído para relatórios/exportação; o funcionamento do site e do painel é executado pelo Node.js.
- A primeira versão do banco é semeada a partir dos produtos e preços que estavam no HTML enviado.
- O carrinho continua guardando os itens no navegador via `localStorage`.
- A confirmação do pedido no WhatsApp continua sendo feita pelo cliente; o painel registra o pedido submetido pelo site, não confirma pagamento automaticamente.

## Atualização — acesso no rodapé e proteção de arquivos
- Todas as páginas públicas possuem um link **🔒 Área administrativa** no rodapé, que leva a `/admin/`.
- O login continua obrigatório para acessar os dados administrativos.
- O servidor agora permite acesso apenas aos arquivos públicos conhecidos, bloqueando a exposição acidental de `data/pizzaria.sqlite`, `server.js`, `.env` e demais arquivos internos.
- O sistema possui catálogo, pedidos, alteração de status e controle de disponibilidade de produtos; **não possui controle quantitativo de estoque, pagamento automático ou confirmação automática do WhatsApp**.
- Para atualizar, faça backup de `data/pizzaria.sqlite` do projeto em uso e mantenha esse arquivo no novo projeto. Não substitua seu banco por um vazio.
- Se você usa `.env`, preserve-o com segurança e não o publique.
