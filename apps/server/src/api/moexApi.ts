interface TickerHistory {
	date: string
	close: number
}

const fetchTickerData = async (
	ticker: string,
	from: string,
	till?: string,
	interval: number = 31
): Promise<TickerHistory[]> => {
	const url = `https://iss.moex.com/iss/engines/stock/markets/shares/securities/${ticker}/candles.json?from=${from}${
		till ? `&till=${till}` : ''
	}&interval=${interval}`

	try {
		const response = await fetch(url)
		if (!response.ok) {
			throw new Error(`Failed to fetch MOEX data: ${response.statusText}`)
		}

		const data = await response.json()
		return data.candles.data.map(([, close, , , , , , end]: any) => ({
			date: end,
			close
		}))
	} catch (error) {
		console.error(
			`Error fetching data for ticker ${ticker} from ${from} to ${till || '...'}`,
			error
		)
		throw new Error(`Failed to fetch ticker data for ${ticker}`)
	}
}

export const fetchTickerHistory = async (
	ticker: string,
	startDate: Date
): Promise<TickerHistory[]> => {
	const from = startDate.toISOString().split('T')[0]
	return fetchTickerData(ticker, from)
}

export const fetchTickerPriceForDate = async (ticker: string, date: Date): Promise<number> => {
	const from = date.toISOString().split('T')[0]
	const endDate = new Date(date)
	endDate.setDate(endDate.getDate() + 3)
	const till = endDate.toISOString().split('T')[0]

	const prices = await fetchTickerData(ticker, from, till, 24)
	return (
		prices.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0]?.close ??
		0
	)
}
