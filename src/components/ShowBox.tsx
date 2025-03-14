import '@styles/show-box.scss'
import IconBox from './IconBox'
import icons from '@assets/icons'

interface ShowBoxProps {
    tittleIcon: string
    title: string
    amount: string
    unit? : string
    currency?: string
    trendAmt: string
    trendPct: number
    up?: boolean
    noChange?: boolean
}

const ShowBox = ( props: ShowBoxProps) => {
  // Determine the trend class based on props
  const getTrendClass = (baseClass: string) => {
    if (props.noChange) return `${baseClass} no-change`
    return props.up ? `${baseClass} up` : `${baseClass} down`
  }

  return (
    <div className="show-box">
      <div className="head">
        <IconBox src={props.tittleIcon} clName='icon'/>
        <div className="title">{props.title}</div>
      </div>
      <div className="body">
        <div className="amount">{props.amount}</div>
        <div className="unit-cur">{props.unit || props.currency}</div>
      </div>
      <div className="last">
        <div className={getTrendClass('trend-amt')}>
          {!props.noChange && <div className="sign">{props.up ? '+' : '-'}</div>}
          {props.currency && <div className="ucur">{props.currency}</div>}
          <div className="amt">{props.trendAmt}</div>
          {props.unit && <div className="ucur">{props.unit}</div>}
        </div>

        <div className={getTrendClass('pct')}>
          <div className="amt">{props.trendPct}%</div>
          {!props.noChange && <IconBox src={props.up? icons.arrowUp : icons.arrowDropDown} clName='icon'/>}
        </div>
      </div>
    </div>
  )
}

export default ShowBox