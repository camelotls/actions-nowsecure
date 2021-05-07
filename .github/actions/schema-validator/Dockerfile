FROM node:12.9.0

COPY index.js package.json package-lock.json schemaTemplate.js ./
RUN npm install

ENTRYPOINT ["node", "/index.js"]

