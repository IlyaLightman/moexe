import { FC } from 'react'

import styles from './ValueBlock.module.css'

type StatProps = {
	title: string
	value: number
	comment?: string
}

const Stat: FC<StatProps> = ({ title, value, comment }) => (
	<div className={styles.stat}>
		<p>{title}: </p>
		<p className={styles.value}>
			{Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(value)}
		</p>
		{comment && <p>{comment}</p>}
	</div>
)

type Props = {
	invested: number
	valuation: number
}

export const ValueBlock: FC<Props> = ({ invested, valuation }) => {
	const change = ((valuation - invested) / invested) * 100
	const changeSign = change > 0 ? '+' : ''

	return (
		<div className={styles.valueBlock}>
			<Stat title='Вложено' value={invested} />
			<Stat
				title='Стоимость'
				value={valuation}
				comment={`(${changeSign}${change.toFixed(2)}%)`}
			/>
		</div>
	)
}
