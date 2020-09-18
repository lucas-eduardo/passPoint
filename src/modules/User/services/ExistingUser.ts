import UserRepository from '../infra/mongoose/repositories/UserRepository';
import IUserRepository from '../repositories/IUserRepository';

class ExistingUser {
  constructor(private userRepository: IUserRepository) {}

  async execute(idUserDiscord: string): Promise<boolean> {
    const existingUser = await this.userRepository.existingUser(idUserDiscord);

    return existingUser;
  }
}

export default new ExistingUser(new UserRepository());
