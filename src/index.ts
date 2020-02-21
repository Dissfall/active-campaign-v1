import { get, post } from 'superagent'
import { zip, join, map, pickBy, mapKeys } from 'lodash'
import { AccountViewRes, ContactAddRes, ContactViewRes, Contact, ContactPayload } from './types'

/**
 * Active Campaign API v1 wrapper
 *
 * @access public
 */
class AC {
  private readonly host: string
  private readonly endpoint = '/admin/api.php'

  constructor(accountName: string, private readonly token: string) {
    this.host = this.hostGen(accountName)
  }

  async accountView(): Promise<AccountViewRes> {
    return this.request('account_view').auth.get
  }

  async contactAdd(data: Contact): Promise<ContactAddRes> {
    return this.request(methods.contact.add).auth.payload(this.prepareContactPayload(data)).post
  }

  async contactView(param: number | string): Promise<ContactViewRes> {
    if (typeof param === 'string' && param.indexOf('@') > -1) {
      return this.request(methods.contact.viewEmail).auth.set({email: param}).get
    } else {
      return this.request(methods.contact.view).auth.set({id: param.toString()}).get
    }
  }

  async contactSync(data: Contact): Promise<ContactAddRes> {
    return this.request(methods.contact.sync).auth.payload(this.prepareContactPayload(data)).post
  }

  private prepareContactPayload(data: Contact): ContactPayload {
    const contact: ContactPayload = pickBy<ContactPayload>({
      email: data.email,
      first_name: data?.firstName ?? '',
      last_name: data?.lastName ?? '',
      phone: data?.phone ?? '',
      customer_acct_name: data?.customerName ?? '',
      tags: join(data?.tags, ', ') ?? '',
      ip4: data?.ip4 ?? '',
      status: String(data?.status ?? ''),
      form: String(data?.form ?? ''),
      ...mapKeys(data.fields, (val: string, key: string) => `field[%${key}%,0]`)
    }, (value: any) => value != '') as ContactPayload

    if (data.list) contact[`p[${data.list}]`] = String(data.list)

    return contact
  }

  /**
   * This function provides abstraction for creating request to AC API.
   *
   * @link https://www.activecampaign.com/api/overview.php
   *
   * @param {string} action Name of API endpoint.
   *
   * @return {object} Object contains methods for preparing and making request.
   */
  private readonly request = (action: string): any => {
    const url = this.host + this.endpoint
    const token = this.token

    const request = {
      url: url,
      data: {},

      /**
       * This method allows to set URL params.
       *
       * @param {Params} params Object contains key-value pairs of params.
       * @see Params
       */
      set(params: Params) {
        this.url +=
          (this.url.indexOf('?') > -1 ? '&' : '?') +
          join(
            map(
              zip(Object.keys(params), Object.values(params)),
              (pair: string[]) => join(pair, '=')
            ),
            '&'
          )
        return this
      },
      /**
       * This method updates param if new value provided and reset param if not
       *
       * @param {string} param Param name
       * @param {string} newValue Value
       */
      reset(param: string, newValue?: string) {
        if (newValue) {
          this.url = this.url.replace(
            new RegExp(`${param}=[A-Za-z0-9]+`),
            `${param}=${newValue}`
          )
        } else {
          this.url = this.url.replace(new RegExp(`&${param}=[A-Za-z0-9]+`), '')
        }
        return this
      },
      /**
       * Method for check if param setted
       *
       * @param {string} param Param name
       * @return {boolean}
       */
      isSetted(param: string) {
        return new RegExp(param).test(this.url)
      },
      /**
       * Method for update param
       */
      update(param: string, value: string) {
        if (this.isSetted(param)) {
          this.reset(param, value)
        } else {
          this.set({ [param]: value })
        }
      },
      /**
       * Method to set paylod for POST request
       *
       * @param {any} data Payload object
       */
      payload(data: any) {
        this.data = data
        return this
      },
      /**
       * Method to set api_action variable in URL
       *
       * @param {string} action Action name
       * @link https://www.activecampaign.com/api/overview.php
       */
      action(action: string) {
        this.set({ api_action: action })
        return this
      },
      /**
       * Method to set authororisation variable in URL
       */
      get auth() {
        this.update('api_key', token)
        return this
      },
      /**
       * Method to performe GET request with generated URL
       */
      get get() {
        return get(this.url)
      },
      /**
       * Method to performe POST request with generated URL and data
       */
      get post() {
        return post(this.url).type('form').send(this.data)
      },
      /**
       * Method to set response format
       */
      get format() {
        const json = () => {
          this.update('api_output', 'json')
          return this
        }
        const xml = () => {
          this.update('api_output', 'xml')
          return this
        }
        const serialize = () => {
          this.update('api_output', 'serialize')
          return this
        }
        return {
          get json() {
            return json()
          },
          get xml() {
            return xml()
          },
          get serialize() {
            return serialize()
          },
        }
      },
    }

    return request.action(action).set({ api_output: 'json' })
  }

  /**
   * This helper function is generate api base url from account name.
   */
  private readonly hostGen = (accountName: string): string =>
    `http://${accountName}.api-us1.com`
}

const methods = {
  account: {
    view: 'account_view'
  },
  contact: {
    add: 'contact_add',
    delete: 'contact_delete',
    edit: 'contact_edit',
    list: 'contact_list',
    sync: 'contact_sync',
    view: 'contact_view',
    viewEmail: 'contact_view_email'
  }
}

export interface Params {
  [propName: string]: string
}

export { AC }
export * from './types'
