# Petwitter Front-End

Desafio final do curso WEB Developer da Otterwise, baseado no [Create React APP](https://create-react-app.dev/).

O Petwitter Front-End também conta uma integração de autenticação com o [Petwitter Back-End](https://github.com/PedroPiuma/petwitter-back) via REST api pré setada.

## Tecnologias

- [Create react app](https://create-react-app.dev/)
- [Chakra UI](https://chakra-ui.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [React Router](https://reactrouter.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Yup](https://www.npmjs.com/package/yup)
- [Axios](https://github.com/axios/axios)
- [Javascript Time Ago](https://www.npmjs.com/package/javascript-time-ago)
- [React Infinite Scroll Component](https://www.npmjs.com/package/react-infinite-scroll-component)

## Sobre o Petwitter

Esse projeto é uma versão reduzida do twitter, só que para pets.

O Petwitter é uma rede social onde usuários podem criar perfis para seus pets,

postar mensagens de até 140 caracteres, atualizar foto de perfil por link de imagem,

deletar seus próprios petwittes, mudar nome do pet,

acompanhar o feed de de todos usuários e ver o perfil de outros.

O layout é responsivo, podendo ser visto em desktop/notebook ou celulares.
Responsividade para tablets ainda não adicionada.

## Rodando a aplicação

Instale as dependências através do comando `npm install`.

Crie um novo arquivo chamado .env.local e copie o conteúdo do arquivo .env-example.

Rode a aplicação utilizando `npm start`.

### Gerando o build da aplicação para ambiente de produção

Para gerar a aplicação que ficará hospedada no ambiente de produção rode `npm run build`.

## Estrutura de pastas

`components`: componentes gerais da aplicação.

`context`: configuração de estados globais da aplicação utilizando a Context API.

`img`: local de imagens necessárias para design da aplicação.

`providers`: configuração de clientes http e outros provedores externos a aplicação.

`routes`: contém as rotas da aplicação.

`services`: pasta com arquivos que exportam funcões externas a aplicação como requisições.

## Aguardando revisão para:
- Impedir cadastro sem nome usando espaços vazios;
