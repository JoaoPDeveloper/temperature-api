
# API Temperatura 

Nesse Projeto, ele pega os dados da API ThingSpeak e Transmite para o banco de dados, assim gravando dados antigos automaticamente.


## Pegue os dados do JSON

#### Retorna todos os itens de 15 Dias, dados da API

```http
  GET /api/items
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `api_key` | `string` | **Obrigatório**. A chave da sua API |

#### Retorna um item

```http
  GET /api/items/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do item que você quer |

#### add(num1, num2)




## Rodando localmente

Clone o projeto

```bash
  git clone https://link-para-o-projeto
```

Entre no diretório do projeto

```bash
  cd xampp\htdocs\script
```

Instale as dependências

```bash
  php connect.php
```

Inicie o servidor

```bash
  inicie no XAMPP via apache e PhpMyAdmin
```


## Autores

- [@JoaoPDeveloper](https://www.github.com/JoaoPDeveloper)

