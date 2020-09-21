import { container } from 'tsyringe';

import IBotRepository from '../../modules/Bot/repositories/IBotRepository';
import BotRepository from '../../modules/Bot/infra/discord/repositories/BotRepository';

import IRobotRepository from '../../modules/Robot/repositories/IRobotRepository';
import RobotRepository from '../../modules/Robot/infra/puppeteer/CompanyQintess/RobotRepository';

import IUserRepository from '../../modules/User/repositories/IUserRepository';
import UserRepository from '../../modules/User/infra/mongoose/repositories/UserRepository';

container.registerSingleton<IBotRepository>('BotRepository', BotRepository);

container.registerSingleton<IRobotRepository>(
  'RobotRepository',
  RobotRepository,
);

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
