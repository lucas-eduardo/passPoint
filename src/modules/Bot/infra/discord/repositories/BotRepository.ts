import Discord, { Message, Client } from 'discord.js';

import IBotRepository from '../../../repositories/IBotRepository';

import findByUserIdDiscordService from '../../../../User/services/FindByUserIdDiscord';
import existingUserService from '../../../../User/services/ExistingUser';
import createUserService from '../../../../User/services/CreateUser';
import updateUserService from '../../../../User/services/UpdateUser';
import accessSite from '../../../../Robot/services/AccessSite';

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
        const user = await findByUserIdDiscordService.execute(idUserDiscord);

        if (user) {
          msg.reply('Aguarde...');

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
        const existing = await existingUserService.execute(idUserDiscord);

        if (existing) {
          msg.reply(questions.existingUser);
        } else {
          msg.reply(questions.reAuthenticate);
          await createUserService.execute(idUserDiscord);
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
              await updateUserService.execute(idUserDiscord, {
                readyToLogIn: false,
                reAuthenticate: text,
              });
              msg.reply(questions.passAuthenticate);
            },
            [questions.passAuthenticate]: async () => {
              await updateUserService.execute(idUserDiscord, {
                readyToLogIn: false,
                passAuthenticate: text,
              });
              msg.reply(questions.user);
            },
            [questions.user]: async () => {
              await updateUserService.execute(idUserDiscord, {
                readyToLogIn: false,
                user: text,
              });
              msg.reply(questions.password);
            },
            [questions.password]: async () => {
              await updateUserService.execute(idUserDiscord, {
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
