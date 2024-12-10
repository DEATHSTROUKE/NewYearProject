cd NewYearProject
docker compose down
git pull
yarn
yarn build --parallel=1
killall node
docker compose up -d --build