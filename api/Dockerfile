# --- Stage 1 - Build ---
FROM node:20-alpine AS builder

WORKDIR /app

# Copia e instala as dependências.
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copia o restante do código e executa o build.
COPY . .
RUN yarn build

# --- Stage 2 - Produção enxuta ---
FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production

# Copia os arquivos essenciais do estágio de build.
# Isso inclui o código compilado, node_modules e o arquivo tsconfig.json.
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
# Adicione esta linha para copiar o arquivo de configuração do TypeScript.
COPY tsconfig.json ./

EXPOSE 3000

# Comando para iniciar a aplicação.
CMD ["node", "-r", "tsconfig-paths/register", "dist/index.js"]
