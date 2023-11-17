FROM mhart/alpine-node:14.12.0

WORKDIR /srv
ADD . .
RUN npm install

EXPOSE 3333
CMD ["node", "index.js"]