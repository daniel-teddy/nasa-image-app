### NASA Image App
Welcome to the NASA Image App! This app allows users to search for and view images from NASA's extensive collection. It is built using React, a popular JavaScript library for building user interfaces.

## Getting Started
To get started with the NASA Image App, simply clone this repository to your local machine:


### `git clone https://github.com/teddy-webdev/nasa-image-app.git`
After cloning the repository, you'll need to install the necessary dependencies:


### `npm install`
Once the dependencies are installed, you can start the development server:


### `npm start`
This will start the app in development mode and open it in your default browser.

## Usage
To use the app, simply enter a search query in the search bar and click the "Search" button. The app will then display a list of images that match your search query. You can click on an image to view more information about it.

The NASA Image App is built using React, which provides a component-based approach to building user interfaces. Here are some key concepts to keep in mind when working with this project:

### Components: 
React organizes the UI into reusable components. Each component manages its own state and lifecycle. In this app, you will find components such as Home and ItemPage that handle different aspects of the user interface.

### State: 
Components in React can have state, which represents the data that can change over time. The useState hook is used in this app to manage state variables like images, query, and showImages.

### Lifecycle: 
React components have lifecycle methods that allow you to perform actions at different stages of the component's existence. The useEffect hook is used in this app to fetch data from NASA's API and update the state based on certain conditions.

### Routing: 
React Router is used in this app to handle routing and navigation. The react-router-dom package is included as a dependency and is used to define routes and render different components based on the URL.

## Contributing
If you'd like to contribute to the NASA Image App, feel free to submit a pull request. Before submitting your pull request, be sure to run the linter to ensure that your code adheres to our code style guidelines:


### `npm run lint`
If you're unsure about the code style guidelines, please refer to our ESLint configuration.

## Issues
If you encounter any issues while using the NASA Image App, please submit a GitHub issue here.

## License
The NASA Image App is released under the MIT License.




