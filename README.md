# todo-app
Simple todo list app working with angular and nodejs to train myself.

## How to install
- run `git clone https://github.com/Osmos-l/todo-app.git`
- move into clone/frontend
- run `npm install` then `npm run`
- launch application by `ng serve`
- move into clone/backend
- run `npm install` then `npm run`
- Configure config.json file with your mongodb credentials
- launch application by `node index` or `nodemon index`

## TODO:

Frontend:
- Form create task
- User profil => password / username
- Dark Theme
- i18n
- PurgeCss

Backend:
- User profil ( put, delete ) => password / username
- i18n

Shared:
- Refresh token

## API ROUTING

Auth:
- POST /api/auth/login  (to edit => should be get)
- POST /api/auth/signup

Task:
- POST      /api/task/
- GET       /api/task/:owner
- PUT       /api/task/:id
- DELETE    /api/task/:id

## Screenshots: 
![Login](https://user-images.githubusercontent.com/36885114/110238992-e1ef6b80-7f44-11eb-985f-3edc05495758.png)
