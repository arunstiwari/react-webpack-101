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
