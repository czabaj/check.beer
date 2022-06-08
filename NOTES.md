# Notes

What needs to be remembered, what needs to be done and all other temporary important stuff.

## Yarn2

- When the installation reports an dependency mismatch or similar error, add entry to the `.yarnrc.yml` file.

## TODO

- [X] consider switch to react and utilize concurrent mode,
- [ ] consider use [vite-plugin-ssr](https://vite-plugin-ssr.com/filesystem-routing) which maintains filesystem routes,
- [ ] check how code-splitting works in vite-plugin-ssr or build up own solution,
- [ ] add PWA functionality,
- [X] add support for offline mode,
- [X] ditch the @linaria css-in-js for something other? The main drawbacks of @linaria are
  - bug in vite plugin disallowing importing of styles from typescript files (unsupported syntax when the file contains typescript specific syntax) and overall slightly complicated tooling,
  - linaria does not suports a `@extends` known from Sass, which reduces bundle size significantly while reusing the style rules. Overall, the Sass has more mature features. The `@extends` could be modeled in plain CSS (and also in @linaria) with `:is` and `:where` pseudo selectors, but it is more tedious and error-prone.
  - css-in-js is hard, it mix the JS with CSS which solves some problems, but also allows to complicate all the stuff and requires skills and discipline to hadnel the code. I'm not sure weather the benefits of css-in-js overweights the increase of complexity.
