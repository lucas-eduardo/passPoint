import 'reflect-metadata';
import 'dotenv/config';
import { container } from 'tsyringe';

import database from './config/database/mongoose';

import StartBotService from './modules/Bot/services/StartBot';

import './config/container';

(async () => {
  try {
    await database();

    const startBot = container.resolve(StartBotService);

    startBot.execute();
  } catch (error) {
    throw error;
  }
})();
