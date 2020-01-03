### 1. npm init -y

### 2. Setup webpack
        npm install --save-dev webpack webpack-cli

### 3. Add the following step in package.json to start and build the app
        "start": "webpack --mode development",
        "build": "webpack --mode production"  

### 4. Create a new directory src and add a new file index.js
        Add the following content in the index.js file console.log('---movieList----');
### 5. Modify the package.json 
          "main": "src/index.js",

### 6. Run the following command to start or build (this results in creation of folder dist/main.js)
         npm run build

### 7. Configuring webpack to work with React
        npm install react react-dom
### 8. We need to install the Babel compiler which compiles the JavaScript code into readable format for every browser
        npm install -D @babel/core @babel/preset-env @babel/preset-react babel-loader

        --- babel-loader is a helper so that Babel can run with Webpack and two preset packages
        --- preset packages help determine which plugins will be used to compile our JavaScript code into a readable format for browser (@babel/preset-env) and to compile React specific code (@babel/preset-react)

### 9. Next step is to configure webpack configuration. Create a file webpack.config.js in the root directory of the project. Add following lines of code in it
        module.exports = {
            module: {
                rules: [
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        use: {
                            loader: 'babel-loader',
                        }
                    }
                ]
            }
        }

        --- The configuration tells webpack to use babel-loader for every file that has the .js extension and excludes .js files in the node_modules directory for the Babel compiler
        --- actual settings for the babel-loader are placed in a separate file called .babelrc

### 10. Create a file name .babelrc in the root directory and add the following content
        {
            "presets": [
                [
                    "@babel/preset-env",
                    {
                        "targets":{
                            "node": "current"
                        }
                    }
                ],
                "@babel/react"
            ]
        }

     --- @babel/preset-env preset has options defined in it that makes sure that the compiler uses the latest version of Node.js, so polyfills for features such as async/await will still be available

### 11. Let us create a react project by adding the following line of code in index.js
        import React from 'react';
        import ReactDOM from 'react-dom';

        const App = () => {
            return <h1>Movie List</h1>
        };

        ReactDOM.render(<App />, document.getElementById('root'));        


### 12. Create a file named index.html in src folder with the following content
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Movie List</title>
        </head>
        <body>
            <section id="root"></section>
        </body>
        </html>        

### 13. Final step before rendering our React component is extending webpack so that it adds minified bundle code to the body tags as script when running. TO do this we need to install the html-webpack-plugin
        npm install -D html-webpack-plugin

### 14. Add this new package to the webpack configuration in the webpack.config.js file:
        const HtmlWebPackPlugin = require('html-webpack-plugin');

        const htmlPlugin = new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        })

        module.exports = {
            module: {
                rules: [
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        use: {
                            loader: 'babel-loader',
                        },
                    },
                ],
            },
            plugins: [htmlPlugin],
        }

### 15. Now if we run npm run start, new script tag would have been inserted in the body of index.html, Now if we open dist/index.html we will see the react code

### 16. Create a development server
        npm i -D webpack-dev-server

### 17. Modify package.json file (and then start the app)
            - "start": "webpack --mode development",
            + "start": "webpack-dev-server --mode development --open",

### 18. To enable hot reloading, change the flag --open to --hot


### 19. Now let us create a component called List in src/containers folder (container component)

### 20. Further create a functional component in React called Card within src/components 


----
### 21. Our intention is that Card component have to display the Movie information like ranking, title, year, distriutor, image, amount, etc..So we need to refactor our Card Component
        const Card = ({ movie }) => {
            return (
                <div>
                    <h2>{`#${movie.ranking} - ${movie.title} (${movie.year})`}</h2>
                    <img src={movie.img.src} alt={movie.img.alt} width='200'></img>
                    <p>{`Distributor: ${movie.distributor}`}</p>
                    <p>{`Amount: ${movie.amount}`}</p>
                </div>
            )
        }
        
### 22. Now modify the List component. Add the state data to represent the movies data and loading to indicate whether the data has been fetched from API or not
         state = {
            data: [],
            loading: true,
        }

### 23. After adding the state, let us define the logic to fetch the data from API backend for which we need to discuss the componentDidMount() method (List component)
        async componentDidMount() {
            const movies = await fetch('../../assets/data.json');
            const moviesJson = await movies.json();

            if (moviesJson) {
                this.setState({
                    data: moviesJson,
                    loading: false
                });
            }
        }

