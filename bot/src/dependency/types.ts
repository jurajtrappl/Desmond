import { Intents } from 'discord.js'

export type Configuration = {
    clients: {
        discord: {
            intents: Intents
            loginToken: string
        }
        gql: {
            url: string
        }
    }
}
