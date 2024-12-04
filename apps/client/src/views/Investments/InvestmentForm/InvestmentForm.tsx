'use client'

import React, { useState } from 'react'
import styles from './InvestmentForm.module.css'

interface InvestmentFormProps {
	onInvestmentAdded?: () => void
}

export const InvestmentForm: React.FC<InvestmentFormProps> = ({ onInvestmentAdded }) => {
	const [form, setForm] = useState({
		ticker: '',
		count: '',
		date: ''
	})

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		await fetch('/api/investments', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(form)
		})

		setForm({ ticker: '', count: '', date: '' })
		if (onInvestmentAdded) onInvestmentAdded()
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
			<button type='submit' className={styles.submitButton}>
				Добавить
			</button>
		</form>
	)
}
