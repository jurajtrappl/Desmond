import { commandAliases } from '@commands/aliases'
import { BaseRollCommand } from '@commands/BaseRollCommand'
import { DiscordMarkdown } from '@core/DiscordMarkdown'
import { Role } from '@core/enums'
import { CommandContext } from '@core/ICommand'
import { Configuration } from '@dependency/types'
import { entryLogger } from '@root/decorators/EntryLogger'
import { SERVICE_IDENTIFIERS } from '@root/dependency/identifiers'
import request, { gql } from 'graphql-request'
import { inject, injectable } from 'inversify'

@injectable()
export class SavingThrowCommand extends BaseRollCommand {
    aliases = commandAliases.SavingThrow

    rolesAllowed = [Role.Player]

    constructor(
        @inject(SERVICE_IDENTIFIERS.Config)
        private readonly config: Configuration,
        @inject(SERVICE_IDENTIFIERS.DiscordMarkdown)
        markdown: DiscordMarkdown
    ) {
        super(markdown)
    }

    @entryLogger()
    async execute({
        message,
        args: [ability, ...rollFlags]
    }: CommandContext): Promise<void> {
        const rollSavingThrowQuery = gql`
            query Query(
                $filter: CharacterFilterInput!
                $input: RollAbilityInput!
            ) {
                rollSavingThrow(filter: $filter, input: $input) {
                    expression
                    rolls
                }
            }
        `

        const queryVariables = {
            filter: {
                guildMemberId: message.member?.id
            },
            input: {
                ability,
                ...this.getRollOptions(rollFlags)
            }
        }

        const {
            rollSavingThrow: { expression, rolls }
        } = await request(
            this.config.clients.gql.url,
            rollSavingThrowQuery,
            queryVariables
        )

        message.reply({
            embeds: [
                this.rollEmbed(
                    message.member?.displayHexColor!,
                    expression,
                    rolls
                )
            ]
        })
    }
}
