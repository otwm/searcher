import { path } from 'ramda'
import { AxiosError } from 'axios'

export interface HttpResponse<T = any> {
  data?: T;
  error?: AxiosError;
  status?: number;
}

interface SendFunction<T = any> {
  // @ts-ignore
  (...args): Promise<T>;
}

const sendWrap = <T = any>(send: SendFunction<T>) => async (
  // @ts-ignore
  ...config
): Promise<HttpResponse<T>> => {
  try {
    const result: T = await send(...config)
    return { data: result }
  } catch (error) {
    const status = path<number>(['response', 'status'], error)
    return { error, status }
  }
}

export default sendWrap
