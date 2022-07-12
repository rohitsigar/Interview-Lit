# Remote-Code-Executor

RCE is a Remote Code Executor, as the name suggests Is a Docker-based sandbox environment to run a code snippet. It will create a new docker based container for every submitted code, run it in the isolated container, and return the output. It will support major languages C, C++, and can be extended to other language support too.

# Features:

- Backend APIs and logic to handle the submitted code, create a docker container, execute it, and return the results.
- Minimal UI for user interaction and code submission.
- Can be extended to an Online Code Judge and full-fledged coding/interview platform.

# Tech stack:

- Node.js
- Any Frontend framework or Basic HTML
- Javascript
- Docker
- Bash scripting.

## Get Started

Get started developing...

```shell
# install deps
npm install

# run in development mode
npm run dev
```

## Install Dependencies

Install all package dependencies (one time operation)

```shell
npm install
```

## Run It

#### Run in _development_ mode:

Runs the application is development mode. Should not be used in production

```shell
npm run dev
```

or debug it

```shell
npm run dev:debug
```

#### Run in _production_ mode:

Compiles the application and starts it in production production mode.

```shell
npm run compile
npm start
```
