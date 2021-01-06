import * as React from "react"
import * as ReactDOM from "react-dom"
import css from './Clock.module.scss'

interface IClock {
	timezone?: string
}

const Clock = (props: IClock) => {

	const date = new Date()
	const adjustedDate = new Date(date.toLocaleString('en-US', { timeZone: props?.timezone}))
	const [time, setTime] = React.useState<Date>(adjustedDate)

	React.useEffect(() => {
		const interval = setInterval(update, 1000)
		return () => clearInterval(interval)	  
	})
	
	const update = () => {
		const date = new Date()
		const adjustedDate = new Date(date.toLocaleString('en-US', { timeZone: props?.timezone }))
		setTime(adjustedDate)
	}

	const h = time.getHours()
	const m = time.getMinutes()
	const s = time.getSeconds()

	return (	
		<div>
			<span className={css.time}>{h}:{(m < 10 ? '0' + m : m)} {h < 12 ? 'am' : 'pm'}</span>
		</div>
	)	
}

export default Clock