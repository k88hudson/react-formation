## `this.getGlobalErrors()`

Returns an object of all global errors set by field name or arbitrary id (see this.setGlobalError). Errors are always returned as an array.

Example:

```javascript
{
  username: ['That is not a valid username'],
  password: [
    'You have already used that password',
    'That password sucks'
  ],
  SERVER_DOWN: ['The server appears to be down']
}
```
