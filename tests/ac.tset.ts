import { Contact } from '../src/types'
import { AC } from '../src/index'
import { lorem, internet, name, phone, company } from 'faker'
import { join } from 'lodash'

let ac: AC

const AC_NAME = lorem.word()
const AC_TOKEN = lorem.word()

beforeAll(() => {
  ac = new AC(AC_NAME, AC_TOKEN)
})

describe('Request preparing test', () => {
  it('Initialization', () => {
    const action = 'account_view'
    // @ts-ignore
    expect(ac.request(action).url).toBe(
      `http://${AC_NAME}.api-us1.com/admin/api.php?api_action=${action}&api_output=json`
    )
  })

  it('Param reset', () => {
    const action = 'account_view'
    // @ts-ignore
    expect(ac.request(action).reset('api_output').url).toBe(
      `http://${AC_NAME}.api-us1.com/admin/api.php?api_action=${action}`
    )
  })

  it.todo('Action change')

  it.todo('Params setting')

  it('Authorization', () => {
    const action = 'account_view'
    // @ts-ignore
    expect(ac.request(action).auth.url).toBe(
      `http://${AC_NAME}.api-us1.com/admin/api.php?api_action=${action}&api_output=json&api_key=${AC_TOKEN}`
    )
  })

  it('Reauthorization', () => {
    const action = 'account_view'
    // @ts-ignore
    expect(ac.request(action).auth.auth.url).toBe(
      `http://${AC_NAME}.api-us1.com/admin/api.php?api_action=${action}&api_output=json&api_key=${AC_TOKEN}`
    )
  })

  it('Chagting output format (json)', () => {
    const action = 'account_view'
    // @ts-ignore
    expect(ac.request(action).format.json.url).toBe(
      `http://${AC_NAME}.api-us1.com/admin/api.php?api_action=${action}&api_output=json`
    )
  })

  it('Chagting output format (xml)', () => {
    const action = 'account_view'
    // @ts-ignore
    expect(ac.request(action).format.xml.url).toBe(
      `http://${AC_NAME}.api-us1.com/admin/api.php?api_action=${action}&api_output=xml`
    )
  })

  it('Chagting output format (serialize)', () => {
    const action = 'account_view'
    // @ts-ignore
    expect(ac.request(action).format.serialize.url).toBe(
      `http://${AC_NAME}.api-us1.com/admin/api.php?api_action=${action}&api_output=serialize`
    )
  })

  it('Payload preparing', () => {
    const payload = {
      email: internet.email(),
      firstName: name.firstName(),
      lastName: name.lastName(),
      phone: phone.phoneNumber(),
      customerName: company.companyName(),
      tags: [lorem.word(), lorem.word(), lorem.word()],
      ip4: internet.ip(),
      list: 1,
      status: Math.floor(Math.random() * 3) + 1,
      fields: {
        TEST: 'TEST'
      }
    } as Contact
    const requestData = {
      email: payload.email,
      first_name: payload.firstName,
      last_name: payload.lastName,
      phone: payload.phone,
      customer_acct_name: payload.customerName,
      tags: join(payload.tags, ', '),
      ip4: payload.ip4,
      'p[1]': '1',
      'status[123]': payload.status?.toString(),
      'field[%TEST%,0]': 'TEST'
    }
    //@ts-ignore
    expect(ac.prepareContactPayload(payload)).toStrictEqual(requestData)
  })
})
