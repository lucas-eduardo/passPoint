import { config } from 'dotenv';

import database from './config/database/mongoose';

import startBotService from './modules/Bot/services/StartBot';

config();

(async () => {
  try {
    await database();
    startBotService.execute();
  } catch (error) {
    throw error;
  }
})();
