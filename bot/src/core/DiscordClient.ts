import { SERVICE_IDENTIFIERS } from '@root/dependency/identifiers'
import { Client, Message } from 'discord.js'
import { decorate, inject, injectable } from 'inversify'
import { Configuration } from '../dependency/types'
import { CommandInvoker } from './CommandInvoker'
import { ILogger } from './logger/ILogger'
import { ExecutionValidator } from './ExecutionValidator'
import { CommandContext } from './ICommand'

decorate(injectable(), Client)

@injectable()
export class DiscordClient extends Client {
    constructor(
        @inject(SERVICE_IDENTIFIERS.Config)
        private readonly config: Configuration,
        @inject(SERVICE_IDENTIFIERS.Logger) private readonly logger: ILogger,
        @inject(SERVICE_IDENTIFIERS.ExecutionValidator)
        private readonly executionValidator: ExecutionValidator
    ) {
        super({ intents: config.clients.discord.intents })
    }

    configureErrorListener(): DiscordClient {
        this.on('error', ({ message }) => {
            this.logger.error(`Discord client error: ${message}`)
        })

        return this
    }

    configureEventListeners(commandInvoker: CommandInvoker): DiscordClient {
        this.on('messageCreate', async (message: Message) => {
            if (this.executionValidator.isBotMessage(message)) return

            if (
                !(await this.executionValidator.isValidGuildId(message.guildId))
            )
                return

            const { prefix, isValidPrefix } =
                await this.executionValidator.isValidPrefix(
                    message.guildId!,
                    message.content
                )
            if (!isValidPrefix) return

            const args = message.content.slice(prefix.length).split(/ +/)
            const name = args.shift()

            if (!name) {
                return
            }

            const context: CommandContext = { message, args }
            commandInvoker.execute(name, context)
        })

        return this
    }

    performClientLogin(): DiscordClient {
        this.login(this.config.clients.discord.loginToken)

        return this
    }

    readyUp(): void {
        this.once('ready', async () => {
            this.logger.info('Desmond bot is running.')
        })
    }
}
