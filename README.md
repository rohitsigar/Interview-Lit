

<br />
<p align="center">
  <a href="https://github.com/rohitsigar/Interview-Lit">
    <img src="https://res.cloudinary.com/https-mykart1-herokuapp-com/image/upload/v1659032990/RCE/InterviewLit_1_ktxjeq.png" alt="Logo" width="200" height="200">
  </a>


  <p align="center">
    Make your Interview Hit with Interview Lit
  </p>




# About The Project
It is a **Docker-based sandbox environment** for running code snippets. For each piece of provided code, it builds a fresh Docker-based container, executes it, and then returns the results. The major programming languages C, C++, Python, Java, and javascript are supported, and more language support can be added.
It can also be used as a platform for interviews where the interviewer can create a special link or code. By using the specially constructed URL or code, a user may access the interview. The screen will be shared in real time after clicking on a specific link to start the interview. It implies that any modifications made to one screen will be reflected on all users' screens during that specific interview. They can use a video call at any time during the interview.



## Features:

1. **Home Screen**

      The homepage consists of the following elements:
     ***Login with Google***
     ,  ***IDE for Coding***
     , ***Host an Interview***
     , ***Enter an Interview***
     , ***Hosted Interviews***
    
    ![alt text](https://res.cloudinary.com/https-mykart1-herokuapp-com/image/upload/v1659030839/RCE/Screenshot_from_2022-07-28_23-15-20_dzj7tp.png )
    

2. **IDE Screen**:
    1. ***Dual Theme Implementation (Light and Dark Mode)***
    2. ***Various Languages Support***: c, c++, python, java, javascript
    3. ***IDE to Code***
    4.  ***Input***: Input Section for input of the Code if required
    5. ***Output***: Output Section to Display the Output or to Show Error if occurred.

![alt text](https://res.cloudinary.com/https-mykart1-herokuapp-com/image/upload/v1659031137/RCE/Screenshot_from_2022-07-28_23-27-36_pxeuet.png) 

3. **Hosted Interviews Screen**:

    1. ***List of Previously Hosted Interview Codes***: Contains Timestamps, Share Code , Enter Internview, Delete, Copy Interview Link functionality 

    ![alt text](https://res.cloudinary.com/https-mykart1-herokuapp-com/image/upload/v1659030824/RCE/Screenshot_from_2022-07-28_23-18-17_xnrwxa.png)

4. **Interview Screen**: 

	All features are same as that of "IDE Screen" with following additional features.
  
   1. ***Realtime Code sharing and Editing***
   2. ***Video-call***
![alt text](https://res.cloudinary.com/https-mykart1-herokuapp-com/image/upload/v1659032424/RCE/Untitled_1920_1080px_tgxy7a.png)



## Technologies Used
* Docker for Containerisation
* Socket io Realtime
* Node.js and Express Backend
* Mongodb for Database
* Reactjs Frontend
* Redux State Management


## Setup steps
### Clone Repository
```bash 
git clone https://github.com/rohitsigar/Interview-Lit.git
```
### Install Server Dependencies
```bash
cd rce-server
npm install
```
### Install Client Dependencies
```bash
cd client
npm install
```
### Build Executor Image
```bash
cd rce-server
cd executor
docker build -t executor:1.0 .
```
### Start Server
```bash
npm run dev
```
### Start Client
```bash
npm start
```






