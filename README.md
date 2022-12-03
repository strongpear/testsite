# Welcome to Our Online Wallet Application

We are developing an online wallet application where user can transfer money from/to their bank account to/from our app. They can also send/request money to/from other users. The following UML diagram will demonsatrate our current process.

![UML](https://user-images.githubusercontent.com/94573189/205423626-92204198-3508-4bbb-a65e-278a5785333f.jpg)


## Deployment

Deployment for this project is done via Heroku app, which can be found at https://ghostdynos.herokuapp.com.


## Environment Setup

- Backend: JavaScript

- Frontend: React

- Database: 
  * PostgreSQL for localhost
  * Heroku database for deployment


## Getting Started

In the root folder: 
```
npm install
```
```
npm install jwt-decode
```
```
npm i axios
```
```
npm install --save sequelize
```
```
npm install --save pg pg-hstore
```

In the server folder:
```
npm i cors pg express
```


## Testing

We are using Selenium and Cucumber to develop our test cases. Installation for Selenium, Cucumber, and ChromeDriver is required. All BDD tests are located in the ***CucumberJava*** and ***cucumberjs*** folders. 

```
npm install selenium-webdriver
```
```
npm install cucumber
```
```
npm install chromedriver
```

To run the code for testing files, simply use the following command:
``` 
npm file_name.js
```
