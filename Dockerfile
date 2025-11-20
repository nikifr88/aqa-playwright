FROM mcr.microsoft.com/playwright/jammy:latest

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm ci

COPY . .

CMD ["npm", "test"]