FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

EXPOSE 3001

ENV NODE_ENV=production

RUN npm run build

CMD ["npm", "start"]