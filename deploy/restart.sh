cd NewYearProject
docker compose down
git pull
yarn
yarn nx reset
yarn build
killall node
docker compose up -d --build