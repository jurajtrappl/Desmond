import { Module } from '@nestjs/common'
import { RollDiceService } from 'src/core/services/RollDice/RollDiceService'
import { Dnd5eThrowBonusesService } from '../core/services/ThrowBonuses/Dnd5eThrowBonusesService'
import { TimeService } from '../core/services/Time/TimeService'
import { DateTimeDateFnsService } from '../infrastructure/services/DateTime/date-fns/DateTimeDateFnsService'
import { RepositoriesModule } from './repositories.module'
import { RollStrategySelector } from 'src/core/services/RollDice/RollStrategySelector'
import { SERVICE_IDENTIFIERS } from 'src/core/services/identifiers'

const services = {
	dateTime: {
		provide: SERVICE_IDENTIFIERS.DateTime,
		useClass: DateTimeDateFnsService,
	},
	rollDice: {
		provide: SERVICE_IDENTIFIERS.RollDice,
		useClass: RollDiceService,
	},
	throwBonuses: {
		provide: SERVICE_IDENTIFIERS.ThrowBonuses,
		useClass: Dnd5eThrowBonusesService,
	},
	time: {
		provide: SERVICE_IDENTIFIERS.Time,
		useClass: TimeService,
	},
}

const rollStrategySelector = {
	provide: SERVICE_IDENTIFIERS.RollStrategySelector,
	useClass: RollStrategySelector,
}

@Module({
	imports: [RepositoriesModule],
	providers: [rollStrategySelector, ...Object.values(services)],
	exports: [rollStrategySelector, ...Object.values(services)],
})
export class ServicesModule {}
