import { commandAliases } from '@commands/aliases'
import { DiscordMarkdown } from '@core/DiscordMarkdown'
import { Role } from '@core/enums'
import { CommandContext, ICommand } from '@core/ICommand'
import { SERVICE_IDENTIFIERS } from '@dependency/identifiers'
import { Configuration } from '@dependency/types'
import { entryLogger } from '@root/decorators/EntryLogger'
import { HexColorString, MessageEmbed } from 'discord.js'
import request, { gql } from 'graphql-request'
import { inject, injectable } from 'inversify'

@injectable()
export class TimeCommand implements ICommand {
    aliases = commandAliases.Time

    rolesAllowed = [Role.Player]

    constructor(
        @inject(SERVICE_IDENTIFIERS.Config)
        private readonly config: Configuration,
        @inject(SERVICE_IDENTIFIERS.DiscordMarkdown)
        private readonly markdown: DiscordMarkdown
    ) {}

    @entryLogger()
    async execute({ message }: CommandContext) {
        const timeQuery = gql`
            query Query($filter: CharacterFilterInput!) {
                getTime(filter: $filter) {
                    current
                    location
                }
            }
        `

        const queryVariables = {
            filter: {
                guildMemberId: message.member?.id
            }
        }

        const {
            getTime: { current, location }
        } = await request(
            this.config.clients.gql.url,
            timeQuery,
            queryVariables
        )

        message.reply({
            embeds: [
                this.timeEmbed(
                    message.member?.displayHexColor!,
                    current,
                    location
                )
            ]
        })
    }

    private readonly timeEmbed = (
        color: HexColorString,
        current: string,
        location: string
    ): MessageEmbed =>
        new MessageEmbed()
            .setColor(color)
            .setTitle(this.markdown.bold('Date & time'))
            .addFields(
                {
                    name: 'Date & time',
                    value: current
                },
                {
                    name: 'Location',
                    value: location
                }
            )
}
