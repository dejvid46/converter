FROM node:22

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENV UPLOADS=/usr/src/app/uploads
ENV CONVERTED=/usr/src/app/converted

RUN mkdir -p ${UPLOADS}
RUN mkdir -p ${CONVERTED}

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/main"]
