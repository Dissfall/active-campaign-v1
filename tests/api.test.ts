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

describe('Account', () => {
  it('View', () => {
    jest.setTimeout(30000)
    return ac.accountView().then((res: AccountViewRes) => {
      expect(res.body.result_code).toBe(1)
    })
  })
})

describe('Contact', () => {
  it('Add', () => {
    jest.setTimeout(30000)
    return ac
      .contactAdd({
        email: internet.email(),
        firstName: name.firstName(),
        lastName: name.lastName(),
      })
      .then((res: AccountViewRes) => {
        expect(res.body.result_code).toBe(1)
      })
  })

  it('Add without data', () => {
    jest.setTimeout(30000)
    return ac
      .contactAdd({
        email: internet.email(),
      })
      .then((res: AccountViewRes) => {
        expect(res.body.result_code).toBe(1)
      })
  })

  // TEST field required
  it('Add with field data', () => {
    jest.setTimeout(30000)
    return ac
      .contactAdd({
        email: internet.email(),
        firstName: name.firstName(),
        lastName: name.lastName(),
        fields: {
          TEST: 'TEST',
        },
      })
      .then((res: AccountViewRes) => {
        //TODO: More params to check
        expect(res.body.result_code).toBe(1)
      })
  })

  it('Add to list', () => {
    jest.setTimeout(30000)
    return ac
      .contactAdd({
        email: internet.email(),
        firstName: name.firstName(),
        lastName: name.lastName(),
        list: 1,
      })
      .then((res: AccountViewRes) => {
        //TODO: More params to check
        expect(res.body.result_code).toBe(1)
      })
  })
})
