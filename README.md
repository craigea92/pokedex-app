# Pokedex App

## Project Description

In preparation for my upcoming project, I embarked on building a fully functional website using React. Alongside this endeavor, I aimed to enhance my proficiency in SCSS, a CSS preprocessor, as well as gain expertise in working with APIs. The website boasts reusable components, including an interactive grid of Pokémon cards. Users have the ability to log in, log out, and curate their personal Pokémon list, which is securely stored in a Firebase database. Furthermore, users can effortlessly search for their favorite Pokémon and compare them. All of this data is sourced from a Pokémon API, accessed through Axios.

One of the notable challenges encountered during this project revolved around setting up the API integration and successfully retrieving the desired data. To overcome this obstacle, I utilized console logs and consulted various guides to identify and debug any issues that arose. Additionally, I faced the task of prioritizing TypeScript within the project. While I have previously utilized TypeScript in a professional environment, I encountered some difficulty when delving into the realm of typings. Hence, continuous practice with types is still necessary for further refinement.

Although this project is nearly complete, future plans include optimizing the UI to be more responsive across different screen sizes. At present, the website functions seamlessly on any laptop screen size, ensuring a satisfying user experience.

## Tech Stack

<a href="https://www.typescriptlang.org/"> <img src="https://icongr.am/devicon/typescript-plain.svg?size=40&color=currentColor" alt="typescript"/> </a>
<a href="https://reactjs.org/"> <img src="https://icongr.am/devicon/react-original.svg?size=40&color=currentColor" alt="react"/> </a>
<a href="https://redux-toolkit.js.org/"> <img height=40 width=40 src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" alt="redux-toolkit"/> </a>
<a href="https://www.npmjs.com/"> <img src="https://icongr.am/devicon/npm-original-wordmark.svg?size=40&color=currentColor" alt="npm"/> </a>
<a href="https://sass-lang.com/"> <img src="https://icongr.am/devicon/sass-original.svg?size=40&color=currentColor" alt="sass"/> </a>

## How to Install and Run

```
git clone https://github.com/craigea92/pokedex-app.git
cd pokedex-app
npm install
npm start
```

## Screenshots

<img width="1723" alt="image" src="https://github.com/craigea92/pokedex-app/assets/82875984/589857c0-4883-4ba8-8e11-8b1d67e33260">

<img width="1719" alt="image" src="https://github.com/craigea92/pokedex-app/assets/82875984/00952711-bb7f-4a6d-997c-64faa48604ca">

## How does the PokeAPI work?

I've created an asynchronous thunk function called `getPokemonData` using the `createAsyncThunk` function from the Redux Toolkit. Let's break down the code step by step.

1. The thunk function is defined with the name `getPokemonData` and it is associated with the action type "pokemon/randomPokemon".

2. The async callback function is passed as the second argument to `createAsyncThunk`. This function takes an array of `genericPokemonType` objects as its parameter.

3. Inside the function, a new array called `pokemonsData` of type `generatedPokemonType[]` is created to store the processed Pokémon data.

4. The code then enters a `for-await-of` loop, where it iterates over each `pokemon` object from the `pokemons` array.

5. Within the loop, an API call is made using `axios.get(pokemon.url)`. It fetches data from the specified URL `(pokemon.url)` and the response is destructured to extract the `data` property.

6. The `data` object is expected to have properties like `id` (a number) and `types` (an array of objects). These properties are destructured using another destructuring assignment.

7. The code then maps over the `data.types` array to extract the `name` property from each type object. It constructs a new object where the type name is used as a key and the corresponding value is fetched from the `pokemonTypes` object. The resulting array of objects is assigned to the `types` variable.

8. Next, the code tries to find the image URL for the Pokémon using its `data.id` as a key in the `images` object. If an image URL is not found, it falls back to using a default image URL from the `defaultImages` object.

9. If an image URL exists, a new object is created with properties such as `name`, `id`, `image`, and `types`, and it is pushed into the `pokemonsData` array.

10. After processing all the Pokémon, the `pokemonsData` array is returned.

11. If an error occurs during the execution of the asynchronous operations (e.g., API call or data processing), the error is caught in the `catch` block, and it is logged to the console.

## SCSS

Just like CSS, SCSS also supports the @import directive. The @import directive allows you to include the content of one file in another.

The CSS @import directive has a major drawback due to performance issues; it creates an extra HTTP request each time you call it. However, the SCSS @import directive includes the file in the CSS; so no extra HTTP call is required at runtime!

## SCSS Ampersand

The & is an extremely useful feature in SCSS. It’s used when nesting. It can be a nice time-saver when you know how to use it, or a bit of a time-waster when you’re struggling and could have written the same code in regular CSS.

"&-" can be quite useful if employing a naming methodology (i.e. BEM) which uses dash and underscore combinated classes rather than combined selectors.

## Async Functions

When a function is declared as async, it automatically returns a Promise. Inside an async function, you can use the await keyword to pause the execution of the function until a Promise is resolved or rejected. Using an async function allows you to write asynchronous code that looks and behaves more like synchronous code, making it easier to work with Promises and handle asynchronous operations in a more sequential manner.


## What is a Reducer?
In the context of Redux and Redux Toolkit, a reducer is a function that specifies how the application's state should change in response to dispatched actions. It takes in the current state and an action as arguments, and returns a new state that reflects the desired changes.

Reducers are pure functions, which means they should not modify the existing state directly, but instead create and return a new state object. Redux follows an immutable data pattern, where state updates are achieved by creating new copies of the state with the desired modifications.