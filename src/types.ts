import { Response } from 'superagent'

export interface AccountViewRes extends Response {
  body: {
    account: string
    email: string
    fname: string
    lname: string
    cname: string
    subscriber_limit: string
    subscriber_total: string
    status: string
    branding: string
    trial: number
    result_code: number
    result_message: string
    result_output: string
  }
}
