import styles from './page.module.css'

import { Tickers } from 'views/Tickers/Tickers'
import { History } from 'views/History/History'

const tickers = [
	{
		ticker: 'YDEX',
		count: 1000
	},
	{
		ticker: 'GAZP',
		count: 50
	},
	{
		ticker: 'SBER',
		count: 3
	},
	{
		ticker: 'MOEX',
		count: 50
	},
	{
		ticker: 'T',
		count: 5
	},
	{
		ticker: 'SVCB',
		count: 500
	}
]

const historyData = [
	{ month: 'Январь 2024', invested: 12345 },
	{ month: 'Февраль 2024 ', invested: 14345 },
	{ month: 'Март 2024', invested: 10345 },
	{ month: 'Апрель 2024', invested: 22345 },
	{ month: 'Май 2024', invested: 12345 },
	{ month: 'Июнь 2024', invested: 22345 }
]

export default function DashboardPage() {
	return (
		<div className={styles.dashboard}>
			<Tickers tickers={tickers} />
			<History invested={123000} valuation={145500} historyData={historyData} />
		</div>
	)
}
