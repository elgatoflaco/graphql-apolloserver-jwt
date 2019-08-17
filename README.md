# graphql-apolloserver-jwt

### Uso: 

```
npm start
```

### SignUp: 
```graphql
mutation {
  signup(username: "enmaska@gmail.com", email: "enmaska@gmail.com", password:"12345")
  }
```

### Login: 
```graphql
mutation {
  login(email: "enmaska@gmail.com", password:"12345")
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