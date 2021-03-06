<img src="https://cdn.rawgit.com/DensityCo/conduit/master/logo.svg" height="50" />

<br />

[![CircleCI](https://circleci.com/gh/DensityCo/conduit.svg?style=svg)](https://circleci.com/gh/DensityCo/conduit)
[![Dependency Status](https://david-dm.org/densityco/conduit.svg)](https://david-dm.org/densityco/conduit)
[![Package Version](https://img.shields.io/npm/v/@density/conduit.svg)](https://npmjs.com/@density/conduit)
![License](https://img.shields.io/badge/License-MIT-green.svg)

A small routing adapter for Redux web apps.

## API

The default export is a function `createRouter` which takes a single `store` argument. Pass a reference to your Redux store into this function and the router will use it to dispatch navigation actions.

```JavaScript
import createRouter from '@density/conduit';
import store from './store';

const router = createRouter(store);
```

This function returns a router instance with the following API:


### `router.addRoute(path, action)`

Pass a rails-style path and a Redux action into this function to register a new route. Paths should not have leading or trailing slashes. Any page navigation that matches the provided path will dispatch the provided action. Route parameters will be passed in as arguments to the action, in the order they appear in the path.

### `router.navigate(path, params)`

Pass a rails-style path and an object containing values for any route parameters. The router will generate a new hash value and update `window.location.hash`, prepending a single forward slash.

### `router.handle(path)`

Match a literal `path` (no colons) against all routes and dispatch the matching action, passing in route parameters. `path` defaults to `window.location.hash` with leading and trailing slashes stripped out.


## Development

The router instance methods are also exported from this module, with arguments for passing in a list of routes and a Redux store on each call. Check the source.
