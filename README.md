# active-campaign-v1
_Wrapper for Active Campaign API v1_

[![NPM](https://nodei.co/npm/active-campaign-v1.png?downloads=true&downloadRank=true)](https://nodei.co/npm/active-campaign-v1/)

[![npm Downloads](https://img.shields.io/npm/dm/active-campaign-v1.svg?style=flat-square)](https://npmcharts.com/compare/active-campaign-v1?minimal=true)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)](http://commitizen.github.io/cz-cli/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square&logo=prettier)](https://github.com/prettier/prettier)

This module contains API endpoints, which I needed when implementing my project. You can easily contribute to this module the endpoints you need and use them.

## Docks
**See the documentation at []()**

## Example

### Common JS

```JS
import { AC } from 'active-campaign-v1'

const ac = new AC('<account-name>', '<API-token>')

ac.contactAdd({
    email: 'test@mail.com',
    firstName: 'test'
  })
```

This code creates new contact with email `test@mail.com` and `test` name.
