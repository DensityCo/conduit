# route-js
A small routing adapter for Redux web apps

## API

### `const router = createRouter(store)`

The default export is a function `createRouter` which takes a single `store` argument. Pass a reference to your Redux store into this function and the router will use it to dispatch navigation actions.

This function returns a `router` instance with the following API:

### `router.addRoute(path, action)`

Pass a rails-style path and a redux action into this function to register a new route. Navigation matching the provided path will dispatch the provided action. All route parameters will be passed in to the action creator in the order they appear in the path.

### `router.navigate(path, params)`

Pass a rails-style path and a params object if any params are included. The router will update the window's href.

### `router.handle(path)`

Pass a window href value to match against all routes and dispatch the matching action, passing in route parameters.

## Development

All helper functions are also exported from this module, with additional arguments to pass in the route list and store on each call. Check the source.
