<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Dev Docker

1. Clone the project
2. Copy the `.env.template` file and rename it to `.env`
3. Up the image (Docker desktop)

```
docker-compose -f docker-compose.yml --env-file .env up --build
```

4. Go to the site

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

4. Configure Postgres DB in .env

5. Up the backend of Nest

```
npm run start:dev
```

6. Go to the site

```
localhost:4000/graphql
```
