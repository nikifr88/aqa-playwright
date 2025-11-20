FROM mcr.microsoft.com/playwright:latest

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm ci --only=production && npm ci

COPY . .

CMD ["node", "./node_modules/@playwright/test/cli.js", "test"]