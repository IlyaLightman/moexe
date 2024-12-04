import Image from 'next/image'
import styles from './Tickers.module.css'
import { FC } from 'react'

const rubIconSrc = 'https://www.svgrepo.com/show/352411/ruble-sign.svg'

type Props = {
	ticker: string
	count: number
	imageSrc?: string
}

export const Ticker: FC<Props> = ({ ticker, count, imageSrc }) => {
	return (
		<div className={styles.ticker}>
			<Image
				className={styles.tickerLogo}
				src={imageSrc ?? rubIconSrc}
				alt={ticker}
				width={32}
				height={32}
			/>

			<div className={styles.tickerDescription}>
				<p className={styles.tickerTitle}>{ticker}</p>
				<p>{count}</p>
			</div>
		</div>
	)
}
