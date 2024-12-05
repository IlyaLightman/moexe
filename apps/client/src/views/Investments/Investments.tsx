'use client'

import { useEffect, useState } from 'react'
import { InvestmentForm } from './InvestmentForm/InvestmentForm'
import styles from './Investments.module.css'
import { InvestmentTable } from './InvestmentsTable/InvestmentsTable'
import Link from 'next/link'
import apiClient from 'lib/apiClient'
import { Investment } from 'lib/types'

export const Investments = () => {
	const [investments, setInvestments] = useState<Investment[]>([])

	const fetchInvestments = async () => {
		try {
			const response = await apiClient.get('/api/investments') // Backend route
			setInvestments(response.data)
		} catch (error) {
			console.error('Error fetching investments:', error)
		}
	}

	const handleRemove = async (investmentId: string) => {
		try {
			console.log('Removing investment:', investmentId)
			await apiClient.delete(`/api/investments/${investmentId}`)
			setInvestments(investments.filter(investment => investment.id !== investmentId))
		} catch (error) {
			console.error('Error removing investment:', error)
		}
	}

	const handleInvestmentAdded = async () => {
		await fetchInvestments()
	}

	useEffect(() => {
		fetchInvestments()
	}, [])

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
