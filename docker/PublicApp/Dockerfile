FROM node:21-alpine3.18 

WORKDIR /app

COPY . .

RUN npm config rm proxy \ 
&& npm config rm https-proxy \
&& npm install --verbose \
&& npm run build

EXPOSE 3000

CMD ["node", "server.cjs"]