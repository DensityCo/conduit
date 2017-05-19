let a: string = "foo";

import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import createRouter from '@density/route-js';

const store = createStore(() => "test", "test", compose(
  applyMiddleware(thunk),
  (window as any).devToolsExtension ? (window as any).devToolsExtension() : f => f
));

const slash = () => ({type: "SLASH"});
const foo = () => ({type: "FOO"});
const bar = () => ({type: "BAR"});

const router = createRouter(store);

router.addRoute("", {dispatch: slash});
router.addRoute("foo", {
  beforeTransition: () => {
    return {type: "DISPATCHED_BEFORE_URL_CHANGE_TO_FOO"}
  },
  transition: foo,
  afterTransition: () => {
    return {type: "DISPATCHED_AFTER_URL_CHANGE_TO_FOO"}
  },
  beforeNextTransition: () => {
    return {type: "DISPATCHED_BEFORE_URL_CHANGE_TO_SOMETHING_ELSE_FROM_FOO"}
  },
});
router.addRoute("bar", {transition: bar});

router.handle()
