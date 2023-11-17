FROM mhart/alpine-node:14.12.0

WORKDIR /srv/frontend
COPY package*.json ./
RUN npm install
ADD . .

EXPOSE 3000
CMD ["npm", "start"]