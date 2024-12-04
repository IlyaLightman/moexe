import { FC } from 'react'
import styles from './HistoryBlock.module.css'
import { formatPercent, formatRub } from 'utils'

type HistoryRowProps = {
	month: string
	invested: number
	m2m: number
}

const HistoryRow: FC<HistoryRowProps> = ({ month, invested, m2m }) => {
	const isM2mPositive = m2m > 0

	return (
		<div className={styles.historyRow}>
			<p>{month}</p>
			<p>{formatRub(invested)}</p>
			<p
				style={{
					color: m2m ? (isM2mPositive ? 'green' : 'red') : undefined
				}}
			>
				{m2m ? `${isM2mPositive ? '+' : ''}${formatPercent(m2m)}` : '—'}
			</p>
		</div>
	)
}

type Props = {
	data: {
		month: string
		invested: number
		m2m: number
	}[]
}

export const HistoryBlock: FC<Props> = ({ data }) => {
	return (
		<div className={styles.historyBlock}>
			{data.toReversed().map(rowData => (
				<HistoryRow
					key={rowData.month}
					month={rowData.month}
					invested={rowData.invested}
					m2m={rowData.m2m}
				/>
			))}
		</div>
	)
}
