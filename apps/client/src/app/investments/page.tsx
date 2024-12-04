import { Investments } from 'views/Investments/Investments'
import styles from './page.module.css'

export default function InvestmentsPage() {
	return (
		<div className={styles.investments}>
			<Investments />
		</div>
	)
}
