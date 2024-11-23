export interface Investment {
	id: number
	ticker: string
	date: string
	quantity: number
	price: number
}

export interface Portfolio {
	investments: Investment[]
	totalValue: number
}
