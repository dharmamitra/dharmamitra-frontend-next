FROM node:20
WORKDIR /app

COPY ./package.json .
RUN yarn

COPY . .

# Pseudo-code placeholder for env setup.
# ARG BUILD_SCRIPT
# RUN yarn $BUILD_SCRIPT

RUN yarn build

EXPOSE 3000
CMD [ "yarn", "start" ]
