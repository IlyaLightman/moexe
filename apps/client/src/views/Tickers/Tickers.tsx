import styles from './Tickers.module.css'

import { Ticker } from './Ticker'
import { FC } from 'react'
import Link from 'next/link'

const imageSrcByTicker: Record<string, string | undefined> = {
	YDEX: 'https://s3-symbol-logo.tradingview.com/yandex--big.svg',
	GAZP: 'https://s3-symbol-logo.tradingview.com/gazprom--big.svg',
	SBER: 'https://s3-symbol-logo.tradingview.com/sberbank--big.svg',
	MOEX: 'https://s3-symbol-logo.tradingview.com/moscow-exchange--big.svg',
	T: 'https://s3-symbol-logo.tradingview.com/tcs-group-holding--big.svg',
	SVCB: 'https://s3-symbol-logo.tradingview.com/sovcombank--big.svg',
	ROSN: 'https://s3-symbol-logo.tradingview.com/rosneft--big.svg',
	LKOH: 'https://s3-symbol-logo.tradingview.com/lukoil--big.svg',
	PLZL: 'https://s3-symbol-logo.tradingview.com/polyus--big.svg',
	MGNT: 'https://s3-symbol-logo.tradingview.com/magnit--big.svg',
	MTSS: 'https://s3-symbol-logo.tradingview.com/mts--big.svg',
	CHMF: 'https://s3-symbol-logo.tradingview.com/severstal--big.svg'
}

type Props = {
	tickers: {
		ticker: string
		count: number
	}[]
}

export const Tickers: FC<Props> = ({ tickers }) => {
	return (
		<div className={styles.tickers}>
			{tickers.map(ticker => (
				<Ticker
					key={ticker.ticker}
					{...ticker}
					imageSrc={imageSrcByTicker[ticker.ticker]}
				/>
			))}
			{tickers.length && <div />}
			<div className={styles.ivestmentsManagementLink}>
				<Link href='/investments'>Управление инвестициями</Link>
			</div>
		</div>
	)
}
