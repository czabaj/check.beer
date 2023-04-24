# check.beer

A web application for "home pub" management. It solves problems:

- what beer is on which tap,
- how many beer is left in the kegs,
- how many kegs there are in the storage,
- who paid for which keg (who owns it),
- who draft a beer and what kind (which tap),
- how many beer was actually taped from the keg until it was depleted and budget the depleted kegs among its consumers,
- settle accounts between keg owners and consumers (consumers can pre-paid consumptions).

## History

This concept originates from a Android application BeerBook, which I developed years ago and never released publicly. It serves well for its users, although it has a few drawbacks, namely no cloud backup of the data and tricky release management, requiring me to backup data and deploy the app over a wire.

## Developer philosophy

This project is also my personal playground for experiments. I seek for an optimum between

- developer productivity - use TypeScript, lightning fast live-reload, prefer well maintained and well documented libraries,
- simplicity - the best library is no library at all, use just what is necessary for the job,
- performance - keep an eye on a bundle size, co-locate the state updates with vDOM changes,
- accessibility - use minimal, well written HTML markup with a11y best practice, idealy, handle the visual appearance with CSS only (which is hard and not always possible).

For learning purposes, I omit IU library. Using UI library would help develop screens rapidly, but it hides the complexity which I intentiously want to solve on my own. Also, most of the UI libraries brings in their own css-in-js solutions and other dependencies and I dont want to learn new library API, rather imrove my bare HTML and CSS skills.
