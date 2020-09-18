import BotRepository from '../infra/discord/repositories/BotRepository';
import IBotRepository from '../repositories/IBotRepository';

class StartBot {
  private dictionaryPassPoint = [
    'passar ponto',
    'ponto',
    'passar',
    'passar o ponto',
    'marcacao do ponto',
    'marcar ponto',
    'marcar',
  ];

  private dictionaryRegister = [
    'criar usuario',
    'criar o usuario',
    'inserir usuario',
    'inserir o usuario',
    'adicionar usuario',
    'adicionar o usuario',
    'add user',
  ];

  constructor(private botRepository: IBotRepository) {}

  execute() {
    this.botRepository.startBot(
      this.dictionaryPassPoint,
      this.dictionaryRegister,
    );
  }
}

export default new StartBot(new BotRepository());
