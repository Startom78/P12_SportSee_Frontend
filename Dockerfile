FROM node:22-alpine

WORKDIR /src

# Copier uniquement les fichiers de dépendances d'abord (cache Docker)
COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

# Copier le reste du code
COPY . .

EXPOSE 5173

CMD ["yarn", "dev"]