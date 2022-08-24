import { commandAliases } from '@commands/aliases'
import { Role } from '@core/enums'
import { CommandContext, ICommand } from '@core/ICommand'
import { SERVICE_IDENTIFIERS } from '@dependency/identifiers'
import { Configuration } from '@dependency/types'
import { entryLogger } from '@root/decorators/EntryLogger'
import { gql, request } from 'graphql-request'
import { inject, injectable } from 'inversify'

@injectable()
export class AddTimeCommand implements ICommand {
    aliases = commandAliases.AddTime

    rolesAllowed = [Role.DungeonMaster]

    constructor(
        @inject(SERVICE_IDENTIFIERS.Config)
        private readonly config: Configuration
    ) {}

    @entryLogger()
    async execute({
        message,
        args: [characterNames, militaryTimeOffset]
    }: CommandContext): Promise<void> {
        const addTimeMutation = gql`
            mutation Mutation(
                $filter: CharacterFilterInput!
                $input: UpdateTimeInput!
            ) {
                updateTime(filter: $filter, input: $input) {
                    current
                }
            }
        `

        await Promise.all(
            characterNames.split(',').map(async (characterName: string) => {
                const mutationVariables = {
                    filter: {
                        characterName,
                        guildId: message.guildId
                    },
                    input: {
                        militaryTimeOffset
                    }
                }

                await request(
                    this.config.clients.gql.url,
                    addTimeMutation,
                    mutationVariables
                )
            })
        )
    }
}
