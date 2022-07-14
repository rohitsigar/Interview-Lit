## Get Started

### Get started developing...

```shell
# build docker image
docker-compose build

# create volume
docker volume create my_vol

# run server in development mode
docker-compose up server
```

`
This will build the required docker image and run the server in a docker container which will be listening at http://localhost:3000.

### For development and adding features

Install all package dependencies (one time operation)

```shell
npm install
```

Runs the application is development mode. Should not be used in production

```shell
npm run dev
```

This is for
development of the application.

#### Run in _production_ mode:

Compiles the application and starts it in production production mode.

```shell
npm run compile
npm start
```
