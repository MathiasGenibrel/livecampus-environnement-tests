FROM node:lts-alpine3.19
LABEL authors="mathiasgenibrel"

WORKDIR /app

COPY . .

CMD ["npm", "run", "dev"]
