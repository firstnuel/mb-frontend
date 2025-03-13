import MenuBar from '@components/MenuBar'
import TimeBox from '@components/TimeBox'
import DateBox from '@components/DateBox'
import PeriodBox from '@components/PeriodBox'
import IconBox from '@components/IconBox'
import icons from '@assets/icons'
import ShowBox from '@components/ShowBox'
import FavProductSection from './FavProductSec'
import './index.scss'
import Charts from './Charts'
import Summary from './Summary'
import LowStock from './LowStock'
import ActiveUsers from './ActiveUsers'
import RecentSale from './RecentSales'
import TopCategories from './TopCategories'
import { useBusiness } from '@hooks/useBusiness'
import { useAuth } from '@hooks/useAuth'
import { useDashboard } from '@hooks/useDashboard'
import { formattedNumber, percentageOf, sumNumber } from '@utils/helpers'
import Notify from '@components/Notify'
import loadingImg from '@assets/images/loading-loading-forever.gif'

const Dashboard = () => {
  const { business } = useBusiness()
  const { user } = useAuth()
  const { fetchSummary, period, data, error, success, clearError, loading } = useDashboard()

  return(
    <div className='main-con-db'>
      <Notify clearErrFn={clearError} error={error} success={success}/>
      <div className='head'>
        <div className="menu-name">
          <MenuBar />
          <div className='name'> {business?.businessName ?? 'Dashboard'} </div>
        </div>
        <div className="date-time">
          <DateBox />
          <span className="seperator">-</span>
          <TimeBox />
        </div>
      </div>
      <div className="sub-head">
        <div className="greet">
          <strong>{`👋 Hello ${user?.name.split(' ')[0] ?? 'User'},`}</strong>
          <span> here’s what’s happening in your store today.</span>
        </div>
        <div className="actns">
          <PeriodBox />
          <IconBox src={loading ? loadingImg : icons.refresh} clName='refresh'
            onClick={() => business?._id && fetchSummary(business._id, period)}
          />
        </div>
      </div>
      <div className="show-box-div">
        <ShowBox
          tittleIcon={icons.receipt}
          title='Total Sales Amount'
          amount={formattedNumber(data?.totalSales ?? []) as string}
          currency={business?.currency?? 'USD'}
          trendAmt={formattedNumber(data?.totalSales ?? [], data?.lastTotalSales ?? []) as string}
          trendPct={percentageOf(data?.totalSales ?? [], data?.lastTotalSales ?? [])}
          up={percentageOf(data?.totalSales ?? [], data?.lastTotalSales ?? []) > 0}
        />
        <ShowBox
          tittleIcon={icons.receipt}
          title='Total Product Sales'
          amount={sumNumber(data?.totalProductSales ?? []) }
          unit='Items'
          trendAmt={sumNumber(data?.totalProductSales ?? [], data?.lastTotalPdSales ?? [])}
          trendPct={percentageOf(data?.totalProductSales ?? [], data?.lastTotalPdSales ?? [])}
          up={percentageOf(data?.totalProductSales ?? [], data?.lastTotalPdSales ?? []) > 0}
        />
        <ShowBox
          tittleIcon={icons.customer}
          title='Total Customers'
          amount={sumNumber(data?.totalCustomers ?? []) }
          unit='Persons'
          trendAmt={sumNumber(data?.totalCustomers ?? [], data?.lastTotalCustomers ?? [])}
          trendPct={percentageOf(data?.totalCustomers ?? [], data?.lastTotalCustomers ?? [])}
          up={percentageOf(data?.totalCustomers ?? [], data?.lastTotalPdSales ?? []) > 0}
        />
        <ShowBox
          tittleIcon={icons.profit}
          title='Net Profit'
          amount={formattedNumber(data?.netProfit ?? []) as string}
          currency={business?.currency?? 'USD'}
          trendAmt={formattedNumber(data?.netProfit ?? [], data?.lastNetProfit ?? []) as string}
          trendPct={percentageOf(data?.netProfit ?? [], data?.lastNetProfit ?? [])}
          up={percentageOf(data?.netProfit ?? [], data?.lastNetProfit ?? []) > 0}
        />
      </div>
      <div className="mid-body">
        <Charts period={period === 'daily'? 'day': period.slice(0, period.length - 2)}
          currentData={data?.totalProductSales ?? []}
          lastData={data?.lastTotalPdSales ?? []}
          currency={business?.currency?? 'USD'}
        />
        <FavProductSection pddata={data?.highestSellingProduct?? null} />
      </div>
      <div className="summaries">
        <LowStock />
        <Summary />
        <ActiveUsers />
      </div>
      <div className="recent-activity">
        <RecentSale />
        <TopCategories catData={data?.higestSellingCategories ?? []} />
      </div>
    </div>
  )
}

export default Dashboard