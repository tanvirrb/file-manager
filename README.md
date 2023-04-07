[![Test](https://github.com/tanvirrb/event-app/actions/workflows/test.yml/badge.svg)](https://github.com/tanvirrb/file-manager/actions/workflows/test.yml)

# File Manager API

This is a simple file manager API built using Node JS. The app allows users to create, retrieve and delete files. The API is built using the following technologies:

* [Node.js](https://nodejs.org/en/) - The JavaScript runtime used
* [Express](https://expressjs.com/) - The web framework used
* [Node-cron](https://www.npmjs.com/package/node-cron) - The cron job scheduler used
* [Mocha](https://mochajs.org/) - The testing framework used
* [Chai](https://www.chaijs.com/) - The assertion library used
* [ChaiHttp](https://www.chaijs.com/plugins/chai-http/) - The HTTP integration testing plugin for Chai
* [Nodemon](https://nodemon.io/) - The development dependency used to automatically restart the server on file changes
* [ESLint](https://eslint.org/) - The linter used
* [Prettier](https://prettier.io/) - The code formatter used

## Getting Started

### Prerequisites

- Node JS
- NPM
- Git

### Installation

Clone the repository

```bash
git clone git@github.com:tanvirrb/file-manager.git
```

Change directory to the project root

```bash
cd file-manager
```

create environment variable file from example file

```bash
cp .env.example .env
```

Start the app

```bash
npm start
```

The app REST API will be available at http://localhost:3000/v1/files

[//]: # (The OpenApi documentation will be available at http://localhost:3000/v1/api-docs)

[//]: # (The Postman collection will be available at my Github gist [here]&#40;https://gist.github.com/tanvirrb/ff4928661b79a607bbb8ce4d00c561ad&#41;)


## Files REST API

The File REST API is an API for managing files. The API allows users to create, retrieve and delete files.

#### Base URL for the API http://localhost:3000/v1
### API Endpoints

### `POST /files`
Upload a new pair of public and private keys.

Request Parameters

| Parameter  | In          | Type | Required | Description          |
|------------|-------------|------| ---- |----------------------|
| privateKey | body        | file | yes | The privateKey file  |
| publicKey  | body        | file | yes | The publicKey file   |

Request Body
```form-data
privateKey: file
publicKey: file
```

#### Response

```json
{
  "publicKey": "EFNXRGMA.pub",
  "privateKey": "EFNXRGMA.pem"
}
```

### `GET /files/:publicKey`
Retrieves a pair of public and private keys by public key ID.

Request Parameters

| Parameter | In          | Type   | Required | Description      |
|-----------|-------------|--------| -------- |------------------|
| publicKey | route param | string | yes      | The publicKey ID |

#### Response

```octet-stream
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1R+9hEAGlPldoOmnYq3F
pG1CZmViThaD1/AaBdj9zV/WtllzxJt8Ndr5w5P5oWTvm2An/1rE5t+5oh9zgczx
hKP+sJp0tY+0peAYBASZv5r5rJlQyaQcR0ts+LLy+aJhFCKfY3jr3eDpSzJZgr58
Zd8TJ3q9XIPpB1x6cg+V6QmJlR1m6flAe+aPMfMKo4DPn/9C9g2vGy4H4IYOFIxw
mmV7cscFZI98V8tX+g5ir1BpHx8tLLKG/cg+PAS5Y5w5m5EEN88m2X9qwR+GQ2JF
fEjbj/UeC3KLq3a+KbeMYJFZ1N9XWezT3TcUk+l6Uv0ujlJ0R04nmOWQNLf++sfl
eQIDAQAB
-----END PUBLIC KEY-----
-----BEGIN ENCRYPTED PRIVATE KEY-----
MIICzzBJBgkqhkiG9w0BBQ0wPDAbBgkqhkiG9w0BBQwwDgQI9yKxWnGvH3wCAggA
MBQGCCqGSIb3DQMHBAiCAhJX9LYy4xQSCBMK+UblAPDz6N8r6rJQoDD3qo+FGCGG
1a6eEWclLJwCgsyoHDhk+7BcJZmbHfd7z0fEgQAK9LJmFty5V5F/dotY6RivU+id
zPOr82UcUXebfX9jJDUTh8+LbCfYnKuG7zH21ZfPv7+vjhKCCaA9D02ncFk5l5kt
bY0t49oQdKzZnwvHyC1bnEae1uvHSD+UNW8PvD0g50oqTzTgeT0W/CZzOJh/v+cp
XfnL1s4LM4hKsOq3Tqf3ulzZSgmhDv46zmgd+iM/E9RBRa4c4gLjUVs04ChnKPFD
t2jB2FkzuRbRJVP+O23OvahpL/b+NfrJELWyfDe3q3Ams9E+QmSDTgTUDGQr0Tr0
NU1wY8OyMkkhMGJtyxd/Xc0MknOubg1p+u33SfLa/A7VWKMKnJ+I7g69oz4o4v9X
j8mkzOb6ZI+DOqjJ47VQdY8MHL6e78x+D5vJByAfU6ajvOOeQwW8fp3RG1zSl5xC
U5RM5U5OGeOtxaEBxrsR6vNc7w0HSAKZV7gZ1NvJS1+jegW8F4ybkQ/4fhIvzUIj
d8YrGZ2CgofTtKs9H+09exavJhACzdEuLzi46BnMNpByYodjaMwsZzsiMhG9d2LS
jK3q/IyAZHTwyfiB+ZXUEjwG1ZbhLnhFJhRtpmQdJ/Eccssy3ITfobgnJ+sTtj1d
Y+0o/MJsjhTMTNt9Av0t43DbJy0b60t/U1vJ7VWnBL8Ivt7npg+Z1fBJJXW/nb8C
2VxIFB4LQFknWwYJz3nsZ5/KdbZ5me5cJpM8+U6y
```

### `DELETE /files/:privateKey`
Deletes a pair of public and private keys by private key ID.

Request Parameters

| Parameter | In          | Type   | Required | Description       |
| --------- |-------------|--------|----------|-------------------|
| publicKey | route param | string | yes      | The privateKey ID |

#### Response

```json
{
  "message": "Files deletion failed"
}
```


### Running the tests

```bash
npm test
```


# Conclusion

Thanks for reading this documentation. If you have any questions, feel free to reach out to me at [My Email](mailto:tanvir.fallen@gmail.com)

