# Projeto ECM967 – Tópicos Avançados em Back End

## Integrantes do grupo

- Leonardo Cury Haddad 18.00442-3
- Matheus Lopes Vivas 17.04401-4
- Rodrigo Martins de Carvalho 16.03378-7

## Para rodar o projeto

```bash
git clone https://github.com/leochaddad/projeto-ECM967.git && cd projeto-ECM967
yarn install
yarn start
```

## Operações

### Lista completa de usuários, incluindo seus posts, comentários e reações.

```gql
{
  users {
    posts {
      id
      text
    }
    comments {
      id
      text
    }
    reactions {
      id
      type
    }
  }
}
```

### Lista completa de posts, incluindo seus comentários e reações

```gql
{
  posts {
    id
    text
    comments {
      id
      text
    }
    reactions {
      id
      type
    }
  }
}
```

### Lista completa de comentários, incluindo seus autores.

```gql
{
  comments {
    text
    author {
      id
      name
    }
  }
}
```

### Uma consulta que mostra, dentro da lista completa de reações, o percentual de reações positivas e negativas.

```gql
{
  allReactions {
    likePercentage
    dislikePercentage
    reactions {
      id
      type
    }
  }
}
```
