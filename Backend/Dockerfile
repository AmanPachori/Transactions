FROM node:20.17.0-alpine
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
COPY .env .env

RUN npm run build
EXPOSE 8000

CMD ["npm", "run", "start"]