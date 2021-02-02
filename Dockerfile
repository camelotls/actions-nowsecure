FROM node:12.9.0

WORKDIR /

COPY index.js package.json package-lock.json ./
COPY config/ ./config
COPY helpers/ ./helpers

RUN npm install

ENTRYPOINT ["node", "/index.js"]
