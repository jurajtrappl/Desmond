import { gql, request } from 'graphql-request'
import { inject, injectable } from 'inversify'
import { commandAliases } from '@commands/aliases'
import { BaseRollCommand } from '@commands/BaseRollCommand'
import { DiscordMarkdown } from '@core/DiscordMarkdown'
import { Role } from '@core/enums'
import { CommandContext } from '@core/ICommand'
import { SERVICE_IDENTIFIERS } from '@dependency/identifiers'
import { Configuration } from '@dependency/types'
import { entryLogger } from '@root/decorators/EntryLogger'

@injectable()
export class RollCommand extends BaseRollCommand {
    aliases = commandAliases.Roll

    rolesAllowed = [Role.DungeonMaster, Role.Player]

    constructor(
        @inject(SERVICE_IDENTIFIERS.Config)
        private readonly config: Configuration,
        @inject(SERVICE_IDENTIFIERS.DiscordMarkdown)
        markdown: DiscordMarkdown
    ) {
        super(markdown)
    }

    @entryLogger()
    async execute({ message, args: [expression] }: CommandContext) {
        const rollDiceQuery = gql`
            query Query($input: RollDiceInput!) {
                rollDice(input: $input)
            }
        `

        const queryVariables = {
            input: {
                expression,
                ...this.getRollOptions([])
            }
        }

        const { rollDice: rolls } = await request(
            this.config.clients.gql.url,
            rollDiceQuery,
            queryVariables
        )

        message.reply({
            embeds: [
                this.rollEmbed(
                    message.member!.displayHexColor,
                    expression,
                    rolls
                )
            ]
        })
    }
}
