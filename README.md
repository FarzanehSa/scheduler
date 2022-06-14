# Interview Scheduler

## Project Description
Interview Scheduler is a SPA (Single Page Application) for tracking students interviews. The App uses React and custom hooks and allows users to add, edit and delete appointments in real time. Data is persisted by the API server using a PostgreSQL database.

## Project Features

  + Appointment days (Monday to Friday) are displayed in right side bar.
  + The available number of slots are shown in right side bar.
  + A user can switch between days and see detailed information
  + A user can book interviews by typing in a student name and clicking on an interviewer from a list of interviewers
  + A user can change the details of an existing interview by pressing the edit icon
  + A user can cancel an existing interview by pressing the delete icon, in order to cancel user has to confirm first.
  + Days display currently remaining spots and capture updates after each modification
  + By not inserting student's name or not selecting interviewer during saving proccess, error message will pop-up


## Setup
The client and the API server must be both running.

  + Forking and cloning the scheduler-api server [here](https://github.com/lighthouse-labs/scheduler-api)
  + Following it's README file.
  + Fork and clone this repo
  + Install dependencies with `npm install`.
  + Running scheduler-api server
  + Running Webpack Development Server
  ```sh
  npm start
  ```
  + 🔎 Running Jest Test Framework

```sh
npm test
```
  + 🔎 Running Storybook Visual Testbed

```sh
npm run storybook
```

### Project Stack

  + **Front-End**: React, Axios, HTML, SASS and JavaScript

  + **Back-End**: Express, Node.js and PostgreSQL

  + **Testing**: Storybook, Jest and Cypress
### Dependencies

  + Axios
  + Classnames
  + Normalize.css
  + React
  + React-dom
  + React-scripts
### devDependencies

  + Babel/core
  + Storybook/addon-actions
  + Storybook/addon-backgrounds
  + Storybook/addon-links
  + Storybook/addons
  + Storybook/react
  + Testing-library/jest-dom
  + Testing-library/react
  + Testing-library/react-hooks
  + Babel-loader
  + Node-sass
  + Prop-types
  + React-test-renderer



 