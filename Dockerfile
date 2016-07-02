FROM node:4.2
MAINTAINER Adam K Dean <adamkdean@googlemail.com>

RUN mkdir /var/www
ADD . /var/www
WORKDIR /var/www

RUN npm install
CMD ["npm", "start"]
