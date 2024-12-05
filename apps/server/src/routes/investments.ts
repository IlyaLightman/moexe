import { FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '../utils/prismaClient'
import {
	CreateInvestmentRequest,
	DeleteInvestmentRequest,
	InvestmentSchemas
} from '../models/investments'
import { fetchTickerPriceForDate } from '../api/moexApi'

export const createInvestment = async (
	req: FastifyRequest<{ Body: CreateInvestmentRequest }>,
	reply: FastifyReply
) => {
	const { ticker, count, date } = req.body

	try {
		const investmentDate = new Date(date)
		const initPrice = await fetchTickerPriceForDate(ticker, investmentDate)

		const investment = await prisma.investment.create({
			data: { ticker, count, date: investmentDate, initPrice }
		})

		reply.code(201).send(investment)
	} catch (error) {
		console.error('Error creating investment:', error)
		reply.code(500).send({ error: 'Failed to create investment' })
	}
}

export const deleteInvestment = async (
	req: FastifyRequest<{ Params: DeleteInvestmentRequest }>,
	reply: FastifyReply
) => {
	const { id } = req.params
	try {
		await prisma.investment.delete({ where: { id } })
		reply.code(204).send()
	} catch (error) {
		reply.code(500).send({ error: 'Failed to delete investment' })
	}
}

export const getAllInvestments = async (_: FastifyRequest, reply: FastifyReply) => {
	try {
		const investments = await prisma.investment.findMany({
			orderBy: { date: 'asc' }
		})
		reply.code(200).send(investments)
	} catch (error) {
		reply.code(500).send({ error: 'Failed to fetch investments' })
	}
}

export const getAllTickers = async (_: FastifyRequest, reply: FastifyReply) => {
	try {
		const tickers = await prisma.investment.groupBy({
			by: ['ticker'],
			_sum: { count: true }
		})
		const formattedTickers = tickers.map(ticker => ({
			ticker: ticker.ticker,
			count: ticker._sum.count
		}))
		reply.code(200).send(formattedTickers)
	} catch (error) {
		reply.code(500).send({ error: 'Failed to fetch tickers' })
	}
}

export const investmentRoutes = (fastify: any, opts: any, done: any) => {
	fastify.post('/investments', { schema: InvestmentSchemas.createInvestment }, createInvestment)
	fastify.delete(
		'/investments/:id',
		{ schema: InvestmentSchemas.deleteInvestment },
		deleteInvestment
	)
	fastify.get('/investments', { schema: InvestmentSchemas.getAllInvestments }, getAllInvestments)
	fastify.get('/tickers', { schema: InvestmentSchemas.getAllTickers }, getAllTickers)
	done()
}
