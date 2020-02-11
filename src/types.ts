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

export interface ContactAddRes extends Response {
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

export interface ContactPayload {
  email: string
  first_name: string
  last_name: string
  phone: string
  customer_acct_name: string
  tags: string
  ip4: string
  form: string
  status: string
  [propName: string]: string
}

export interface Contact {
  email: string
  firstName?: string
  lastName?: string
  phone?: string
  customerName?: string
  tags?: string[]
  ip4?: string
  list?: number | string
  status?: number
  form?: number
  fields?: {
    [propName: string]: string
  }
}
