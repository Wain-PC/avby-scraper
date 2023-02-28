FROM node:19 AS builder
WORKDIR /build
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build

FROM node:19
WORKDIR /app
COPY --from=builder /build/package*.json ./
RUN npm ci --omit=dev
COPY --from=builder /build/build/ ./
COPY --from=builder /build/config/ ./config
COPY --from=builder /build/.en[v] ./
RUN mkdir "http"
EXPOSE 8080
CMD [ "node", "src/index.js" ]
