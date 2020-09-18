import IInfoUser from '../dtos/IInfoUser';
import RobotRepository from '../infra/puppeteer/CompanyQintess/RobotRepository';
import IRobotRepository from '../repositories/IRobotRepository';

class AccessSite {
  constructor(private robotRepository: IRobotRepository) {}

  async execute(infoUser: IInfoUser): Promise<void> {
    await this.robotRepository.accessSite(infoUser);
  }
}

export default new AccessSite(new RobotRepository());
