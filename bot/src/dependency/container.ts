import { commands } from '@root/commands'
import { ILogger } from '@root/core/logger/ILogger'
import { WinstonLogger } from '@root/core/logger/WinstonLogger'
import { DiscordClient } from '@root/core/DiscordClient'
import { ExecutionValidator } from '@root/core/ExecutionValidator'
import { Container } from 'inversify'
import { SERVICE_IDENTIFIERS } from './identifiers'
import { Configuration } from './types'
import { config } from './config'
import { CommandInvoker } from '@core/CommandInvoker'
import { DiscordMarkdown } from '@core/DiscordMarkdown'
import { ICommand } from '@core/ICommand'

export const initInversifyContainer = () => {
    const container = new Container({ defaultScope: 'Singleton' })

    // Configuration
    container
        .bind<Configuration>(SERVICE_IDENTIFIERS.Config)
        .toConstantValue(config)

    // Logger
    container.bind<ILogger>(SERVICE_IDENTIFIERS.Logger).to(WinstonLogger)

    // Markdown
    container
        .bind<DiscordMarkdown>(SERVICE_IDENTIFIERS.DiscordMarkdown)
        .to(DiscordMarkdown)

    // Dungeon master commands
    container
        .bind<ICommand>(SERVICE_IDENTIFIERS.Command)
        .to(commands.AddTimeCommand)

    container
        .bind<ICommand>(SERVICE_IDENTIFIERS.Command)
        .to(commands.MoveCommand)

    // Overview commands
    container
        .bind<ICommand>(SERVICE_IDENTIFIERS.Command)
        .to(commands.RollCommand)

    // Player commands
    container
        .bind<ICommand>(SERVICE_IDENTIFIERS.Command)
        .to(commands.AbilityCheckCommand)

    container
        .bind<ICommand>(SERVICE_IDENTIFIERS.Command)
        .to(commands.SavingThrowCommand)

    container
        .bind<ICommand>(SERVICE_IDENTIFIERS.Command)
        .to(commands.TimeCommand)

    // Commands components
    container
        .bind<ExecutionValidator>(SERVICE_IDENTIFIERS.ExecutionValidator)
        .to(ExecutionValidator)

    container
        .bind<CommandInvoker>(SERVICE_IDENTIFIERS.CommandInvoker)
        .to(CommandInvoker)

    // Discord client
    container
        .bind<DiscordClient>(SERVICE_IDENTIFIERS.DiscordClient)
        .to(DiscordClient)

    return container
}
