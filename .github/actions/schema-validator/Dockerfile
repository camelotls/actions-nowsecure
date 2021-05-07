FROM node:12.9.0

COPY index.js package.json package-lock.json ./
COPY schemaTemplate.js ./schemaTemplate.js
RUN npm install

ENTRYPOINT ["node", "/index.js"]

