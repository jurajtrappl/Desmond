import { commandAliases } from '@commands/aliases'
import { Role } from '@core/enums'
import { CommandContext, ICommand } from '@core/ICommand'
import { SERVICE_IDENTIFIERS } from '@dependency/identifiers'
import { Configuration } from '@dependency/types'
import { entryLogger } from '@root/decorators/EntryLogger'
import { gql, request } from 'graphql-request'
import { inject, injectable } from 'inversify'

@injectable()
export class MoveCommand implements ICommand {
    aliases = commandAliases.Move

    rolesAllowed = [Role.DungeonMaster]

    constructor(
        @inject(SERVICE_IDENTIFIERS.Config)
        private readonly config: Configuration
    ) {}

    @entryLogger()
    async execute({
        message,
        args: [characterNames, militaryTimeOffset, ...location]
    }: CommandContext): Promise<void> {
        const updateLocationMutation = gql`
            mutation UpdateTime(
                $filter: CharacterFilterInput!
                $input: UpdateTimeInput!
            ) {
                updateTime(filter: $filter, input: $input) {
                    location
                }
            }
        `

        const updateTimeMutation = gql`
            mutation UpdateTime(
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
                const filterVariable = {
                    filter: {
                        characterName,
                        guildId: message.guildId
                    }
                }

                const updateLocationMutationVariables = {
                    ...filterVariable,
                    input: {
                        newLocation: location.join(' ')
                    }
                }

                await request(
                    this.config.clients.gql.url,
                    updateLocationMutation,
                    updateLocationMutationVariables
                )

                const updateTimeMutationVariables = {
                    ...filterVariable,
                    input: {
                        militaryTimeOffset
                    }
                }

                await request(
                    this.config.clients.gql.url,
                    updateTimeMutation,
                    updateTimeMutationVariables
                )
            })
        )
    }
}
