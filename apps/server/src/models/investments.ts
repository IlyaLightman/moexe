export interface CreateInvestmentRequest {
	ticker: string
	count: number
	date: string
}

export interface DeleteInvestmentRequest {
	id: string
}

export interface Investment {
	id: string
	ticker: string
	count: number
	date: string
	createdAt: string
}

export const InvestmentSchemas = {
	createInvestment: {
		body: {
			type: 'object',
			required: ['ticker', 'count', 'date'],
			properties: {
				ticker: { type: 'string', minLength: 1 },
				count: { type: 'number', minimum: 0 },
				date: { type: 'string', format: 'date' }
			}
		},
		response: {
			201: {
				type: 'object',
				properties: {
					id: { type: 'string' },
					ticker: { type: 'string' },
					count: { type: 'number' },
					date: { type: 'string' },
					createdAt: { type: 'string' }
				}
			}
		}
	},
	deleteInvestment: {
		params: {
			type: 'object',
			required: ['id'],
			properties: {
				id: { type: 'string' }
			}
		}
	},
	getAllInvestments: {
		response: {
			200: {
				type: 'array',
				items: {
					type: 'object',
					properties: {
						id: { type: 'string' },
						ticker: { type: 'string' },
						count: { type: 'number' },
						date: { type: 'string' },
						createdAt: { type: 'string' }
					}
				}
			}
		}
	},
	getAllTickers: {
		response: {
			200: {
				type: 'array',
				items: {
					type: 'object',
					properties: {
						ticker: { type: 'string' },
						count: { type: 'number' }
					}
				}
			}
		}
	}
}
