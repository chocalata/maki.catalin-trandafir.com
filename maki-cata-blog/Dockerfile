FROM --platform=linux/arm64 node:22
RUN apt update && apt -y upgrade

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY src/ /usr/src/app/
RUN npm install --production
EXPOSE 3000

CMD [ "npm", "run", "start"]