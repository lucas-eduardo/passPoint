import UserRepository from '../infra/mongoose/repositories/UserRepository';
import IUserRepository from '../repositories/IUserRepository';

class CreateUser {
  constructor(private userRepository: IUserRepository) {}

  async execute(idUserDiscord: string): Promise<void> {
    await this.userRepository.createUser(idUserDiscord);
  }
}

export default new CreateUser(new UserRepository());
