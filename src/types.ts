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

export interface ContactViewRes extends Response {
  body: {
    id: string
    subscribeid: number
    listid: number
    formid: number
    sdate: string
    udate: string
    rating: number
    rating_tstamp: string
    gravatar: string
    deleted: string
    status: number
    responder: 1
    sync: 0
    unsubreason: string
    unsubcampaignid: string
    unsubmessageid: string
    first_name: string
    last_name: string
    customer_acct_id: number
    customer_acct_name: string
    cdate: string
    email: string
    bounced_hard: string
    bounced_soft: string
    bounced_date: string
    campaign_history: string[]
    ip: string
    hash: string
    socialdata_lastcheck: string
    lid: 1
    name: string
    a_unsub_date: string
    a_unsub_time: string
    lists: string[]
    listslist: string
    actions: any[]
    fields: {
      [key: string]: Field
    }
    bounces: {
      mailing: string[]
      mailings: number
      responder: string[]
      responders: number
    }
    bouncescnt: number
    tags: string[]
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
  'status[123]': string
  [propName: string]: string
}

export interface Field {
  id: string
  title: string
  descript: string
  type: string
  isRequired: string
  perstag: string
  defval: string
  show_in_list: string
  rows: string
  cols: string
  visible: string
  service: string
  ordernum: string
  cdate: string
  udate: string
  val: string
  element: string
  tag: string
}

export interface Contact {
  /**
   * Contact email
   */
  email: string
  /**
   * Contact first name
   */
  firstName?: string
  /**
   * Contact last name
   */
  lastName?: string
  /**
   * Contact phone
   */
  phone?: string
  /**
   * Contact company name
   */
  customerName?: string
  /**
   * Array of contact tags
   */
  tags?: string[]
  /**
   * Contact ip address
   */
  ip4?: string
  /**
   * Target list to add contact to it
   */
  list?: number | string
  /**
   * Current contact status {1 | 2 | 3}
   */
  status?: number
  form?: number
  /**
   * Custom contact fields
   */
  fields?: {
    [propName: string]: string
  }
}
