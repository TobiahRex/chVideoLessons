
# Reducers
## createActions

Use `createActions()` to build yourself an object which contains `Types` and `Creators`.

```js
import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  loginRequest: ['username', 'password'],
  loginSuccess: ['username'],
  loginFailure: ['error'],
  logout: null,
  custom: (a, b) => ({ type: 'CUSTOM', total: a + b })
})
```

The keys of the object will become keys of the `Creators`.  They will also become the keys of the `Types` after being converted to SCREAMING_SNAKE_CASE.

The values will control the flavour of the action creator.  When null is passed, an action creator will be made that only has the type.  For example:

```js
Creators.logout() // { type: 'LOGOUT' }
```

By passing an array of items, these become the parameters of the creator and are attached to the action.

```js
Creators.loginRequest('steve', 'secret') // { type: 'LOGIN_REQUEST', username: 'steve', password: 'secret' }
```
