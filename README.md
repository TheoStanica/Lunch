
# Lunch

Lunch is a React Native application used to better manage lunch orders for companies that have contracts with different restaurants.



## Prerequisites

- [Node.js](https://nodejs.org) and npm
- [Mobile Development environment](https://reactnative.dev/docs/environment-setup)
- [Firebase Project](https://firebase.google.com/)

## Folder Structure

This aplication has the following structure:

### Backend

- `src`: This folder is the main container of all the code inside the application.
  - `errors`: This folder contains all error types generated by the application.
  - `jobs`: This folder contains cron jobs to send notifications to users.
  - `middleware`: This folder contains all application's middlewares.
  - `utils`: This folder holds multiple utility and helper functions and variables.
  - `device/menu/order/restaurant/user` - These folders contain:
    - `controller`: Stores all the business logic.
    - `model`: Describes the object schema.
    - `routes`: API endpoints.


### Mobile

- `src`: This folder is the main container of all the code inside the mobile application.
  - `api`: This folder contains a file that builds the axios instance used across the application.
  - `assets`: Asset folder to store all images, vectors, etc.
  - `components`: Folder to store any common component used inside the application.
  - `hooks`: Folder to store any common hook used inside the application.
  - `navigation`: Folder to store the navigators.
  - `redux`: This folder holds all Redux related files.
    - `actions`: This folder contains all actions that can be dispatched to redux.
    - `reducers`: This folder should have all the reducers used inside the application.
    - `thunks`: This folder contains all redux thunks.
  - `screens`: Folder that contains all application's screens.
  
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file.

### Backend

`PORT` - The port on which the server will run on.
`MONGO_CONNECT` - MongoDB connection URI used to connect to a MongoDB deployment.   
`ACCESS_TOKEN_SECRET` - JSON Web Access Token Secret (JWT).  
`ACCESS_TOKEN_LIFE` - JSON Web Access Token Life measured in milliseconds (JWT).  
`REFRESH_TOKEN_SECRET` - JSON Web Refresh Token Secret (JWT).  
`REFRESH_TOKEN_LIFE` - JSON Web Refresh Token Life measured in milliseconds (JWT).    
`ACTIVATION_TOKEN_SECRET` - JSON Web Token Secret used to activate an account when a user registers.   
`ACTIVATION_TOKEN_LIFE` - JSON Web Token Life measured in milliseconds.  
`GMAIL_USER` - Gmail address used to send emails.  
`GMAIL_PASS` - Gmail password.  
`HOST_URL` - Server's IP address/URL used to generate correct links in emails.   
`FIREBASE_CREDENTIALS` - Firebase project settings service account (Firebase Admin SDK). 
  
 ### Mobile 

 - Add your Firebase Messaging Project `google-services.json` file inside `./Mobile/android/app/google-services.json`.   
 - Modify `baseURL` link with your server's IP/URL in `./Mobile/src/api/buildClient.js`
## Run Locally

Clone the project

```bash
  git clone https://github.com/TheoStanica/Lunch
```

### Backend

Go to the project directory

```bash
  cd ./Backend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

### Mobile

Go to the project directory

```bash
  cd ./Mobile
```

Install dependencies 

```bash
  npm install
```

Install the dependencies as specified by the pod file in the Xcode project folder

```bash
  cd ios && pod install
```

Start the application  
Android
```bash
  npm run android
```
iOS 
```bash
  npm run ios
```
