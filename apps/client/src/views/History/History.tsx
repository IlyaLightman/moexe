import { FC } from 'react'
import styles from './History.module.css'

import { HistoryBlock } from './HistoryBlock/HistoryBlock'
import { PlotBlock } from './PlotBlock/PlotBlock'
import { ValueBlock } from './ValueBlock/ValueBlock'
import { HistoryData } from 'lib/types'

type Props = {
	invested: number
	valuation: number
	historyData: HistoryData
}

export const History: FC<Props> = ({ invested, valuation, historyData }) => {
	const historyDataM2m = historyData.map((data, index, array) => {
		if (index === 0) return { ...data, m2m: 0 }

		const prev = array[index - 1]
		const m2m = (data.valuation - prev.valuation) / prev.valuation

		return { ...data, m2m }
	})

	return (
		<div className={styles.history}>
			<PlotBlock data={historyDataM2m} />
			<ValueBlock invested={invested} valuation={valuation} />
			<div />
			<HistoryBlock data={historyDataM2m} />
		</div>
	)
}
