# Wolf - Arte en cuero v1.0
Backoffice App made with 💖 by [Hy-An](https://github.com/nathan-hyan) & [JaqKent](https://github.com/JaqKent)

## Introduction:

Wolf is a small leather company based in Tucumán, Argentina. This app will be used to add, edit, remove all products in the marketplace (https://github.com/nathan-hyan/wolf-frontend).

Made with React + Typescript and React-Bootstrap.
Icons by [FontAwesome](https://fontawesome.com/)
This Readme is courtesy of [StackEdit](https://stackedit.io/).

*First commit: june 22, 2021*

## Libraries used:

|Library|Link|
|--|--|
|FontAwesome|https://fontawesome.com/v5.15/how-to-use/on-the-web/using-with/react| 
|ApiSauce|https://github.com/infinitered/apisauce|
|bootstrap|https://getbootstrap.com/|
|react-bootstrap|https://react-bootstrap.github.io/|
|react-notify-toast|https://github.com/jesusoterogomez/react-notify-toast|

## Sections:

**Login**: This page is restricted to an admin so this is the first page you will encounter
**Products**: When logged in, this list will show you every product in the database. Each product line will have controls for the comments, rating, content of the product, etc.
**Sales**: Every sale transaction will be here, with the purchaser name and contact number, product list ordered and a "finished" checkbox in order to keep track of every sale made.

## Requirements
This project uses enviroment variables in order to connect to the database. You can add the following line to an .env file in order to make this connection

    REACT_APP_ENDPOINT=http://localhost:2048/api/v1/