web: bundle exec puma -t 5:5 -p ${PORT:-3000} -e ${RACK_ENV:-development}
client: sh -c 'rm app/assets/webpack/* || true && npm run build:dev:client'
server: sh -c 'npm run build:dev:server'
