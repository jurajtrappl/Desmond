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
export class AbilityCheckCommand extends BaseRollCommand {
    aliases = commandAliases.AbilityCheck

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
        args: [skill, ...rollFlags]
    }: CommandContext): Promise<void> {
        const rollAbilityCheckQuery = gql`
            query RollAbilityCheck(
                $filter: CharacterFilterInput!
                $input: RollSkillInput!
            ) {
                rollAbilityCheck(filter: $filter, input: $input) {
                    expression
                    rolls
                }
            }
        `

        console.log(this.getRollOptions(rollFlags))

        const queryVariables = {
            filter: {
                guildMemberId: message.member?.id
            },
            input: {
                skill,
                ...this.getRollOptions(rollFlags)
            }
        }

        const {
            rollAbilityCheck: { expression, rolls }
        } = await request(
            this.config.clients.gql.url,
            rollAbilityCheckQuery,
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
