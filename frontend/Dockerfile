FROM node:20.17.0-alpine
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
COPY .env.local .env.local

RUN npm run build
EXPOSE 3000

CMD ["npm", "run", "dev"]