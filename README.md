# graphql-apolloserver-jwt

### Uso: 

```
npm start
```

### SignUp: 
```graphql
mutation {
  signup(username: "Nombre de Usuario", email: "tu@mail.com", password:"12345")
  }
```

### Login: 
```graphql
mutation {
  login(email: "tu@mail.com", password:"12345")
  }
```

### Private endpoint: 
```graphql
{
  posts {
    title
  }
}
```