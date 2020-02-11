import { AC } from '../src/index'
import { AccountViewRes } from '../src/types'
import { name, internet, phone } from 'faker'

let ac: AC

// TODO: Skip API tests if no authorization data provided
let AC_NAME: string
let AC_TOKEN: string

beforeAll(() => {
  if (process.env.AC_NAME != undefined) {
    AC_NAME = process.env.AC_NAME
  } else {
    console.error('AC_NAME environment variable required to run tests')
    process.exit(1)
  }

  if (process.env.AC_TOKEN != undefined) {
    AC_TOKEN = process.env.AC_TOKEN
  } else {
    console.error('AC_TOKEN environment variable required to run tests')
    process.exit(1)
  }

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
})

describe('API test', () => {
  it('Account View', () => {
    jest.setTimeout(30000)
    return ac.accountView().then((res: AccountViewRes) => {
      expect(res.body.result_code).toBe(1)
    })
  })

  it('Contact add', () => {
    jest.setTimeout(30000)
    return ac
      .contactAdd({
        email: internet.email(),
        firstName: name.firstName(),
        lastName: name.lastName()
      })
      .then((res: AccountViewRes) => {
        expect(res.body.result_code).toBe(1)
      })
  })

  it('Contact add without data', () => {
    jest.setTimeout(30000)
    return ac
      .contactAdd({
        email: internet.email()
      })
      .then((res: AccountViewRes) => {
        expect(res.body.result_code).toBe(1)
      })
  })

  // TEST field required
  it('Contact add with field data', () => {
    jest.setTimeout(30000)
    return ac
      .contactAdd({
        email: internet.email(),
        firstName: name.firstName(),
        lastName: name.lastName(),
        fields: {
          TEST: 'TEST'
        }
      })
      .then((res: AccountViewRes) => {
        //TODO: More params to check
        expect(res.body.result_code).toBe(1)
      })
  })

  it('Contact add to list', () => {
    jest.setTimeout(30000)
    return ac
      .contactAdd({
        email: internet.email(),
        firstName: name.firstName(),
        lastName: name.lastName(),
        list: 1
      })
      .then((res: AccountViewRes) => {
        //TODO: More params to check
        expect(res.body.result_code).toBe(1)
      })
  })
})
