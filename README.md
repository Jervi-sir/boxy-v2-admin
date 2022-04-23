# server

## Info
```
-   this is admin panel of Boxy-resvona
-   will use firebase api to CRUD database firestore
-   auth required
```

## Firebase account
```
gacembekhira@gmail.com
```

## Todo

- [x] page: User Add
- [x] page: List all users
- [x] page: Show user
- [x] Requests: Add, Update, Delete User
- [x] requires in input
- [x] Modal for confirmation: delete, update
- [x] Modal for success: update, added
- [x] redirect after a delete user
- [ ] globalise Firebase Api credentials
- [ ] require Auth for access admin app
- [ ] change firebase account
- [ ] add new database
- [ ] ...

## Data structure
```
platform:
    id (manually)
    name
user:
    id (auto generated from firebase)
    name
    bio
    socials:
        platform
        name
        link
```


## Project setup
```
npm install
npm run serve
npm run build
npm run lint
```

### Customize configuration
-   See [netlify](https://netlify.com/).
-   See [firebase](https://firebase.com/).
-   See [Front side](https://github.com/Jervi-sir/boxy-v2-front).
-   See [front netify](https://boxy-resvona.netlify.app/).
-   See [admin netify](https://boxy-resvona-admin.netlify.app/).