### 24. Modify the List component to support rendering the list of movies
         render() {
            const {data, loading} = this.state;

            if (loading) {
                return <div>Loading...</div>
            }
            return data.map(movie => <Card key={movie.id} movie={movie} />)
        }

### 25. Create assets folder at the root of the application and create a file named data.json. Add the json content in the file

### 26. Create media folder at the root of the application and add images file in the folder



--------------------


### 27. To use Bootstrap let us add that as dependency
        npm i bootstrap

### 28. Now add the import statement in the index.js
        import 'bootstrap/dist/css/bootstrap.min.css'

### 29. IF we try to run the application we may get an error "YOu may need an appropriate loader to handle this file type". We need to add loaders to webpack to compile the css 
        npm i -D css-loader style-loader

### 30. After that we need to add the following rules the webpack configuration in the webpac.config.js
        module.exports = {
            module: {
                rules: [
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        use: {
                            loader: 'babel-loader',
                        },
                    },
            +        {
            +            test: /\.css$/,
            +            use: ['style-loader', 'css-loader']
            +       },
                ],
            },
            plugins: [htmlPlugin],
        }
       
       ------
       Order in which loaders are added is important since css-loader handles the compilation of the CSS file and style-loader adds the compiled CSS Files to the React DOM. Webpack reads these settings from right to left and the CSS Needs to be compiled before it is attached to the DOM.

### 31. Now we can use the css class from bootstrap
        Add the appropriate class name to the App, List, Card component

---------------------------------

### 32. Install ESLint from npm by running the following command
        npm i -D eslint eslint-loader eslint-plugin-react

        ---first package eslint is the core package and help us identify any potentially problematic patterns in our JavaScript code
        --- eslint-loader is a package that is used by Webpack to run ESLint every time we update our code
        --- FInally eslint-plugin-react adds specific rules to ESLint for React applications

### 33. COnfigure ESLint by first creating a file .eslintrc.js in the project's root directory and add the following code
         module.exports= {
            env: {
                browser: true,
                es6: true
            },
            parserOptions: {
                ecmaFeatures: {
                    jsx: true
                },
                ecmaVersion: 2018,
                sourceType: 'module',
            },
            plugins: ['react'],
            extends: ['eslint:recommended', 'plugin:react/recommended']
        }

        --- env:  field sets the actual environment our code will run in and will use es6 functions in it
        --- parseOptions: fields adds extra configuration for using jsx and modern JavaScript
        --- plugins: it is the section where we specify that our code uses react as framework
        --- extends: field is where the recommended settings for eslint are used as well as framework specific settings for React

### 34. NOw we will add the eslint configuration to webpack config by adding the following loader 
           - use: {
           -         loader: 'babel-loader',
           - },

           + use: ['babel-loader', 'eslint-loader'],


### 35. NOw if you start the app you will get the following error
        ERROR in ./src/components/Card.js
        Module Error (from ./node_modules/eslint-loader/dist/cjs.js):

        /home/ubuntu/training/react/movie-list-webpack/src/components/Card.js
        3:17  error  'movie' is missing in props validation              react/prop-types
        7:25  error  'movie.img' is missing in props validation          react/prop-types
        7:29  error  'movie.img.src' is missing in props validation      react/prop-types
        7:45  error  'movie.img' is missing in props validation          react/prop-types
        7:49  error  'movie.img.alt' is missing in props validation      react/prop-types
        9:25  error  'movie.ranking' is missing in props validation      react/prop-types
        9:44  error  'movie.title' is missing in props validation        react/prop-types
        9:60  error  'movie.year' is missing in props validation         react/prop-types
        12:72  error  'movie.distributor' is missing in props validation  react/prop-types
        13:67  error  'movie.amount' is missing in props validation       react/prop-types

        ✖ 10 problems (10 errors, 0 warnings)

        @ ./src/containers/List.js 2:0-38 39:27-31
        @ ./src/index.js

        ERROR in ./src/containers/List.js
        Module Error (from ./node_modules/eslint-loader/dist/cjs.js):

        /home/ubuntu/training/react/movie-list-webpack/src/containers/List.js
        37:36  error  Missing "key" prop for element in iterator  react/jsx-key

        ✖ 1 problem (1 error, 0 warnings)

        @ ./src/index.js 3:0-37 13:42-46
        Child html-webpack-plugin for "index.html":
            1 asset


### 36. Now we need to fix this by checking the prop types in each of the component
        npm i prop-types

### 37. Add the propTypes validation in the Card component        