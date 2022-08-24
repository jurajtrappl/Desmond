import { Message } from 'discord.js'
import { Role } from './enums'

export interface ICommand {
    /**
     * List of all names possible to use when invoking the execution.
     */
    aliases: string[]

    /**
     * List of all roles with permissions to execute the context.
     */
    rolesAllowed: Role[]

    /**
     * Run the command.
     * @param context context of the execution.
     */
    execute(context: CommandContext): Promise<void>
}

export type CommandContext = {
    message: Message

    args: any[]
}
