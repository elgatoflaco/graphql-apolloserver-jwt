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

### Http headers
```graphql
{
  "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOnsiX2lkIjoiNWQ1ODc4MjE5MDM4NDQ1NGZkY2E1ZjFiIiwiZW1haWwiOiJlbm1hc2thQGdtYWlsLmNvbSJ9LCJpYXQiOjE1NjYwOTgzNTEsImV4cCI6MTU2NzMwNzk1MX0.8Kq0iZVsF5c55FGjT-dYtz0_aX6-_pXO0l0ona9QZuo"
}
```