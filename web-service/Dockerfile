FROM node:18-alpine
WORKDIR /app

ARG BUILD_NUMBER=local
ARG GIT_COMMIT=local

ENV BUILD_NUMBER=${BUILD_NUMBER}
ENV GIT_COMMIT=${GIT_COMMIT}

COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]