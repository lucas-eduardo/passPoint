import IInfoUser from '../dtos/IInfoUser';

export default interface IRobotRepository {
  accessSite(infoUser: IInfoUser): Promise<void>;
}
