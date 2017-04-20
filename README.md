# route-js
A small routing adapter for Redux web apps

## API

```
import createRouter from '@density/route-js';
const router = createRouter(store);
```

The default export is a function `createRouter` which takes a single `store` argument. Pass a reference to your Redux store into this function and the router will use it to dispatch navigation actions.

This function returns a `router` instance with the following API:

```
router.addRoute(path, action);
```

Pass a rails-style path and a redux action into this function to register a new route. Paths should not have leading or trailing slashes. Any page navigation that matches the provided path will dispatch the provided action. Route parameters will be passed in as arguments to the action creator in the order they appear in the path.

```
router.navigate(path, params);
```

Pass a rails-style path and an object containing values for any route parameters. The router will generate and update `window.hash`, prepending a single forward slash before the provided path.

```
router.handle(path);
```

Match `path` against all routes and dispatch the matching action, passing in route parameters. Defaults to the current value of `window.location.hash`, with any leading and trailing slashes stripped out.

## Development

All helper functions are also exported from this module, with additional arguments to pass in the route list and store on each call. Check the source.
