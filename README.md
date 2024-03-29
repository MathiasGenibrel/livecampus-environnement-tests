Application TodoList

## Getting start

Install dependencies

```
npm install
```

Implement correctly the env variables
Create a .env file at the root directory and write it inside

```
WEB_EXPOSE_PORT=3000
WEB_PORT=3000
DATABASE_URL="file:./.data/dev.db"
```

Generate the prisma database with the following command

```
npx prisma generate
```

Do the first database migration

```
npx prisma migrate dev --name init
```

Now, you can run the project !

```
npm run dev
```
