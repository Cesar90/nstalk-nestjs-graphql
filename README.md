<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Cheat Sheet PDF

Inside of the repo, you have a cheat sheet pdf file that contains graphql info, commands, etc
https://github.com/Cesar90/nstalk-nestjs-graphql/blob/main/Nestjs%20GraphQL%20Notas.pdf

# Dev Docker

1. Clone the project
2. Copy the `.env.template` file and rename it to `.env`
3. In `.env`
   DB_HOST=db (db = It's service of postgres in docker-compose.yml)
   DB_PASSWORD=postgres (postgres is an example)
4. Up the image (Docker desktop)

```
docker-compose -f docker-compose.yml --env-file .env up --build
```

5. Execute SEED

```
http://localhost:4000/seed/execute
```

6. Go to the site

```
localhost:4000/graphql
```

# Dev

1. Clone the project
2. Copy the `.env.template` file and rename it to `.env`
3. Execute

```
npm install
```

4. Configure Postgres DB in `.env`

5. Up the backend of Nest

```
npm run start:dev
```

6. Execute SEED

```
http://localhost:4000/seed/execute
```

7. Go to the site

```
localhost:4000/graphql
```

# Examples of graphql mutations and queries in playground interface

Create account

```
mutation{
  createAccount(input:{
    email: "test@test.test",
    password: "test",
    role: Client
  }){
    error
    ok
  }
}
```

Login

```
mutation{
  login(input:{
    email: "test@test.test",
    password: "test"
  }){
    ok
    error
    token
  }
}
```

Get restaurants

```
query {
  restaurants(input: {
    page: 1
  }) {
    ok
    error
    totalPages
    totalResults
    results {
      id
      name
      coverImage
      category {
        name
      }
      address
      isPromoted
    }
  }
}
```

Get one restaurant by id

```
{
  restaurant(input:{
    restaurantId: 1
  }){
    ok
    error
  	restaurant{
      menu{
        id
        name
        price
        description
        options{
          name
          choices{
            name
            extra
          }
        }
      }
    }
  }
}
```

Get category by slug

```
query{
  category(input:{slug:"tes"}){
   	ok
  	totalResults
    restaurants{
      name
    }
  }
}
```
