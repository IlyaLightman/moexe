import { FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '../utils/prismaClient'
import { fetchTickerHistory } from '../api/moexApi'
import { formatToMonthYear } from '../utils/format'
import { HistorySchemas } from '../models/history'
import { Investment } from '@prisma/client'

export const getHistory = async (_: FastifyRequest, reply: FastifyReply) => {
	try {
		const investments = await prisma.investment.findMany()
		if (investments.length === 0) {
			return reply.code(200).send({ history: [], invested: 0, valuation: 0 })
		}

		const grouped = investments.reduce(
			(acc, inv) => ({
				...acc,
				[inv.ticker]: [...(acc[inv.ticker] || []), inv]
			}),
			{} as Record<string, Investment[]>
		)

		const tickers = Object.keys(grouped)
		const tickerHistories: { ticker: string; prices: { date: string; close: number }[] }[] = []
		for (const ticker of tickers) {
			const earliestDate = new Date(
				Math.min(...grouped[ticker].map(i => new Date(i.date).getTime()))
			)
			const prices = await fetchTickerHistory(ticker, earliestDate)
			tickerHistories.push({ ticker, prices })
		}

		const tickerHistoryMap = tickerHistories.reduce(
			(acc, { ticker, prices }) => ({ ...acc, [ticker]: prices }),
			{} as Record<string, { date: string; close: number }[]>
		)

		const monthlyValuations = tickers.reduce((acc, ticker) => {
			const group = grouped[ticker]
			const prices = [
				...(tickerHistoryMap[ticker] || []),
				...group.map(inv => ({ date: inv.date, close: inv.initPrice }))
			].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

			const valuations = prices.reduce((tickerAcc, { date, close }) => {
				const month = new Date(date).toISOString().slice(0, 7)

				const valuation = group.reduce((sum, inv) => {
					const investmentMonth = new Date(inv.date).toISOString().slice(0, 7)

					if (investmentMonth === month) {
						return sum + inv.count * inv.initPrice
					} else if (new Date(inv.date) <= new Date(date)) {
						return sum + inv.count * close
					}
					return sum
				}, 0)

				return { ...tickerAcc, [month]: valuation }
			}, {} as Record<string, number>)

			return mergeValuations(acc, valuations)
		}, {} as Record<string, number>)

		const history = Object.entries(monthlyValuations)
			.sort(([a], [b]) => a.localeCompare(b))
			.map(([date, valuation]) => ({
				month: formatToMonthYear(new Date(`${date}-01`)),
				valuation
			}))

		const invested = investments.reduce((sum, inv) => sum + inv.initPrice * inv.count, 0)

		const valuation = tickers.reduce((sum, ticker) => {
			const latestPrice =
				tickerHistoryMap[ticker]?.[tickerHistoryMap[ticker].length - 1]?.close || 0
			return (
				sum +
				grouped[ticker].reduce((groupSum, inv) => groupSum + inv.count * latestPrice, 0)
			)
		}, 0)

		reply.code(200).send({ history, invested, valuation })
	} catch (error) {
		console.error('Error fetching history:', error)
		reply.code(500).send({ error: 'Failed to fetch investment history' })
	}
}

const mergeValuations = (
	acc: Record<string, number>,
	val: Record<string, number>
): Record<string, number> =>
	Object.entries(val).reduce(
		(merged, [month, valuation]) => ({
			...merged,
			[month]: (merged[month] || 0) + valuation
		}),
		acc
	)

export const historyRoutes = (fastify: any, opts: any, done: any) => {
	fastify.get('/history', { schema: HistorySchemas.getHistory }, getHistory)
	done()
}
