import Discord, { Message, Client } from 'discord.js';
import { container } from 'tsyringe';

import IBotRepository from '../../../repositories/IBotRepository';

import FindByUserIdDiscordService from '../../../../User/services/FindByUserIdDiscord';
import ExistingUserService from '../../../../User/services/ExistingUser';
import CreateUserService from '../../../../User/services/CreateUser';
import UpdateUserService from '../../../../User/services/UpdateUser';
import AccessSiteService from '../../../../Robot/services/AccessSite';

import questions from '../../../../../constants/questions';
import { removeSpecialCharacters } from '../../../../../utils/format';

class BotRepository implements IBotRepository {
  startBot(dictionaryPassPoint: string[], dictionaryRegister: string[]): void {
    const client = new Discord.Client();

    client.login(process.env.CLIENT_DISCORD);

    client.on('message', async msg => {
      try {
        const isBot = msg.author.bot;

        if (!isBot) {
          const text = removeSpecialCharacters(
            msg.content.trim().toLowerCase(),
          );

          if (text === 'help') {
            const commandsPassPoint = dictionaryPassPoint
              .map(command => `- ${command}`)
              .join('\n');

            const commandsRegister = dictionaryRegister
              .map(command => `- ${command}`)
              .join('\n');

            msg.reply(
              `**BOT PASSA PONTO - COMANDOS** \n\n**Comandos validos para passar ponto**\n${commandsPassPoint}\n\n**Comandos validos para cadastro/update**\n${commandsRegister}`,
            );
          }

          await this.passPoint(text, msg, dictionaryPassPoint);

          await this.registerUser(text, msg, client, dictionaryRegister);
        }
      } catch (error) {
        msg.reply('Ocorreu algum erro, tente novamente!');
      }
    });
  }

  private async passPoint(
    text: string,
    msg: Message,
    dictionary: string[],
  ): Promise<void> {
    try {
      const idUserDiscord = msg.author.id;

      if (dictionary.includes(text)) {
        const findByUserIdDiscord = container.resolve(
          FindByUserIdDiscordService,
        );

        const user = await findByUserIdDiscord.execute(idUserDiscord);

        if (user) {
          msg.reply('Aguarde...');

          const accessSite = container.resolve(AccessSiteService);

          await accessSite.execute(user);

          msg.reply('Ponto passado com sucesso');
        } else {
          msg.reply('Você ainda não tem cadastro no bot!');
        }
      }
    } catch (error) {
      throw error;
    }
  }

  private async registerUser(
    text: string,
    msg: Message,
    { user }: Client,
    dictionary: string[],
  ): Promise<void> {
    try {
      const idUserDiscord = msg.author.id;

      if (dictionary.includes(text)) {
        const existingUser = container.resolve(ExistingUserService);

        const existing = await existingUser.execute(idUserDiscord);

        if (existing) {
          msg.reply(questions.existingUser);
        } else {
          msg.reply(questions.reAuthenticate);
          const createUser = container.resolve(CreateUserService);

          await createUser.execute(idUserDiscord);
        }

        return;
      }

      if (msg.channel) {
        const message = await msg.channel.messages.fetch({ limit: 2 });

        const botsLastMessage = message.filter(
          ({ author }) => author.id === user?.id,
        );

        if (botsLastMessage.size) {
          const funcs = {
            [questions.existingUser]: async () => {
              if (text === 'sim') {
                msg.reply(questions.reAuthenticate);
              } else {
                msg.reply('Atualização cancelada');
              }
            },
            [questions.reAuthenticate]: async () => {
              const updateUser = container.resolve(UpdateUserService);

              await updateUser.execute(idUserDiscord, {
                readyToLogIn: false,
                reAuthenticate: text,
              });
              msg.reply(questions.passAuthenticate);
            },
            [questions.passAuthenticate]: async () => {
              const updateUser = container.resolve(UpdateUserService);

              await updateUser.execute(idUserDiscord, {
                readyToLogIn: false,
                passAuthenticate: text,
              });
              msg.reply(questions.user);
            },
            [questions.user]: async () => {
              const updateUser = container.resolve(UpdateUserService);

              await updateUser.execute(idUserDiscord, {
                readyToLogIn: false,
                user: text,
              });
              msg.reply(questions.password);
            },
            [questions.password]: async () => {
              const updateUser = container.resolve(UpdateUserService);

              await updateUser.execute(idUserDiscord, {
                readyToLogIn: true,
                password: text,
              });

              msg.reply('Usuário salvo com sucesso!');
            },
          };

          const previousMessage = botsLastMessage.last()?.content;

          if (previousMessage && funcs[previousMessage]) {
            await funcs[previousMessage]();
          }
        }
      }
    } catch (error) {
      throw error;
    }
  }
}

export default BotRepository;
