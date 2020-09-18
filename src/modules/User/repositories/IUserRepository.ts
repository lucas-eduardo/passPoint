import IDataUser from '../dtos/IDataUser';
import IUpdateUser from '../dtos/IUpdateUser';

export default interface IRegisterRepository {
  createUser(idUserDiscord: string): Promise<void>;
  existingUser(idUserDiscord: string): Promise<boolean>;
  getUser(idUserDiscord: string): Promise<IDataUser>;
  updateUser(idUserDiscord: string, dataRegister: IUpdateUser): Promise<void>;
}
