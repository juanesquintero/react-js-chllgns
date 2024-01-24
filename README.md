# Social Media: Query Interests

## Introduction

Your task is to implement the function `SocialNetworkQueries#findPotentialInterests(minimalScore)`
per the requirements and make tests pass.

```typescript
class SocialNetworkQueries {
    constructor(input: { fetchCurrentUser: () => Promise<User> });
    async findPotentialInterests(minimalScore: number): Promise<string[]>;
}

type Rating = {
    title: string;
    score: number;
};

type User = {
    id?: string;
    ratings?: Rating[];
    friends?: Array<{
        id?: string;
        ratings?: Rating[];
    }>;
};
```

## Problem Statement

For current user `SocialNetworkQueries#findPotentialInterests(minimalScore)` should return a `Promise` which resolves with an array of book titles, which are considered as potential interests. If a book is a potential interest it means there is a chance user will enjoy such title too because it is rated by some of their friends.


### Computing potential interests

* A book is considered a potential interest if it is rated by at least one of the user's friends, and each user will give it a `score`. Then the recommendations can be limited by a `minimalScore`. (eg. if the minimal score is `0.5`, this is the minimal average score a given book must have to be recommended).

* A book is **not** considered a potential interest if it is already rated by a user.

### Ordering of potential interests

* A book with a higher average score (rated by more friends) should be placed before a book with a lower score.

* In case of same scores titles should be ordered alphabetically. **Important:** to make sure your implementation matches the one expected in tests please use `title1.localeCompare(title2, "en", { sensitivity: "base" })` to compare titles of 2 books.

### Caching

Assuming you use the same instance of `SocialNetworkQueries` for more than 1 `findPotentialInterests` call: 

* In the case of `fetchCurrentUser` resulting in a rejected promise the last known user data should be used instead for computing potential interests' ...

* … unless no successfully fetched user data exists. In such case `findPotentialInterests` should output empty results (`[]`). 

### Not-so-happy paths

* If a user has no field required to compute potential interests, `findPotentialInterests` should resolve with empty results (`[]`). Eg. if there is no `friends` field in a user.

* If some friend has no `ratings` field, `findPotentialInterests` should ignore such friend when computing potential interests.

* If a book is listed more than once for given friend, it should only consider the occurrence with the greater score.
 
### Input

#### `fetchCurrentUser(): Promise<User>`

`fetchCurrentUser` is a function which returns a `Promise`,
either resolved or rejected. The resolved `Promise` contains
user data in form of:

```json
{
    ratings: [
        {
            title: <string>,
            score: <number>
        }
    ]
    friends: [
        { 
            id: <string>,
            ratings: [
                {
                    title: <string>,
                    score: <number>
                }
            ]
        },
    ]
}
```

The field `ratings` contains books rated by the current user. The fields `friends[…].ratings` contain books rated by each friend of the current user.

#### `minimalScore`

`minimalScore` is a float (type of number) between 0 and 1 used to limit computed potential interests for the current user. It represents the minimal average score of a book which should be considered as a potential interest.

Examples:

* `minimalScore` of `0` means all books rated by any of friends has to be considered as potential interests;
* `minimalScore` of `1` means given book must have a max rating of `1` in all user ratings to be considered as a potential interest;
* `minimalScore` of `0.5` means a given book must have at least a `0.5` average friend's score to be considered as a potential interest;

Note: `minimalScore` default value should `0.5` if not defined.

### Example

Let's assume that user data returned in a resolved promise of `fetchCurrentUser` resembles the following …

```json
{
        id: "mrouk3",
        ratings: [
          { title: "Moby Dick", score: 0.6 },
          { title: "Crime and Punishment", score: 0.8 }
        ],
        friends: [{
          id: "YazL",
          ratings: [
            { title: "Crime and Punishment", score: 0.8 },
            { title: "Brave New World", score: 0.4 }
          ],
        }, {
          id: "queen9",
          ratings: [
            { title: "Pride and Prejudice", score: 0.8 },
            { title: "Crime and Punishment", score: 0.5 }
          ],
        }, {
          id: "joyJoy",
          ratings: [
            { title: "Moby Dick", score: 0.2 },
            { title: "Pride and Prejudice", score: 1 }
          ],
        }, {
          id: "0sin5k1",
          ratings: [
            { title: "Pride and Prejudice", score: 0.8 },
            { title: "Brave New World", score: 0.2 }
          ],
        }, {
          id: "mariP",
          ratings: [
            { title: "Moby Dick", score: 0.8 },
            { title: "Frankenstein", score: 0.8 },
            { title: "Crime and Punishment", score: 0.4 }
          ]
        }],
}
``` 

