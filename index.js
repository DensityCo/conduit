var pathToRegexp = require('path-to-regexp');
var debounce = require('lodash.debounce');

// Check a path against internal route list
export function checkPath (routes, path) {
  return routes.reduce(function (acc, next) { 
    return next.regexp.test(path) ? next : acc;
  }, null);
}

// Add a route to the provided collection
export function addRoute(routes, path, action) {
  var keys = [];
  routes.push({
    path: path,
    keys: keys,
    regexp: pathToRegexp(path, keys),
    generate: pathToRegexp.compile(path),
    action: action
  });
}

// Helper to handle navigation events
export function handle(routes, store, path) {
  path = path || window.location.hash.slice(1).replace(/(^\/|\/$)/, '');
  var route = checkPath(routes, path);
  if (route) {
    const params = route.regexp.exec(path).slice(1);
    const action = route.action.apply(route, params);
    if (action) {
      store.dispatch(action);
    }
    return true;
  } else {
    console.warn('Route to ' + path + ' not found!');
    return false
  }
}

export function redirect(url) {
  return () => {
    window.location.href = url;
  }
}

// Programmatically "navigate" (just sets window.location.hash)
export function navigate(routes, path, params) {
  var route = checkPath(routes, path);
  if (route) {
    window.location.hash = '/' + route.generate(params);
    return true;
  } else {
    console.warn('Path not found. Make sure it has been added with `addRoute()`');
    return false;
  }
}

// Create a router instance
export default function createRouter(store) {

  // Array of routes
  var routes = [];

  // Bind helpers to this instance
  var addRouteBound = addRoute.bind(this, routes);
  var handleBound = handle.bind(this, routes, store);
  var navigateBound = navigate.bind(this, routes);

  // Listen for hash changes
  window.addEventListener('hashchange', debounce(function (event) {
    handle(routes, store);
  }, 250, {leading: true}));

  // Public API
  return {
    routes: routes,
    addRoute: addRouteBound,
    handle: handleBound,
    navigate: navigateBound,
  };
}
