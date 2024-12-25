import { Knex } from "./server/databases/knex";
import { server } from "./server/Server";

const startServer = () => {
  server.listen(process.env.PORT || 3333, () => {
    console.log(`API iniciada na porta: ${process.env.PORT || 3333}`)
  })
}

if (process.env.IS_LOCALHOST !== 'true') {
  Knex.migrate.latest().then(() => {
    startServer()
  })
} else {
  startServer()
}