… then if we perform a query with the minimal score of  `0.5` …

```js
const socialNetworkQueries = new SocialNetworkQueries({ fetchCurrentUser });
socialNetworkQueries.findPotentialInterests(0.5)
    .then(potentialInterests => {
        // …
    });
```

… returned `potentialInterests` will be

```json
[
    "Pride and Prejudice",
    "Frankenstein",
]
```

## Setup

Follow these steps if you are using zip/git mode (i.e. not available inside in-browser IDE):

1. `npm install` – install dependencies
2. `npm test` – run all tests (this will be used to evaluate your solutions)
3. `npm run test:watch` – run all tests in _watch mode_ (alternative to `npm test` which you might find more convenient to use locally)
4. `nvm install` - (optional) set up the expected _major_ version of Node.js locally ([`nvm`](https://github.com/nvm-sh/nvm) required; Node.js version defined in `.nvmrc` file)

**Good Luck!**



# Conference Admin Panel

You are creating an [MVP](https://en.wikipedia.org/wiki/Minimum_viable_product) of a conference admin panel.

This task uses **React Hooks**, **React Router** and **React Testing Library (`@testing-library/react`)**.

This app was created with [CRA](https://create-react-app.dev).

## Introduction

Your task is to complete the simple conference admin panel application to enable the conference Committee Members to manage the `Call for Papers` process:
  - make all tests pass by implementing missing features in the production code.
  - make the app work in a way described below.  The majority of the code is committed but there are some missing pieces to implement.
  - you shall stick to the names of the props and components, so that tests don't break.

## Problem Statement

You are expected to implement missing code used within two subpages:
  - `<ProposalListPage>`: list of available talk proposals (`ConferenceTalkProposal`). They can be accepted or rejected by the conference Committee. Clicking on a given proposal redirects to its details.
  - `<ProposalDetailsPage>`: displaying talk details (`ConferenceTalkDetails`). Clicking the _"back to Call for Papers"_ button redirects to the proposals list.

### 1. List of proposals

`<ProposalListPage>` should be rendered under `/proposals` URL path and display list of proposals fetched from API (without any sorting nor paging applied).

1. For every proposal following data should be rendered:
  - talk title,
  - speaker's name,
  - talk category, prefixed with `category: `,
  - status description: _"rejected"_, _"accepted"_, _"to be decided"_ or _"(unknown)"_ (for any unexpected status), prefixed with `status: `. You need to map existing statuses into these descriptions,
  - color bar and label indicating whether the proposal was accepted (green), declined (red), or not decided yet (neutral),
  - button to accept proposal (if not accepted),
  - button to reject proposal (if not rejected).

  The Fake API will preserve changed status of the proposal as long as a user doesn't refresh a page in a browser (navigate inside the app instead).

1. CSS class of the listed proposal has to match its status.

2. Every proposal should be clickable and should navigate on click
    to its `<ProposalDetailsPage>`.

3. Clicking on the accept or reject buttons should send an API request to change the  proposal status to `"accepted"` or `"rejected"` respectively. Proposal status on the list should be updated accordingly.

  The accept button should have a class name similar to that of reject button (already present in the code).

4. `<Loading>` should be rendered during data fetch.

5. Note that you cannot obtain a full set of required data from just one API endpoint – you cannot change the fact that proposals' data is a subset of `/talks` endpoint's response while their statuses come from `/callForPapers` endpoint.

### 2. Proposal details

`<ProposalDetailsPage>` should be rendered under `/proposals/:proposalId` URL path (where `proposalId` is ID of such proposal) and display details fetched from API.

1. Details to render are:
   - speaker's name,
   - talk category,
   - talk title,
   - talk description – split into separate `<p>` for each paragraph (on `\n` character),
   - button which navigates back to `<ProposalListPage>`.

2. `<Loading>` should be rendered during data fetch.

3. `<NotFound>` should be rendered if there is no proposal for a given `proposalId`.

### Fake Backend

Please, be aware there is no real backend behind the app. When starting the application (`npm start`), the app will automatically register a fake backend API defined in `src/api/fakeHttpApi.js`. In order to make HTTP requests, methods from `src/api/httpApi.js` should be called. HTTP requests have random latency simulated – you can expect them to take from 0 to 2 seconds.

In tests, all requests are mocked using `axios-mock-adapter`.

### Hints

1. Changes have to be done in:
   - `src/App.jsx`,
   - files inside `src/proposals/` and its subdirectories.
2. Mock objects are created using functions in the `src/api/mocks.js` file. Each function creates objects with proper structure, allowing to specify only relevant properties (leaving all the rest filled with defaults).
3. For your convenience, **precise model** is described below. Please pay attention to which data structures are used where:

```ts
type ProposalStatus = "accepted" | "rejected" | "pending" | "unknown"

interface ConferenceTalk {
  readonly id: string;
  readonly title: string;
  readonly speaker: string;
  readonly category: string;
}

interface ConferenceTalkDetails extends ConferenceTalk {
  readonly description: string;
}

interface ConferenceTalkProposal extends ConferenceTalk {
  readonly status: ProposalStatus;
}

interface CallForPapers {
  readonly byTalkId: {
    readonly [talkId: string]: {
      readonly status: string;
    }
  };
}
```

## Setup

Follow these steps for correct application setup:

1. `npm install` – install dependencies
2. `npm test` – run all tests (should fail unless you fix the app)
3. `npm start` – serve the app at [http://localhost:3000/](http://localhost:3000/) (it automatically opens the app in your default browser)

There is also the `npm run test:watch` command available that starts the `jest` test runner in the watch mode. It enables choosing tests that are related to modified files only.

**Good Luck!**



# React Notepad

Notes application provides a simple list of notes.

This task uses **React Hooks** and **React Testing Library (`@testing-library/react`)**.

This app was created with [CRA v4.0](https://github.com/facebook/create-react-app).



## Introduction

Your task is to complete simple notes application using provided `NotesService` to retrieve and update notes:
- you can choose to implement the task with either class of function React components. The tests don't check the type of components.
- you shall stick to the names of the props, so that tests don't break.
- all tests have to pass.

## Problem Statement

- Notes application should provide a simple list of notes where each note contains `id`, `title` and `text` attributes.
- Notes application should let the user make a new note or to update an existing one.
- When a new note button is clicked, an empty form should be given to the user that will append a new note to the array of existing notes.
- When an existing note is selected, the user has options to:
  - save - which will update the selected note with new `title` and `text`
  - cancel - which will deselect the note
- When there are no notes selected, `New Note` button should be displayed to the user as an option.

### 1. App and NotesService

- `NotesService` that's passed as `service` prop to `App` component should be used
- When a form is submitted, async `saveNote` method should be called on service with the updated note
- When `App` is created, async `getNotes` method should be called on service and the appropriate component show notes as a list
- When a new note is added, it should be displayed on the list
- *New Note* button should be displayed if no notes are currently selected
- *New Note* on click should call `newNote` method that puts an empty note object as a selected one
- When an existing note is saved, it should be updated on the list

### 2. Note Form

- `NoteForm` should be a stateless component. Use the `note` prop for data
- When the selected note is provided via `note` prop, title and note input fields should be populated
- When *Cancel* is clicked, tbe selected note should be reset
- When any field value changes, it should call `onChange` prop with tbe updated note object that will update the selected object appropriately
- When the form is submitted, it should call `onSubmit` with updated note object
- `onSubmit` will then use the appropriate service method and update the state accordingly

### 3. Use `NotesServices` to populate the list of notes

- Each item in the list should show a note title
- List component should not keep state, use `notes` prop
- List component should notify its parent on item click with `onSelect` prop
- When note component gets passed a note via `selected` prop, it should add `active` class to the correct list item

## Setup
Follow these steps for correct application setup :

1. `npm install` – install dependencies
2. `npm test` – run all tests (should fail unless you fix the app)
3. `npm start` – serve the app at [http://localhost:3000/](http://localhost:3000/) (it automatically opens the app in your default browser)

**Good Luck!**

