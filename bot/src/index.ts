import 'reflect-metadata'
import { DiscordClient } from './core/DiscordClient'
import { CommandInvoker } from './core/CommandInvoker'
import { initInversifyContainer } from './dependency/container'
import { SERVICE_IDENTIFIERS } from './dependency/identifiers'

const container = initInversifyContainer()

const commandInvoker = container.get<CommandInvoker>(
    SERVICE_IDENTIFIERS.CommandInvoker
)

const discordClient = container.get<DiscordClient>(
    SERVICE_IDENTIFIERS.DiscordClient
)

discordClient
    .configureErrorListener()
    .configureEventListeners(commandInvoker)
    .performClientLogin()
    .readyUp()
