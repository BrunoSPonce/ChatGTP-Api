FROM node:latest

ARG NODE_ENV
ARG OPENAI_API_KEY

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 80

ENV OPENAI_API_KEY $OPENAI_API_KEY
ENV NODE_ENV $NODE_ENV

CMD [ "npm", "start" ]
