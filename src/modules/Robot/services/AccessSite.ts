import { injectable, inject } from 'tsyringe';

import IInfoUser from '../dtos/IInfoUser';
import IRobotRepository from '../repositories/IRobotRepository';

@injectable()
class AccessSite {
  constructor(
    @inject('RobotRepository')
    private robotRepository: IRobotRepository,
  ) {}

  async execute(infoUser: IInfoUser): Promise<void> {
    await this.robotRepository.accessSite(infoUser);
  }
}

export default AccessSite;
