This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Git Search

The GitSearch project is a React app that is used to search any public git repository and display the commits count group by week in graph display. User can add multiple repositories and compare the commits. User has ability to remove any added repository.

## Outputs
To install dependencies, sue `npm install`.
To develop these locally, use `npm run start`. 
Check `package.json` for all commands and info related to these outputs.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

## Rematch / Redux

This project uses rematch as an alternative to vanilla Redux. It is essentially a Redux without most of the boilerplate. A good intro is at https://rematch.gitbooks.io/rematch/ . With rematch, a `model` takes the place of a `reducer`, and `reducers` now represent what would have been functions inside redux reducers. Essentially, Rematch is Redux without action creators or switch statements.

In terms of splitting up data, we want to go with the normalized approach outlined at https://redux.js.org/recipes/structuringreducers/normalizingstateshape to try to only have a single point to store and access data used throughout the app.

We use the `connect` method from `react-redux` to bind rematch models and reducers to components. When using `connect`, take care not to blindly connect everything in a model to the component, as that will cause the component to re-render needlessly. Additionally, try not to dynamically create objects and lists inside of the `connect` methods for the same reason.


## Styling

Lately I have been using `styled-components` instead of regular CSS to style my elements and React components. I find that it is much simpler than managing regular CSS. https://www.styled-components.com/ . There are still many legacy places that are using regular .css, but I've been replacing them with `styled-components` during bug fixes and refactoring.

## Localization
For localization `i18next-react` and `i18next` is used. For scanning all the keys for localization `i18next-scanner` is used.

## Test for Localization
To test localization is working, go to the `./src/18n.js` and change `lng: "en"` to `lng: "nb"`.
nb is a localization test file which has all key values as `X` so that we can test if anything is missing from localization.
