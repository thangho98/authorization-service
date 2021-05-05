FROM node:12

# set working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# install and cache app dependencies
COPY package.json /usr/src/app/package.json
#RUN yarn install --silent

COPY . .

EXPOSE 3000

CMD ["yarn", "dev"]