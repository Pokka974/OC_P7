
# Groupomania

An online software tool that facilitate online groupwork. 
Entreprise Social Network inspired by Facebook/Workplace Design.
This project is part of the Openclassroom bootcamp process.



![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)



## Installation

Install all the dependencies with npm and how to run it on localhost

Add a .env file inside the back/ folder as such:

```bash
NODE_ENV="test"
SECRET_KEY=""
CI_DB_USERNAME="" (postgres by default)
CI_DB_PASSWORD=""
CI_DB_NAME=""
```

```bash
  cd back/
  npm install
  (Make sure to link a database or to have a .env file)
  npm run start
  
  cd ..
  cd front/
  npm install
  npm start
```
    
## Features
All of theses features are persistent with RESTful API and Postgresql/Sequelize database
- Signup/Login
- Post feed
- Post something with or without images
- Modify Post's content
- Comment posts and comments
- Like posts and comments
- Edit your profile picture
- Delete your account
- Logout


## Demo
![Alt Text](https://media.giphy.com/media/EBIyOIRUAcWqysqMvD/giphy.gif)
![Alt Text](https://media.giphy.com/media/NQ7o0BmaJ8VrbVjjDl/giphy.gif)

