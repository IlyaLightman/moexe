'use client'

import { FC } from 'react'
import styles from './InvestmentsTable.module.css'
import { formatDate } from 'utils'

type InvestmentRowProps = {
	id: string
	ticker: string
	count: number
	date: string | Date
	onRemove: (ticker: string) => void
}

export const InvestmentRow: FC<InvestmentRowProps> = ({ id, ticker, count, date, onRemove }) => {
	return (
		<div className={styles.investmentRow}>
			<p>{ticker}</p>
			<p>{count}</p>
			<p>{formatDate(new Date(date))}</p>
			<span
				className={styles.crossIcon}
				onClick={() => onRemove(id)}
				role='button'
				aria-label='Remove investment'
				tabIndex={0}
			>
				✖
			</span>
		</div>
	)
}

type Props = {
	data: {
		id: string
		ticker: string
		count: number
		date: string | Date
	}[]
	onRemove: (ticker: string) => void
}

export const InvestmentTable: FC<Props> = ({ data, onRemove }) => {
	return (
		<div className={styles.investmentTable}>
			{data.map(row => (
				<InvestmentRow
					id={row.id}
					key={row.id}
					ticker={row.ticker}
					count={row.count}
					date={row.date}
					onRemove={onRemove}
				/>
			))}
		</div>
	)
}
