import { injectable, inject } from 'tsyringe';

import IUserRepository from '../repositories/IUserRepository';

@injectable()
class ExistingUser {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute(idUserDiscord: string): Promise<boolean> {
    const existingUser = await this.userRepository.existingUser(idUserDiscord);

    return existingUser;
  }
}

export default ExistingUser;
