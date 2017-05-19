const pathToRegexp = require('path-to-regexp');

// Get the current url that the user is at.
function getCurrentPath() {
  return window.location.hash.slice(1).replace(/(^\/|\/$)/, '');
}

// Check a path against internal route list
export function checkPath(routes, path) {
  return routes.reduce(function (acc, next) { 
    return next.regexp.test(path) ? next : acc;
  }, null);
}

// Add a route to the provided collection
export function addRoute(routes, path, hooks={}) {
  const keys = [];
  routes.push({
    path,
    keys,
    hooks,
    regexp: pathToRegexp(path, keys),
    generate: pathToRegexp.compile(path),
  });
}

// Helper to handle navigation events
export function handle(routes, store, path) {
  path = path || getCurrentPath();
  const route = checkPath(routes, path);

  if (route) {
    return verifyHooks(store, [route.hooks.afterTransition]).then(() => {
      const params = route.regexp.exec(path).slice(1);
      // If the route has a `dispatch` hook, dispatch an action when the route transition happens.
      if (route.hooks && route.hooks.transition) {
        store.dispatch(route.hooks.transition.apply(route, params));
      }
      return true;
    });
  } else {
    console.warn(`Route to ${path} not found!`);
    return Promise.resolve(false);
  }
}

// Given an array of hooks, verify them in order to make sure each resolves. This "short circits" -
// if an earlier hooks fails, the hooks afterward don't run.
function verifyHooks(store, hooks) {
  if (hooks.length > 0) {
    // Get the next hook
    let hook = false;
    while (!hook) {
      if (hooks.length == 0) {
        return Promise.resolve();
      } else {
        hook = hooks.shift();
      }
    }

    const response = store.dispatch(hook());
    if (response && response.then) {
      return response.then(() => verifyHooks(store, hooks))
    } else {
      return verifyHooks(store, hooks)
    }
  } else {
    return Promise.resolve();
  }
}

// Programmatically "navigate" (just sets window.location.hash)
export function navigate(routes, store, path, params) {
  const upcomingRoute = checkPath(routes, path);
  const currentRoute = checkPath(routes, getCurrentPath());

  if (!upcomingRoute) {
    console.warn('Path not found. Make sure it has been added with `addRoute()`');
    return false;
  }

  const hooks = [];

  // Make sure of a few things before transitioning:
  // 1. If the current route has an `after` hook, make sure that is resolves.
  // 2. If the upcoming hook has a `before` hook, make sure it resolves.
  return verifyHooks(store, [
    currentRoute.hooks.beforeNextTransition,
    upcomingRoute.hooks.beforeTransition,
  ]).then(() => {
    window.location.hash = '/' + upcomingRoute.generate(params);
  });
}

// Create a router instance
export default function createRouter(store) {
  // Array of routes
  const routes = [];

  // Bind helpers to this instance
  const addRouteBound = addRoute.bind(this, routes);
  const handleBound = handle.bind(this, routes, store);
  const navigateBound = navigate.bind(this, routes, store);

  // Listen for hash changes
  window.addEventListener('hashchange', () => {
    handle(routes, store);
  });

  // Public API
  return {
    routes,
    addRoute: addRouteBound,
    handle: handleBound,
    navigate: navigateBound,
  };
}
