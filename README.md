# ABC Restaurant

> This website provide general information of a restaurant and also a [__Dynamic Food Menu and Posts__] which can be updated easily.

> Live demo [_here_](https://abc-restaurant.netlify.app).

## Table of Contents

- [General Info](#general-information)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Setup](#setup)
- [Acknowledgements](#acknowledgements)
- [Contact](#contact)

## General Information

- The purposes of a restaurant website is to increase the exposure and provide general information to the client in an organised and attractive way.
- [__Dynamic Menu__] - allow the admin of website to add, delete and update items on menu based on what they serve on that day or simply updating the price.
- [__Dynamic Posts__] - allow the admin of website to update the status of the restaurant by posting their new dishes, events , etc.

## Technologies Used

- HTML5, CSS3, JavaScript
- Bootstrap
- React
- Node - version 14.15.3
- Redux

## Features

- After logging in and navigate to the Menu tab, user can click on the new and delete buttons to create and delete data.
![Dynamic Menu](https://s2.im.ge/2021/06/18/o38tD.png)

- Clicking on new button or the name of the item will navigate user to a form to edit data.
![Item Form](https://s2.im.ge/2021/06/18/o3ZFC.png) 

- In the News tab, user can create, delete and edit post. Clicking on the edit button will navigate user to Post form to edit data.
![Dynamic Post](https://s1.im.ge/2021/06/18/o3Kjq.png)

## Setup

1. Open 2 separate terminals
2. In terminal 1,
```
git clone https://github.com/yinhang1107/restaurant_project.git
cd restaurant_project/client
npm i
```
3. In terminal 2,
```
cd restaurant_project/server
npm i
```
4. Open the project via VS code and navigate to /client/src/config.json, replace the existing baseURL with your baseURL.
5. Then navigate to /server/config/default.json, enter your mongoDB connection url to "db".
6. Finally, on both terminal 1 and 2, run npm start.

## Acknowledgements

- This website design was inspired by [@https://basil-demo.squarespace.com/?nochrome=true](https://basil-demo.squarespace.com/?nochrome=true)

## Contact

Created by [@yinhang](https://yinhang.netlify.app/) - feel free to contact me!
