rm -R -f ./migrations &&
pipenv run init &&
psql -U gitpod -c 'DROP DATABASE example;' || true &&
psql -U gitpod -c 'CREATE DATABASE example;' &&
psql -U gitpod -c 'CREATE EXTENSION unaccent;' -d example &&
pipenv run migrate &&
pipenv run upgrade

rm -rf node_modules && nvm install 14 && npm install && cp ./.env.example ./.env && echo "BACKEND_URL=https://3001-${GITPOD_WORKSPACE_URL:8}" >> .env && npm run start

npm install react-bootstrap
npm install react-icons
npm install react-stripe-checkout
npm uninstall react && npm install react