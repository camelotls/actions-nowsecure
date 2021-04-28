FROM node:12.9.0

COPY index.js .
COPY package.json .
COPY package-lock.json .

RUN npm install

ENTRYPOINT ["node", "/index.js"]