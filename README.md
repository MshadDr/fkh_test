# Fakher Test Scoring Service Project:

This repository comprises a NodeJs application designed to score products by users.

------------------------------------------------------------------------------------
Getting Started
------------------------------------------------------------------------------------
### Prerequisites
- Docker && Docker-Compose
- NodeJs
- Postman
------------------------------------------------------------------------------------
### Installation

#### 1. Clone the project
```
git clone git@github.com:MshadDr/fkh_test.git
```
#### 2. Build Infrastructure
```text
1- docker network create local_network 
2- cd project root
3. copy .env file
4. docker-compose build
5. docker-compose up
```
#### 3. Build the Project

create your own database or follow bellow steps:
```
1. create postgres database
	1-1. docker exec -it postgres psql -U root -W -d postgres
	1-2. CREATE DATABASE fakher;
2. cd project root
3. docker-compose up --build
```

#### 4. Test the Project Health
```
[ curl --location 'localhost:3000/health' ]
```

## Configuration
crucial environment-specific settings, such as ports,
hosts, addresses, and other essential configurations, are encapsulated
in a separate `.env` file.

------------------------------------------------------------------------------------
## Usage

Import `Postman-Collection`
```text
./docs/postman_collection.json
```
------------------------------------------------------------------------------------
## Testing
the test files are in tests folder, and you can run them at once or one by one  
run all:
```js
npm test
```