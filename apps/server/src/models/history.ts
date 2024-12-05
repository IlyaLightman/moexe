export const HistorySchemas = {
	getHistory: {
		response: {
			200: {
				type: 'object',
				properties: {
					history: {
						type: 'array',
						items: {
							type: 'object',
							properties: {
								month: {
									type: 'string',
									description: 'Formatted date (e.g., Январь 2024)'
								},
								valuation: {
									type: 'number',
									description: 'Valuation for the month'
								}
							},
							required: ['month', 'valuation']
						}
					},
					invested: {
						type: 'number',
						description: 'Total amount invested based on initial prices'
					},
					valuation: {
						type: 'number',
						description: 'Current total valuation based on the latest prices'
					}
				},
				required: ['history', 'invested', 'valuation']
			}
		}
	}
}
