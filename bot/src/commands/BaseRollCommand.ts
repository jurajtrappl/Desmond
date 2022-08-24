import { DiscordMarkdown } from '@core/DiscordMarkdown'
import { Role } from '@core/enums'
import { CommandContext, ICommand } from '@core/ICommand'
import { HexColorString, MessageEmbed } from 'discord.js'
import { injectable } from 'inversify'

@injectable()
export abstract class BaseRollCommand implements ICommand {
    abstract aliases: string[]

    abstract rolesAllowed: Role[]

    constructor(private readonly markdown: DiscordMarkdown) {}

    abstract execute(context: CommandContext): Promise<void>

    getRollOptions(rollFlags: string[]): RollOptions {
        const options = {
            advantage: false,
            disadvantage: false,
            inspiration: false
        }

        if (rollFlags.includes('adv')) {
            options.advantage = true
        }

        if (rollFlags.includes('dadv')) {
            options.disadvantage = true
        }

        if (rollFlags.includes('insp')) {
            options.inspiration = true
        }

        return options
    }

    rollEmbed(
        color: HexColorString,
        expression: string,
        rolls: number[]
    ): MessageEmbed {
        return new MessageEmbed()
            .setColor(color)
            .setDescription(this.markdown.bold('Roll'))
            .addFields(
                {
                    name: 'Rolling',
                    value: expression,
                    inline: true
                },
                {
                    name: 'Result',
                    value: `${rolls.join(' + ')} = ${rolls.reduce(
                        (acc, val) => acc + val,
                        0
                    )}`,
                    inline: true
                }
            )
    }
}

export type RollOptions = {
    advantage: boolean

    disadvantage: boolean

    inspiration: boolean
}
