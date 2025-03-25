import Container from 'react-bootstrap/Container'
import HeaderInfo from '@components/HeaderInfo'
import SecOption from '@components/SecOption'
import { useStocks } from '@hooks/useStocks'
import StocksTable from './StocksTable'
import LowStockList from './LowStocksList'
import LocationTable from './LocationTable'
import StockMovements from './StockMovements'
import ViewSuppliers from './ViewSuppliers'
import StocksBySupplier from './BySuppliers'
import EditLocation from './EditLocation'


const StocksMangement = () => {
  const { mainOpt, setMainOpt, subOpt } = useStocks()

  return(
    <div className="main-container-inv">
      <HeaderInfo secName='Stocks' subSecName={mainOpt}/>
      <div className='main-con'>
        <Container className='sec'>
          <SecOption name='Stocks' mainOpt={mainOpt} setMainOpt={setMainOpt}/>
          <SecOption name='Low Stocks' mainOpt={mainOpt} setMainOpt={setMainOpt}/>
          <SecOption name='Stocks By Supplier'mainOpt={mainOpt} setMainOpt={setMainOpt}/>
          <SecOption name='Movements' mainOpt={mainOpt} setMainOpt={setMainOpt}/>
          <SecOption name='Locations' mainOpt={mainOpt} setMainOpt={setMainOpt}/>
        </Container>
        <Container className='sec-show'>
          {mainOpt === 'Stocks' && <StocksTable />}
          {mainOpt === 'Low Stocks' && <LowStockList/> }
          {mainOpt === 'Movements' && <StockMovements/> }
          {mainOpt === 'Locations' && subOpt !== 'Edit Location'  && <LocationTable/> }
          {mainOpt === 'Locations' && subOpt === 'Edit Location' && <EditLocation/> }
          {mainOpt === 'Stocks By Supplier' && subOpt !== 'BySupplier List' && <ViewSuppliers/> }
          {mainOpt === 'Stocks By Supplier' &&  subOpt === 'BySupplier List' && <StocksBySupplier/> }
        </Container>
      </div>
    </div>
  )
}



export default StocksMangement