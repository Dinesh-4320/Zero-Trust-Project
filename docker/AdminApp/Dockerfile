FROM node:21-alpine3.18 

WORKDIR /app

COPY . .

RUN npm install --verbose \
&& npm run build

EXPOSE 3001

CMD ["node", "server.cjs"]