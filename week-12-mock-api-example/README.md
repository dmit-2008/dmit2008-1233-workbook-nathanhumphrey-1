# Next.js React Testing with Fetch Calls.

# Why?

Most of our applications will use fetch, and we only want to test code that we write. This means that we don't test any external packages that we import or any rest API calls we may make.

# Steps

1. Let's install Jest (like the last example) so that we can test our application [docs here](https://nextjs.org/docs/app/building-your-application/testing/jest).

- install the required packages

```
npm install --save-dev jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom
```

- at the base of your project create a file named `jest.config.js` and add the following contents to it.

```js
const nextJest = require('next/jest');

/** @type {import('jest').Config} */
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(config);
```

- in the `package.json` file add entries in the script named "test" and "test-watch" to run "jest"

```json
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "jest",
    "test-watch": "jest --watch"
  },
```

The command `npm run test-watch` will continue to run the tests as we change them. Run this now and we'll see that there's no tests, so we'll go write one!

2. Install the mock server worker so we can "mock" out the calls to quotable.io.

```
npm install --save-dev msw
```

msw relies on having access to node.js globals, which jest robs you of (see more here: https://mswjs.io/docs/migrations/1.x-to-2.x#frequent-issues). To get around this issue, install the `jest-fixed-jsdom` package (see https://github.com/mswjs/jest-fixed-jsdom):

```
npm install --save-dev jest-fixed-jsdom
```

Now, we need to instruct jest to use this new test environment. Update `jest.config.js`:

```js
...
testEnvironment: 'jest-fixed-jsdom',
testEnvironmentOptions: {
    customExportConditions: [''],
  },
...
```

We are ready to write some tests.

4. Create a `Home.test.js` in a newly created folder named `tests` that's at the root of the application, setup the mock service worker `msw` package and import our testing requirements.

- create the file `tests/Home.test.js`
- in the file import the following

```js
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { BASE_URL, RANDOM_QUOTE_URL } from '../utils/quote-manager.js';

import Home from '../pages/index.js';
```

- create some constants for our tests

```js
const AUTHOR = 'Jane Doe';
const QUOTE = 'A famous quote';
```

- configure the necessary handlers for our test server. We need to define a route for fetching a random quote, and for checking for the existence of a matched saved quote in the backend

```js
// Require handlers for both quotable and the backend server
const handlers = [
  http.get(RANDOM_QUOTE_URL, () => {
    return HttpResponse.json({
      _id: 'some-random-id',
      author: AUTHOR,
      content: QUOTE,
    });
  }),
  http.get(`${BASE_URL}?author=${AUTHOR}&quote=${QUOTE}`, () => {
    return HttpResponse.json(false);
  }),
];
```

- setup the server so that it begins to listen `beforeAll` of the tests and closes `afterAll` of the tests are done.

```js
const server = setupServer(...handlers);

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});
```

Note:
Here we use `setupServer` with one argument, if you wanted to handle multiple requests just keep on adding them as different arguments. You could also add of the `rest` requests in an array and then spread that array in the `setupServer` as arguments.
See that `beforeAll` will be called before all the `test`s
See that `afterAll` will be called after all the `test`s

5. Let's write a test that will wait for the `useEffect` to render our first load of the `Home` component.

```jsx
describe('Home page component', () => {
  test('Loads a random quote on mount', async () => {
    // wait for the home piece to render.
    await act(() => {
      render(<Home />);
    });
    // get the author and quote element
    let quoteElement = screen.getByTestId('quote');
    let authorElement = screen.getByTestId('author');

    // check to see that they are equal to the new values.
    expect(quoteElement).toHaveTextContent(QUOTE);
    expect(authorElement).toHaveTextContent(AUTHOR);
  });
});
```

This is using an `act` function because it needs to wait for the `useEffect` to fire on mount.

NOTE: this needs to be an "async" function that "awaits" the act or you'll struggle.

6. Let's write a test that checks that the quote is changed in the `Home` component after the fetch button is clicked.

```jsx
test('Loads a new random quote when "Get a Quote" button is clicked', async () => {
  // wait for the home page to render
  await act(() => {
    render(<Home />);
  });

  // define new values
  const NEW_AUTHOR = 'Clark Kent';
  const NEW_QUOTE = 'Up, up, and away!';

  // create a new request with the new quote and author
  server.use(
    http.get(RANDOM_QUOTE_URL, () => {
      return HttpResponse.json({
        _id: 'some-random-id',
        author: NEW_AUTHOR,
        content: NEW_QUOTE,
      });
    })
  );

  // get the button element
  let buttonElement = screen.getByTestId('new-quote-button');

  // click the new button and wait for the state to change
  await act(() => {
    buttonElement.click();
  });

  // get the author and quote elements
  let quoteElement = screen.getByTestId('quote');
  let authorElement = screen.getByTestId('author');

  // check to see that they are equal to the expected values
  expect(quoteElement).toHaveTextContent(NEW_QUOTE);
  expect(authorElement).toHaveTextContent(NEW_AUTHOR);

  // remove the newly added handler
  server.resetHandlers();
});
```

First we have the `Home` component rendered with the `QUOTE` and `AUTHOR` values.
Second we mock the server to respond with the `NEW_QUOTE` and `NEW_AUTHOR` with the function `server.use()` and passing in a `http.get()` request.
Third we get the elements and "await" the button click.
Fourth we test to make sure that our component has been updated successfully.

## Conclusion

This example project walked through the steps necessary to mock out and test restful APIs in React. You may find that you need to do this a lot when developing web apps.

For more information about the MSW package, the [docs are here](https://mswjs.io/docs/getting-started).

## Exercise

Write tests for the saved quotes page component

- should expect an exact number of quotes to be loaded
