import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { logsService } from '@services/logsService'
import { Log, LogsState } from '@typess/logs'

const initialState: LogsState = {
  mainOpt: 'Inventory',
  inventory: [],
  stock: [],
  transaction: [],
  contacts: [],
  business: [],
  users: [],
  success: null,
  error: null,
  loading: false,
}

export const fetchLogs = createAsyncThunk('contacts/fetchLogs', async () => {
  const response = await logsService.fetchLogs()
  if (!response.data) {
    throw new Error(response.message)
  }
  return { logs: response.data as Log[], message: response.message }
})

// Sort logs by timestamp (newest to oldest)
const sortLogsByTimestamp = (logs: Log[]): Log[] => {
  return [...logs].sort((a, b) => {
    const dateA = new Date(a.timestamp).getTime()
    const dateB = new Date(b.timestamp).getTime()
    return dateB - dateA // Descending order (newest first)
  })
}

const logsSlice = createSlice({
  name: 'logs',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
      state.success = null
    },
    setMainOpt: (state, action) => {
      state.mainOpt = action.payload.option
    },
  },
  extraReducers: (builder) => {
    // Fetch Logs
    builder
      .addCase(fetchLogs.pending, (state) => {
        state.loading = true
        state.success = null
        state.error = null
      })
      .addCase(fetchLogs.fulfilled, (state, action) => {
        // Filter logs by entity type and sort by timestamp (newest to oldest)
        state.inventory = sortLogsByTimestamp(
          action.payload.logs.filter(log => log.entity === 'PRODUCT')
        )

        state.stock = sortLogsByTimestamp(
          action.payload.logs.filter(log =>
            (log.entity === 'STOCK' || log.entity === 'LOCATION')
          )
        )

        state.transaction = sortLogsByTimestamp(
          action.payload.logs.filter(log =>
            (log.entity === 'TRANSACTION' || log.entity === 'SALE')
          )
        )

        state.users = sortLogsByTimestamp(
          action.payload.logs.filter(log => log.entity === 'USER')
        )

        state.contacts = sortLogsByTimestamp(
          action.payload.logs.filter(log =>
            (log.entity === 'SUPPLIER' || log.entity === 'CUSTOMER')
          )
        )

        state.business = sortLogsByTimestamp(
          action.payload.logs.filter(log => log.entity === 'BUSINESS')
        )

        state.success = action.payload.message
        state.loading = false
        state.error = null
      })
      .addCase(fetchLogs.rejected, (state, action) => {
        state.loading = false
        state.success = null
        state.error = action.error.message || 'Logs data could not be fetched, try again later'
      })
  }
})

export const { clearError, setMainOpt } = logsSlice.actions
export default logsSlice.reducer