cd NewYearProject
git pull
yarn
yarn nx reset
yarn build
docker compose down
docker compose up -d --build