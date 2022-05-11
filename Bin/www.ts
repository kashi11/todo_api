import Config from "../App/InfraStructure/Config";
import app from "../HTTP/Bootstrap/App";
import logger from "../App/InfraStructure/Logger/Logger";
import { Command } from "commander";
const program = new Command();
program.option("-p, --port <type>", "add the specified type of cheese", "3000");
const options = program.opts();
console.log(options);

app.listen(options.port || Config.Server.APP_PORT, () => {
  logger.debug(
    `${Config.Server.APP_NAME} is running on port ${Config.Server.APP_PORT}`
  );
});
