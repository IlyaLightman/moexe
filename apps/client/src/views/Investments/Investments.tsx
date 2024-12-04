'use client'

import { useState } from 'react'

import { InvestmentForm } from './InvestmentForm/InvestmentForm'
import styles from './Investments.module.css'
import { InvestmentTable } from './InvestmentsTable/InvestmentsTable'
import Link from 'next/link'

export const Investments = () => {
	const [investments, setInvestments] = useState([
		{ ticker: 'AAPL', count: 10, date: new Date().toISOString() },
		{ ticker: 'TSLA', count: 5, date: new Date().toISOString() }
	])

	const handleRemove = (ticker: string) => {
		setInvestments(prev => prev.filter(inv => inv.ticker !== ticker))
	}

	const handleInvestmentAdded = () => {
		// Fetch or update the investments after a new one is added
		console.log('Investment added!')
	}

	return (
		<div className={styles.investmentsLayout}>
			<div className={styles.investments}>
				<InvestmentForm onInvestmentAdded={handleInvestmentAdded} />
				<InvestmentTable data={investments} onRemove={handleRemove} />
			</div>
			<div className={styles.dashboardLink}>
				<Link href='/'>Вернуться на дашборд</Link>
			</div>
		</div>
	)
}
