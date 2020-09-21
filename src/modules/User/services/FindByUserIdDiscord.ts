import { injectable, inject } from 'tsyringe';

import IUserRepository from '../repositories/IUserRepository';
import IDataUser from '../dtos/IDataUser';

import { decryp } from '../../../utils/crypto';

@injectable()
class FindByUserIdDiscord {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute(idUserDiscord: string): Promise<IDataUser> {
    const user = await this.userRepository.getUser(idUserDiscord);

    user.passAuthenticate = decryp(user.passAuthenticate);
    user.password = decryp(user.password);

    return user;
  }
}

export default FindByUserIdDiscord;
