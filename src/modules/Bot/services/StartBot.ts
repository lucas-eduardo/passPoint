import { injectable, inject } from 'tsyringe';

import IBotRepository from '../repositories/IBotRepository';

@injectable()
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

  constructor(
    @inject('BotRepository')
    private botRepository: IBotRepository,
  ) {}

  execute(): void {
    this.botRepository.startBot(
      this.dictionaryPassPoint,
      this.dictionaryRegister,
    );
  }
}

export default StartBot;
