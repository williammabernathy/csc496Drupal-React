[![Coverage Status](https://coveralls.io/repos/github/williammabernathy/csc496Drupal-React/badge.svg?branch=master)](https://coveralls.io/github/williammabernathy/csc496Drupal-React?branch=master) 
[![Build Status](https://travis-ci.org/williammabernathy/csc496Drupal-React.svg?branch=master)](https://travis-ci.org/williammabernathy/csc496Drupal-React)

# CSC 496 Recipe Website

## Introduction
This website was built as a learning process for the class CSC 496 Senior Seminar. The idea behind this project was to learn Git, Continuous Integration, Testing and working with an API (Drupal).

## Installation
To run, clone the repo either directly from this github repository, or via command line:
```
git clone https://github.com/williammabernathy/csc496Drupal-React
```

Open the project in an IDE or navigate to the repo directory using a terminal. Once in the root directory, run:
```
npm install
```
This will set up all necessary dependencies. After install, you may run the project in developer mode using the command:
```
npm start
```
### Example
1. Open the cloned repo folder using Visual Studio Code.
2. Click "Terminal" and open a new terminal
3. Ensure the current directory is the root of the cloned repo (Ex: ```C:\Users\Will\Documents\csc496Drupal-React```)
4. Run 
    ```
    npm install
    ```
5. Once installation completes, run:
    ```
    npm start
    ```
    The project should now be running a development environment locally (Ex: localhost:3000).
## Testing
To test, ensure you are currently in the working directly via a terminal or IDE file explorer. From there, to run tests, simply issue the command:
```
npm test
```
This project uses jest and enzyme to execute tests, so ensure they were installed under "devDependencies" in ```package.json```
