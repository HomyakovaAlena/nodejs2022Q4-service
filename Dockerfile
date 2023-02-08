FROM node:18-alpine
WORKDIR ${WORK_DIR}
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE ${PORT}
RUN npm run build
CMD ["node", "dist/main"]
