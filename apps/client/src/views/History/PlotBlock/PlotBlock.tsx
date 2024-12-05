'use client'

import { FC } from 'react'
import { Line } from 'react-chartjs-2'
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
} from 'chart.js'

import styles from './PlotBlock.module.css'
import { HistoryData } from 'lib/types'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

type PlotProps = {
	data: HistoryData
}

const Plot: FC<PlotProps> = ({ data }) => {
	const chartData = {
		labels: data.map(item => item.month),
		datasets: [
			{
				label: 'Valuation',
				data: data.map(item => item.valuation),
				borderColor: 'black',
				backgroundColor: 'black',
				borderWidth: 2,
				tension: 0.4
			}
		]
	}

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				display: false
			},
			title: {
				display: false
			}
		},
		scales: {
			y: {
				ticks: {
					callback: function (value: string | number) {
						return `${value}\u00A0₽`
					}
				}
			}
		}
	}

	return <Line data={chartData} options={options} />
}

type Props = PlotProps

export const PlotBlock: FC<Props> = ({ data }) => (
	<div className={styles.plotBlock}>
		<Plot data={data} />
	</div>
)
