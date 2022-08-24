import { inject, injectable, multiInject } from 'inversify'
import { SERVICE_IDENTIFIERS } from '@root/dependency/identifiers'
import { CommandContext, ICommand } from './ICommand'
import { ExecutionValidator } from './ExecutionValidator'

@injectable()
export class CommandInvoker {
    constructor(
        @multiInject(SERVICE_IDENTIFIERS.Command)
        private readonly commands: ICommand[],
        @inject(SERVICE_IDENTIFIERS.ExecutionValidator)
        private readonly executionValidator: ExecutionValidator
    ) {}

    async execute(alias: string, context: CommandContext): Promise<void> {
        if (!this.hasWithAlias(alias)) {
            return
        }

        const command = this.findWithAlias(alias)
        const canBeExecuted = await this.executionValidator.canExecute(
            context.message.author.id,
            context.message.guildId ?? '',
            command.rolesAllowed
        )
        if (!canBeExecuted) {
            return
        }

        command.execute(context)
    }

    private hasWithAlias(alias: string): boolean {
        return Boolean(
            this.commands
                .map((command) => command.aliases)
                .filter((aliases) => aliases.includes(alias)).length
        )
    }

    private findWithAlias(alias: string): ICommand {
        return this.commands.find((command) => command.aliases.includes(alias))!
    }
}
