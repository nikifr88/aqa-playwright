#New link
FROM node:20-bookworm

RUN npx playwright@1.56.1 install --with-deps

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm ci

COPY . .

CMD ["npm", "test"]