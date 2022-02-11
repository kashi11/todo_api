import Config from "../App/InfraStructure/Config";
import app from "../HTTP/Bootstrap/App";
import logger from "../App/InfraStructure/Logger/Logger";
app.listen(Config.Server.APP_PORT, ()=>{
  logger.debug(`${Config.Server.APP_NAME} is running on port ${Config.Server.APP_PORT}`);
})