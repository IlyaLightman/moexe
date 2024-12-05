'use client'

import React, { useState } from 'react'
import styles from './InvestmentForm.module.css'
import apiClient from 'lib/apiClient'

interface InvestmentFormProps {
	onInvestmentAdded?: () => void
}

export const InvestmentForm: React.FC<InvestmentFormProps> = ({ onInvestmentAdded }) => {
	const [form, setForm] = useState({
		ticker: '',
		count: '',
		date: ''
	})

	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setLoading(true)
		setError(null)

		try {
			await apiClient.post('/api/investments', form)
			setForm({ ticker: '', count: '', date: '' })
			if (onInvestmentAdded) onInvestmentAdded()
		} catch (err) {
			console.error('Error adding investment:', err)
			setError('Ошибка добавления инвестиций. Попробуйте снова.')
		} finally {
			setLoading(false)
		}
	}

	return (
		<form className={styles.investmentForm} onSubmit={handleSubmit}>
			<div className={styles.formGroup}>
				<input
					type='text'
					placeholder='Тикер'
					value={form.ticker}
					onChange={e => setForm({ ...form, ticker: e.target.value })}
					required
					className={styles.formInput}
				/>
			</div>
			<div className={styles.formGroup}>
				<input
					type='number'
					placeholder='Количество'
					value={form.count}
					onChange={e => setForm({ ...form, count: e.target.value })}
					required
					className={styles.formInput}
				/>
			</div>
			<div className={styles.formGroup}>
				<input
					type='date'
					value={form.date}
					onChange={e => setForm({ ...form, date: e.target.value })}
					required
					className={styles.formInput}
				/>
			</div>
			{error && <div className={styles.errorMessage}>{error}</div>}
			<button type='submit' className={styles.submitButton} disabled={loading}>
				{loading ? 'Добавление...' : 'Добавить'}
			</button>
		</form>
	)
}
