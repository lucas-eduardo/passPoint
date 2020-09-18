import userSchema from '../schemas/User';

import IDataUser from '../../../dtos/IDataUser';
import IUpdateUser from '../../../dtos/IUpdateUser';
import IUserRepository from '../../../repositories/IUserRepository';

class UserRepository implements IUserRepository {
  async createUser(idUserDiscord: string): Promise<void> {
    try {
      await userSchema.create({
        idUserDiscord,
        readyToLogIn: false,
      });
    } catch (error) {
      throw error;
    }
  }

  async existingUser(idUserDiscord: string): Promise<boolean> {
    try {
      const register = await userSchema.findOne({
        idUserDiscord,
        readyToLogIn: true,
      });

      return !!register;
    } catch (error) {
      throw error;
    }
  }

  async getUser(idUserDiscord: string): Promise<IDataUser> {
    try {
      const register = await userSchema.findOne({
        idUserDiscord,
        readyToLogIn: true,
      });

      if (register) {
        return {
          reAuthenticate: register.reAuthenticate as string,
          passAuthenticate: register.passAuthenticate as string,
          user: register.user as string,
          password: register.password as string,
        };
      }

      throw new Error('data not found');
    } catch (error) {
      throw error;
    }
  }

  async updateUser(
    idUserDiscord: string,
    dataRegister: IUpdateUser,
  ): Promise<void> {
    try {
      await userSchema.updateOne({ idUserDiscord }, dataRegister);
    } catch (error) {
      throw error;
    }
  }
}

export default UserRepository;
