FROM keymetrics/pm2:12-alpine

WORKDIR /coinster-gateway

ADD ./backend/coinster-gateway /coinster-gateway

RUN npm install

EXPOSE 3000

CMD ["pm2-runtime", "/coinster-gateway/server.js"]