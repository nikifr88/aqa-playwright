FROM mcr.microsoft.com/playwright:v1.56.1-jammy

WORKDIR /app

COPY package*.json ./
RUN npm ci --foreground-scripts

COPY . .

CMD ["npx", "playwright", "test"]