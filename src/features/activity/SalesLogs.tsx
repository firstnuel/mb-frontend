import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import LogBox from './LogBox'
import Notify from '@components/Notify'
import { useLogs } from '@hooks/useLogs'
import { formatDate } from '@utils/helpers'


const SalesLogs = () => {
  const { transaction, success, error, loading, clearError, fetchLogs } = useLogs()

  return(
    <Container className="edit-business">
      <Notify clearErrFn={clearError} success={success} error={error} />
      <div className="head-info">
        <div className="name-desc">
          <div className="name">Transaction Logs</div>
          <div className="desc">View activities related sales and transactions</div>
        </div>
        <div className="business-logo">
          <Button variant='outline-primary'
            onClick={() => fetchLogs()}
            disabled={loading}>{loading? 'Loading..' : 'Refresh'}
          </Button>
        </div>
      </div>
      <Container className='edit-con'>
        {transaction.length ?
          transaction.map((log, idx) =>
            (<LogBox key={idx}
              dateTime={formatDate(log.timestamp.toString())}
              username={log.username}
              actionType={log.action}
              description={log.description}
              fe={idx === 0}
            />))
          :
          <div className='log-con fe'>No Log found</div>
        }
      </Container>
    </Container>
  )
}


export default  SalesLogs