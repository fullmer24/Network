import Axios from 'axios'
import { baseURL } from '../env'
export const bcwSandbox = Axios.create({
  baseURL,
  timeout: 8000
})
