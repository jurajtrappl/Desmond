// Dungeon master commands
import { AddTimeCommand } from './dm/AddTime'
import { MoveCommand } from './dm/Move'

// Overview commands
import { RollCommand } from './overview/Roll'

// Player command
import { AbilityCheckCommand } from './player/AbilityCheck'
import { SavingThrowCommand } from './player/SavingThrow'
import { TimeCommand } from './player/Time'

export const commands = {
    AddTimeCommand,
    MoveCommand,
    RollCommand,
    AbilityCheckCommand,
    SavingThrowCommand,
    TimeCommand
}
