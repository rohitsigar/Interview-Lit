FROM ubuntu
RUN apt-get update -y
RUN apt-get install curl -y
RUN curl -sL https://deb.nodesource.com/setup_10.x -o nodesource_setup.sh 
RUN bash nodesource_setup.sh
RUN apt-get install nodejs -y
RUN apt-get update -y
RUN apt install docker.io -y
# WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm","run","dev"]
# docker run -it -d --name my_server -p 3000:3000 -v /var/run/docker.sock:/var/run/docker.sock --mount source=my_vol,target=/executor server:2.0