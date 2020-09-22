import puppeteer from 'puppeteer';

import IInfoUser from '../../../dtos/IInfoUser';
import IRobotRepository from '../../../repositories/IRobotRepository';

class RobotRepository implements IRobotRepository {
  async accessSite(infoUser: IInfoUser): Promise<void> {
    const browser = await puppeteer.launch({
      headless: process.env.NODE_ENV !== 'development',
    });

    const companyCode = process.env.COMPANY_CODE as string;

    const baseUrlLogin = process.env.WEBPONTO_RESOURCE as string;
    const baseUrlIncluirMarcacaoOnLine = process.env
      .WEBPONTO_RESOURCE_INCLUIR_MARCACAO_ONLINE as string;

    try {
      const page = await browser.newPage();

      await page.authenticate({
        username: infoUser.reAuthenticate,
        password: infoUser.passAuthenticate,
      });

      await page.setUserAgent(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36',
      );

      await page.goto(baseUrlLogin, { waitUntil: 'networkidle0' });

      await page.type('#CodEmpresa', String(companyCode));

      await page.type('#requiredusuario', infoUser.user);

      await page.type('#requiredsenha', infoUser.password);

      await page.click('.BotaoAchatado');

      await page.waitForSelector('#menu2_Item2');

      await page.goto(baseUrlIncluirMarcacaoOnLine);

      await page.waitForSelector('#Button1');

      // if (process.env.NODE_ENV !== 'development') {
      //   await page.click('#Button1');

      //   await page.waitForXPath('//*[@id="Form1"]/table[2]/tbody/input');
      // }

      await browser.close();
    } catch (error) {
      await browser.close();
      throw error;
    }
  }
}

export default RobotRepository;
