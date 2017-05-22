# Contributing

This project has a build process to transpile es2015 code down to es5 prior to release.
Feel free to use as much as2015 (and object spread) in your source as you'd like.

## Commit messages
All Density web projects strive to use [symantic commit messages](https://seesparkbox.com/foundry/semantic_commit_messages). In particular, we make use of the prefixes:
- `code`
- `chore`
- `docs` - indicates a non-code update to documentation, such as a README change.
- `test` - indicates updates to test code.
- `slug` - indicates a useless commit, such as causing a ci rebuild. These should be rebased together prior
  to merging if at all possible.
- `design` - indicates stylesheet changes or other visual updates

In addition, an optional second tier of description can be added if helpful with parenthesis. This
is usually used to provide context on a code update, a chore, or a slug.

### Examples
```
code: cleaned up extra ajax actions, clear spaces explicitly on set organization
code(test): added test for foo, bar, abz baz
docs: add ci readme badge
slug: ci update
design: adjust vertical padding on cards
```

## Publishing
We've configured CircleCI to automatically publish any changes to our npm registry. Just check in
and push up a new change to `master`!

If you'd like to publish manually, simply run `make publish`. Make will transpile your source and
put the output in `dist/index.js`. Then, it'll publish your changes to npm.

If you'd like to make a build but not publish, run `make build`. Also, `make clean` is a thing too.
