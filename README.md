# Home Library Service

Task link: [https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/rest-service/assignment.md
](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/rest-service/assignment.md)
## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Running application

### !! Rename file .env-example to .env.   

### 1. run the next command in the terminal and wait untill it fully finishes PostgreSQL migrations and application building:   
```
docker-compose up --build
```
Docker desktop must be started before the command execution (for Windows).
You also should initialize your database connection in PGAdmin (enter credentials, host, port, other properties if needed).

### 2. to run the commands inside container (type in another terminal):   
```
docker-compose exec home-library-service sh
```

and inside bash run for example (to test the application in auth mode):

```
npm run test:auth
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/api/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

### To check for logs: Logs are written to files inside container in logs folder (with size rotation functionality)
### Use the following npm script for vulnerabilities scanning:
```
npm run docker:scan
```


## Testing (for auth task use: npm run test:auth)

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging


## Usage

The application operates with the following resources:\*\*

1. For `Users`, `Artists`, `Albums`, `Tracks` and `Favorites` REST endpoints with separate router paths should be created

- `Users` (`/user` route)

  - `GET /user` - get all users
    - Server should answer with `status code` **200** and all users records
  - `GET /user/:id` - get single user by id
    - Server should answer with `status code` **200** and and record with `id === userId` if it exists
    - Server should answer with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
    - Server should answer with `status code` **404** and corresponding message if record with `id === userId` doesn't exist
  - `POST /user` - create user (following DTO should be used)
    `CreateUserDto`
    ```typescript
    interface CreateUserDto {
      login: string;
      password: string;
    }
    ```
    - Server should answer with `status code` **201** and newly created record if request is valid
    - Server should answer with `status code` **400** and corresponding message if request `body` does not contain **required** fields
  - `PUT /user/:id` - update user's password
    `UpdatePasswordDto` (with attributes):
    ```typescript
    interface UpdatePasswordDto {
      oldPassword: string; // previous password
      newPassword: string; // new password
    }
    ```
    - Server should answer with` status code` **200** and updated record if request is valid
    - Server should answer with` status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
    - Server should answer with` status code` **404** and corresponding message if record with `id === userId` doesn't exist
    - Server should answer with` status code` **403** and corresponding message if `oldPassword` is wrong
  - `DELETE /user/:id` - delete user
    - Server should answer with `status code` **204** if the record is found and deleted
    - Server should answer with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
    - Server should answer with `status code` **404** and corresponding message if record with `id === userId` doesn't exist

- `Tracks` (`/track` route)

  - `GET /track` - get all tracks
    - Server should answer with `status code` **200** and all tracks records
  - `GET /track/:id` - get single track by id
    - Server should answer with `status code` **200** and and record with `id === trackId` if it exists
    - Server should answer with `status code` **400** and corresponding message if `trackId` is invalid (not `uuid`)
    - Server should answer with `status code` **404** and corresponding message if record with `id === trackId` doesn't exist
  - `POST /track` - create new track
    - Server should answer with `status code` **201** and newly created record if request is valid
    - Server should answer with `status code` **400** and corresponding message if request `body` does not contain **required** fields
  - `PUT /track/:id` - update track info
    - Server should answer with` status code` **200** and updated record if request is valid
    - Server should answer with` status code` **400** and corresponding message if `trackId` is invalid (not `uuid`)
    - Server should answer with` status code` **404** and corresponding message if record with `id === trackId` doesn't exist
  - `DELETE /track/:id` - delete track
    - Server should answer with `status code` **204** if the record is found and deleted
    - Server should answer with `status code` **400** and corresponding message if `trackId` is invalid (not `uuid`)
    - Server should answer with `status code` **404** and corresponding message if record with `id === trackId` doesn't exist

- `Artists` (`/artist` route)

  - `GET /artist` - get all artists
    - Server should answer with `status code` **200** and all artists records
  - `GET /artist/:id` - get single artist by id
    - Server should answer with `status code` **200** and and record with `id === artistId` if it exists
    - Server should answer with `status code` **400** and corresponding message if `artistId` is invalid (not `uuid`)
    - Server should answer with `status code` **404** and corresponding message if record with `id === artistId` doesn't exist
  - `POST /artist` - create new artist
    - Server should answer with `status code` **201** and newly created record if request is valid
    - Server should answer with `status code` **400** and corresponding message if request `body` does not contain **required** fields
  - `PUT /artist/:id` - update artist info
    - Server should answer with` status code` **200** and updated record if request is valid
    - Server should answer with` status code` **400** and corresponding message if `artist` is invalid (not `uuid`)
    - Server should answer with` status code` **404** and corresponding message if record with `id === artistId` doesn't exist
  - `DELETE /artist/:id` - delete album
    - Server should answer with `status code` **204** if the record is found and deleted
    - Server should answer with `status code` **400** and corresponding message if `artistId` is invalid (not `uuid`)
    - Server should answer with `status code` **404** and corresponding message if record with `id === artistId` doesn't exist

