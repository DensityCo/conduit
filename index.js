import * as pathToRegexp from 'path-to-regexp';

// Keep all data for routes in this object
const routes = [];
let store = null;

// Set the store reference
export function setStore(store) {
  store = store;
}

// Add a route to the above collection
export function addRoute(path, action) {
  const keys = [];
  routes.push({
    path: path,
    keys: keys,
    regexp: pathToRegexp(path, keys),
    generate: pathToRegexp.compile(path),
    action: action
  });
}

// Helper to perform navigation
export function handle(path?) {
  path = path || window.location.hash.slice(1).replace(/(^\/|\/$)/, '');
  const route = routes.find(route => route.regexp.test(path));
  if (route) {
    const params = route.regexp.exec(path).slice(1);
    if (store) {
      store.dispatch(route.action.apply(route, params));
    } else {
      console.warn('Store not set. Make sure it has been configured with `setStore()`');
    }
  } else {
    console.warn(`Route to ${path} not found!`);
  }
}

// Helper to "navigate" (really just sets window.location.hash)
export function navigate(path?, params?) {
  const route = routes.find(route => route.regexp.test(path));
  if (route) {
    window.location.hash = `/${route.generate(params)}`;
  } else {
    console.warn('Path not found. Make sure it has been added with `addRoute()`');
  }
}

// Process first hash right away
handle();

// Listen for hash changes
window.addEventListener('hashchange', e => handle());

// Public API
export default {
  setStore: setStore,
  addRoute: addRoute,
  routes: routes,
  handle: handle,
  navigate: navigate,
}

