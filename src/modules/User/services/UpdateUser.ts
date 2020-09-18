import UserRepository from '../infra/mongoose/repositories/UserRepository';
import IUpdateUser from '../dtos/IUpdateUser';
import IUserRepository from '../repositories/IUserRepository';

import { encrypt } from '../../../utils/crypto';

class UpdateUser {
  constructor(private userRepository: IUserRepository) {}

  async execute(idUserDiscord: string, dataUser: IUpdateUser): Promise<void> {
    if (dataUser.passAuthenticate) {
      dataUser.passAuthenticate = encrypt(dataUser.passAuthenticate);
    }

    if (dataUser.password) {
      dataUser.password = encrypt(dataUser.password);
    }

    await this.userRepository.updateUser(idUserDiscord, dataUser);
  }
}

export default new UpdateUser(new UserRepository());
