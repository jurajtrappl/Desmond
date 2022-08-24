import { Snowflake, Message } from 'discord.js'
import { inject, injectable } from 'inversify'
import { SERVICE_IDENTIFIERS } from '@root/dependency/identifiers'
import { Role } from './enums'
import { Configuration } from '@root/dependency/types'
import request, { gql } from 'graphql-request'

@injectable()
export class ExecutionValidator {
    constructor(
        @inject(SERVICE_IDENTIFIERS.Config)
        private readonly config: Configuration
    ) {}

    isBotMessage(message: Message): boolean {
        return message.author.bot
    }

    async isValidGuildId(guildId: string | null): Promise<boolean> {
        const guildQuery = gql`
            query Query($filter: GuildFilterInput!) {
                getGuild(filter: $filter) {
                    guildId
                }
            }
        `

        const queryVariables = {
            filter: {
                guildId
            }
        }

        const response = await request(
            this.config.clients.gql.url,
            guildQuery,
            queryVariables
        )

        return response !== undefined
    }

    async isValidPrefix(
        guildId: Snowflake,
        messageContent: string
    ): Promise<{ prefix: string; isValidPrefix: boolean }> {
        if (!messageContent.length) {
            return {
                isValidPrefix: false,
                prefix: ''
            }
        }

        const prefixQuery = gql`
            query Query($filter: GuildFilterInput!) {
                getGuild(filter: $filter) {
                    prefix
                }
            }
        `

        const queryVariables = {
            filter: {
                guildId
            }
        }

        const {
            getGuild: { prefix }
        } = await request(
            this.config.clients.gql.url,
            prefixQuery,
            queryVariables
        )

        const [messagePrefix] = messageContent
        return {
            isValidPrefix: messagePrefix === prefix,
            prefix: messagePrefix
        }
    }

    async canExecute(
        authorId: Snowflake,
        guildId: Snowflake,
        roles: Role[]
    ): Promise<boolean> {
        const guildQuery = gql`
            query Query($filter: GuildFilterInput!) {
                getGuild(filter: $filter) {
                    dmId
                    playerIds
                }
            }
        `

        const queryVariables = {
            filter: {
                guildId
            }
        }

        const {
            getGuild: { dmId, playerIds }
        } = await request(
            this.config.clients.gql.url,
            guildQuery,
            queryVariables
        )

        const authorRoles: Role[] = []

        if (authorId === dmId) {
            authorRoles.push(Role.DungeonMaster)
        }

        if (playerIds.includes(authorId)) {
            authorRoles.push(Role.Player)
        }

        return roles.some((role: Role) => authorRoles.includes(role))
    }
}
