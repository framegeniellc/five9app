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

	let h = time.getHours()
	let daytime = 'am'
	const m = time.getMinutes()
	const s = time.getSeconds()

	if (h >= 12) {
		h = h - 12
		daytime = 'pm'
	}
	  
	if (h == 0) {
		h = 12
	}

	return (	
		<div>
			<span className={css.time}>{h}:{(m < 10 ? '0' + m : m)} {daytime}</span>
		</div>
	)	
}

export default Clock