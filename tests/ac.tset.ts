import { AC } from '../src/index'
import { lorem } from 'faker'

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
})
