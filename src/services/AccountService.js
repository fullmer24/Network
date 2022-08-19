import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { bcwSandbox } from './AxiosService'

class AccountService {
  async getAccount() {
    try {
      const res = await bcwSandbox.get('/account')
      AppState.account = res.data
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }
}

export const accountService = new AccountService()
