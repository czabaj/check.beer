This directory contains all page components, structured in filesystem directories. This is inspired by Gatsby filesystem routing, although the routing is not (yet) automatic, but probably will be in near future (see e.g. [vite-plugin-ssr](https://vite-plugin-ssr.com/filesystem-routing)).

Every folder contains:

- a `index.ts` with router setting, it imports page components and assignes them to the URL,
- a `routes.ts` with path segments for routes,
- rest of files are typically a page components.
