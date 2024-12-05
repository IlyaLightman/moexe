import styles from './page.module.css'

import { Tickers } from 'views/Tickers/Tickers'
import { History } from 'views/History/History'
import apiClient from 'lib/apiClient'
import { HistoryResponse } from 'lib/types'

// const tickers = [
// 	{
// 		ticker: 'YDEX',
// 		count: 1000
// 	},
// 	{
// 		ticker: 'GAZP',
// 		count: 50
// 	},
// 	{
// 		ticker: 'SBER',
// 		count: 3
// 	},
// 	{
// 		ticker: 'MOEX',
// 		count: 50
// 	},
// 	{
// 		ticker: 'T',
// 		count: 5
// 	},
// 	{
// 		ticker: 'SVCB',
// 		count: 500
// 	}
// ]

// const historyData = [
// 	{ month: 'Январь 2024', invested: 12345 },
// 	{ month: 'Февраль 2024 ', invested: 14345 },
// 	{ month: 'Март 2024', invested: 10345 },
// 	{ month: 'Апрель 2024', invested: 22345 },
// 	{ month: 'Май 2024', invested: 12345 },
// 	{ month: 'Июнь 2024', invested: 22345 }
// ]

export default async function DashboardPage() {
	try {
		const { data: historyData }: { data: HistoryResponse } = await apiClient.get('/api/history')
		const { history, invested, valuation } = historyData

		const { data: tickers } = await apiClient.get('/api/tickers')

		console.log(historyData)

		return (
			<div className={styles.dashboard}>
				<Tickers tickers={tickers} />
				<History invested={invested} valuation={valuation} historyData={history} />
			</div>
		)
	} catch (err) {
		console.error(err)
	}
}
