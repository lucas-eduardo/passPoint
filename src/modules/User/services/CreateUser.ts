import { injectable, inject } from 'tsyringe';

import IUserRepository from '../repositories/IUserRepository';

@injectable()
class CreateUser {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute(idUserDiscord: string): Promise<void> {
    await this.userRepository.createUser(idUserDiscord);
  }
}

export default CreateUser;
