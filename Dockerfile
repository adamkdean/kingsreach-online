FROM node:4.2
MAINTAINER Adam K Dean <adamkdean@googlemail.com>

RUN mkdir /var/www
ADD . /var/www
WORKDIR /var/www

# ensure we update npm to 3.X so that node-sass installs
RUN npm install -g npm
RUN npm install

CMD ["npm", "start"]
