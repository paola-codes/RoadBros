# RoadBros boilerplate

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io#https://github.com/4GeeksAcademy/react-flask-hello.git)

<p align="center">
<a href="https://youtu.be/l1gFJ1KyGV4"><img height="350px" src="src/front/img/RoadBros.png" /></a>
</p>

### Front-End Activation

  Run these commands to start the front-end:

  rm -rf node_modules &&
  nvm install 14 && npm install &&
  cp ./.env.example ./.env &&
  echo "BACKEND_URL=https://3001-${GITPOD_WORKSPACE_URL:8}" >> .env &&
  npm install react-stripe-checkout &&
  npm run start

### Back-End Activation

  Run this command to start the back-end:  
  
  pipenv run start
  
<a href="https://youtu.be/l1gFJ1KyGV4"><h2>Click here to see demo on Youtube</h2></a>
