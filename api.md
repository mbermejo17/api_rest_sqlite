# API documentation v1.0.0

API list manager

- [Reomote_Rooms](#reomote_rooms)
	- [Get Room by ID](#get-room-by-id)
	- [Get Room by name](#get-room-by-name)
	- [Room Add](#room-add)
	- [Room Delete](#room-delete)
	- [Get All Rooms](#get-all-rooms)
	
- [User](#user)
	- [Get User by ID](#get-user-by-id)
	- [Get User by name](#get-user-by-name)
	- [User Add](#user-add)
	- [User Delete](#user-delete)
	- [Get All Users](#get-all-users)
	- [User Logon](#user-logon)
	- [User Logoff](#user-logoff)
	


# Reomote_Rooms

## Get Room by ID



	GET /api/room/:id

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Autohization			| String			|  <p>User token access-key.</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| id			| string			|  <p>user id</p>							|

### Success Response

Success-Response:

```
HTTP/1.1 200 OK
{
  "status": "OK",
  "message": {
                "RoomName": "Room1",
                "UserId": 1
               }
 }
```
### Error Response

Error-Response:

```
HTTP/1.1 404 NOT FOUND
{
  "status" : "FAIL",
  "message": "Room ID <id> not found"
}
```
## Get Room by name



	GET /api/room/:name

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Autohization			| String			|  <p>User token access-key.</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| name			| string			|  <p>room name</p>							|

### Success Response

Success-Response:

```
HTTP/1.1 200 OK
{
  "status": "OK",
  "message": {
                "RoomName": "Room1",
                "UserId": 1
               }
 }
```
### Error Response

Error-Response:

```
HTTP/1.1 404 NOT FOUND
{
  "status" : "FAIL",
  "message": "Room <name> not found"
}
```
## Room Add



	POST /api/room

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Autohization			| String			|  <p>User token access-key.</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| room			| String			|  <p>room name</p>							|

### Success Response

Success-Response:

```
HTTP/1.1 200 OK
{
    "status" : "OK",
    "message": "Room <name> added added successfuly"
}
```
### Error Response

Error-Response:

```
HTTP/1.1 409 CONFLICT
{
  "status" : "FAIL",
  "message": "Room <name> already exists"
}
```
## Room Delete



	DELETE /api/room/:id

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Autohization			| String			|  <p>User token access-key.</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| room			| number			|  <p>id</p>							|

### Success Response

Success-Response:

```
HTTP/1.1 200 OK
{
    "status" : "OK",
    "message": "Room ID <id> deleted successfuly" 
}
```
### Error Response

Error-Response:

```
HTTP/1.1 404 NOT FOUND
{
  "status" : "FAIL",
  "message": "Room ID <id> not found"
}
```
## Get All Rooms



	GET /api/room

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Autohization			| String			|  <p>User token access-key.</p>							|

### Success Response

Success-Response:

```
HTTP/1.1 200 OK
{
  "status": "OK",
  "message": [
              {
                "RoomName": "Room1",
                "RoomId": 1
               },
              {
                "RoomName": "Room2",
                "RoomId": 2
               },
             ]
 }
```
### Error Response

Error-Response:

```
HTTP/1.1 404 NOT FOUND
{
  "status" : "FAIL",
  "message": "No rooms are found"
}
```
# User

## Get User by ID



	GET /api/user/:id

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Autohization			| String			|  <p>User token access-key.</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| id			| string			|  <p>user id</p>							|

### Success Response

Success-Response:

```
HTTP/1.1 200 OK
{
  "status": "OK",
  "message": {
                "UserName": "Pepe",
                "UserId": 1,
                "UserPasswd": "c9c244e48caa6456183125d7d9359f4b",
                "UserRole": "admin"
               }
 }
```
### Error Response

Error-Response:

```
HTTP/1.1 404 NOT FOUND
{
  "status" : "FAIL",
  "message": "User ID <id> not found"
}
```
## Get User by name



	GET /api/user/:name

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Autohization			| String			|  <p>User token access-key.</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| name			| string			|  <p>user name</p>							|

### Success Response

Success-Response:

```
HTTP/1.1 200 OK
{
  "status": "OK",
  "message": {
                "UserName": "Pepe",
                "UserId": 1,
                "UserPasswd": "c9c244e48caa6456183125d7d9359f4b",
                "UserRole": "admin"
               }
 }
```
### Error Response

Error-Response:

```
HTTP/1.1 404 NOT FOUND
{
  "status" : "FAIL",
  "message": "User <name> not found"
}
```
## User Add



	POST /api/user

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Autohization			| String			|  <p>User token access-key.</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| username			| String			|  <p>Logon user name</p>							|
| userpasswd			| String			|  <p>Logon user password</p>							|
| userrole			| String			|  <p>User role</p>							|

### Success Response

Success-Response:

```
HTTP/1.1 200 OK
{
    "status" : "OK",
    "message": "User <username> added added successfuly"
}
```
### Error Response

Error-Response:

```
HTTP/1.1 409 CONFLICT
{
  "status" : "FAIL",
  "message": "User <username> already exists"
}
```
## User Delete



	DELETE /api/user/:id

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Autohization			| String			|  <p>User token access-key.</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| username			| number			|  <p>id</p>							|

### Success Response

Success-Response:

```
HTTP/1.1 200 OK
{
    "status" : "OK",
    "message": "User ID <id> deleted successfuly" 
}
```
### Error Response

Error-Response:

```
HTTP/1.1 404 NOT FOUND
{
  "status" : "FAIL",
  "message": "User ID <id> not found"
}
```
## Get All Users



	GET /api/user

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Autohization			| String			|  <p>User token access-key.</p>							|

### Success Response

Success-Response:

```
HTTP/1.1 200 OK
{
  "status": "OK",
  "message": [
              {
                "UserName": "Pepe",
                "UserId": 1,
                "UserPasswd": "c9c244e48caa6456183125d7d9359f4b",
                "UserRole": "admin"
               },
               {
                 "UserName": "Juan",
                 "UserId": 2,
                 "UserPasswd": "c9c244e48caa6456183125d7d9359f4b",
                 "UserRole": "user"
               }
             ]
 }
```
### Error Response

Error-Response:

```
HTTP/1.1 404 NOT FOUND
{
  "status" : "FAIL",
  "message": "User ID <id> not found"
}
```
## User Logon



	POST /api/user/login


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| username			| String			|  <p>Logon user name</p>							|
| userpasswd			| String			|  <p>Logon user password</p>							|

### Success Response

Success-Response:

```
HTTP/1.1 200 OK
{
    "status" : "OK",
    "message": {
                "UserName": "Pepe",
                "Token"   :,
                "Role"    : "admin",
                "wssURL"  : "wss://web.com"
               }  
}
```
### Error Response

Error-Response:

```
HTTP/1.1 401 UNAUTHORIZED
{
  "status" : "FAIL",
  "message": "Authorization Fail"
}
```
## User Logoff



	POST /api/user/logoff/:name

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Autohization			| String			|  <p>User token access-key.</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| name			| string			|  <p>user name</p>							|

### Success Response

Success-Response:

```
HTTP/1.1 200 OK
{
  "status"  : "OK",
  "message" : "User <name> logoff successfuly" 
 }
```
### Error Response

Error-Response:

```
HTTP/1.1 404 NOT FOUND
{
  "status" : "FAIL",
  "message": "User <name> not found"
}
```

