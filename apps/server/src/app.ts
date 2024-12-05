import Fastify from 'fastify'
import cors from '@fastify/cors'
import swagger from '@fastify/swagger'
import { PrismaClient } from '@prisma/client'
import { investmentRoutes } from './routes/investments'
import { historyRoutes } from './routes/history'

const fastify = Fastify()
const prisma = new PrismaClient()

fastify.register(cors, {
	origin: '*'
})

fastify.register(swagger, {
	swagger: {
		info: {
			title: 'Investment Tracker API',
			description: 'API documentation for the Investment Tracker',
			version: '1.0.0'
		}
	}
})

fastify.register(investmentRoutes, { prefix: '/api' })
fastify.register(historyRoutes, { prefix: '/api' })

fastify.get('/ping', async () => {
	return { message: 'pong' }
})

const start = async () => {
	try {
		await fastify.listen({ port: 3001 })
		console.log('Server is running at http://localhost:3001')
	} catch (err) {
		fastify.log.error(err)
		process.exit(1)
	}
}

start()