- `Albums` (`/album` route)

  - `GET /album` - get all albums
    - Server should answer with `status code` **200** and all albums records
  - `GET /album/:id` - get single album by id
    - Server should answer with `status code` **200** and and record with `id === albumId` if it exists
    - Server should answer with `status code` **400** and corresponding message if `albumId` is invalid (not `uuid`)
    - Server should answer with `status code` **404** and corresponding message if record with `id === albumId` doesn't exist
  - `POST /album` - create new album
    - Server should answer with `status code` **201** and newly created record if request is valid
    - Server should answer with `status code` **400** and corresponding message if request `body` does not contain **required** fields
  - `PUT /album/:id` - update album info
    - Server should answer with` status code` **200** and updated record if request is valid
    - Server should answer with` status code` **400** and corresponding message if `albumId` is invalid (not `uuid`)
    - Server should answer with` status code` **404** and corresponding message if record with `id === albumId` doesn't exist
  - `DELETE /album/:id` - delete album
    - Server should answer with `status code` **204** if the record is found and deleted
    - Server should answer with `status code` **400** and corresponding message if `albumId` is invalid (not `uuid`)
    - Server should answer with `status code` **404** and corresponding message if record with `id === albumId` doesn't exist

- `Favorites`
  - `GET /favs` - get all favorites
    - Server should answer with `status code` **200** and all favorite records (**not their ids**), split by entity type:
    ```typescript
    interface FavoritesRepsonse {
      artists: Artist[];
      albums: Album[];
      tracks: Track[];
    }
    ```
  - `POST /favs/track/:id` - add track to the favorites
    - Server should answer with `status code` **201** and corresponding message if track with `id === trackId` exists
    - Server should answer with `status code` **400** and corresponding message if `trackId` is invalid (not `uuid`)
    - Server should answer with `status code` **422** and corresponding message if track with `id === trackId` doesn't exist
  - `DELETE /favs/track/:id` - delete track from favorites
    - Server should answer with `status code` **204** if the track was in favorites and now it's deleted id is found and deleted
    - Server should answer with `status code` **400** and corresponding message if `trackId` is invalid (not `uuid`)
    - Server should answer with `status code` **404** and corresponding message if corresponding track is not favorite
  - `POST /favs/album/:id` - add album to the favorites
    - Server should answer with `status code` **201** and corresponding message if album with `id === albumId` exists
    - Server should answer with `status code` **400** and corresponding message if `albumId` is invalid (not `uuid`)
    - Server should answer with `status code` **422** and corresponding message if album with `id === albumId` doesn't exist
  - `DELETE /favs/album/:id` - delete album from favorites
    - Server should answer with `status code` **204** if the album was in favorites and now it's deleted id is found and deleted
    - Server should answer with `status code` **400** and corresponding message if `albumId` is invalid (not `uuid`)
    - Server should answer with `status code` **404** and corresponding message if corresponding album is not favorite
  - `POST /favs/artist/:id` - add artist to the favorites
    - Server should answer with `status code` **201** and corresponding message if artist with `id === artistId` exists
    - Server should answer with `status code` **400** and corresponding message if `artistId` is invalid (not `uuid`)
    - Server should answer with `status code` **422** and corresponding message if artist with `id === artistId` doesn't exist
  - `DELETE /favs/artist/:id` - delete artist from favorites
    - Server should answer with `status code` **204** if the artist was in favorites and now it's deleted id is found and deleted
    - Server should answer with `status code` **400** and corresponding message if `artistId` is invalid (not `uuid`)
    - Server should answer with `status code` **404** and corresponding message if corresponding artist is not favorite

- `Signup` (`auth/signup` route)
  - `POST auth/signup` - send `login` and `password` to create a new `user`
    - Server should answer with `status code` **201** and corresponding message if dto is valid
    - Server should answer with `status code` **400** and corresponding message if dto is invalid (no `login` or `password`, or they are not a `strings`)
- `Login` (`auth/login` route)
  - `POST auth/login` - send `login` and `password` to get Access token and Refresh token (optionally)
    - Server should answer with `status code` **200** and tokens if dto is valid
    - Server should answer with `status code` **400** and corresponding message if dto is invalid (no `login` or `password`, or they are not a `strings`)
    - Server should answer with `status code` **403** and corresponding message if authentication failed (no user with such `login`, `password` doesn't match actual one, etc.)
- `Refresh` (`auth/refresh` route)
  - `POST auth/refresh` - send refresh token in body as `{ refreshToken }` to get new pair of Access token and Refresh token
    - Server should answer with `status code` **200** and tokens in body if dto is valid
    - Server should answer with `status code` **401** and corresponding message if dto is invalid (no `refreshToken` in body)
    - Server should answer with `status code` **403** and corresponding message if authentication failed (Refresh token is invalid or expired)
