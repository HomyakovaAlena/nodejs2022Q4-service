FROM node:18-alpine
WORKDIR ${WORK_DIR}
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE ${PORT}
CMD ["npm", "run", "start:migration:dev"]
