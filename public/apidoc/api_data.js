define({ "api": [
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./public/apidoc/main.js",
    "group": "F__DESARROLLO_node_restful_api_tutorial_13_controllers_public_apidoc_main_js",
    "groupTitle": "F__DESARROLLO_node_restful_api_tutorial_13_controllers_public_apidoc_main_js",
    "name": ""
  },
  {
    "type": "get",
    "url": "/api/room/:id",
    "title": "Get Room by ID",
    "name": "GetRoomById",
    "group": "Reomote_Rooms",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Autohization",
            "description": "<p>User token access-key.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": \"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyTmFtZSI6IlBlcGUiLCJpYXQiOjE1MjcxMzg5NzgsImV4cCI6MTUyNzEzOTU3OH0.ov2LdDMDvIQXJMP2_3BEMisfze2KJ4frNdIG-B_M-BA\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>user id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"OK\",\n  \"message\": {\n                \"RoomName\": \"Room1\",\n                \"UserId\": 1\n               }\n }",
          "type": "object[]"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 NOT FOUND\n{\n  \"status\" : \"FAIL\",\n  \"message\": \"Room ID <id> not found\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./controllers/RoomApi.js",
    "groupTitle": "Reomote_Rooms"
  },
  {
    "type": "get",
    "url": "/api/room/:name",
    "title": "Get Room by name",
    "name": "GetUserByName",
    "group": "Reomote_Rooms",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Autohization",
            "description": "<p>User token access-key.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": \"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyTmFtZSI6IlBlcGUiLCJpYXQiOjE1MjcxMzg5NzgsImV4cCI6MTUyNzEzOTU3OH0.ov2LdDMDvIQXJMP2_3BEMisfze2KJ4frNdIG-B_M-BA\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p>room name</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"OK\",\n  \"message\": {\n                \"RoomName\": \"Room1\",\n                \"UserId\": 1\n               }\n }",
          "type": "object[]"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 NOT FOUND\n{\n  \"status\" : \"FAIL\",\n  \"message\": \"Room <name> not found\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./controllers/RoomApi.js",
    "groupTitle": "Reomote_Rooms"
  },
  {
    "type": "post",
    "url": "/api/room",
    "title": "Room Add",
    "name": "RoomAdd",
    "group": "Reomote_Rooms",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Autohization",
            "description": "<p>User token access-key.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": \"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyTmFtZSI6IlBlcGUiLCJpYXQiOjE1MjcxMzg5NzgsImV4cCI6MTUyNzEzOTU3OH0.ov2LdDMDvIQXJMP2_3BEMisfze2KJ4frNdIG-B_M-BA\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "room",
            "description": "<p>room name</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    \"roomname\"   : \"Room1\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\" : \"OK\",\n    \"message\": \"Room <name> added added successfuly\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 409 CONFLICT\n{\n  \"status\" : \"FAIL\",\n  \"message\": \"Room <name> already exists\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./controllers/RoomApi.js",
    "groupTitle": "Reomote_Rooms"
  },
  {
    "type": "delete",
    "url": "/api/room/:id",
    "title": "Room Delete",
    "name": "RoomDelete",
    "group": "Reomote_Rooms",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Autohization",
            "description": "<p>User token access-key.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": \"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyTmFtZSI6IlBlcGUiLCJpYXQiOjE1MjcxMzg5NzgsImV4cCI6MTUyNzEzOTU3OH0.ov2LdDMDvIQXJMP2_3BEMisfze2KJ4frNdIG-B_M-BA\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "room",
            "description": "<p>id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\" : \"OK\",\n    \"message\": \"Room ID <id> deleted successfuly\" \n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 NOT FOUND\n{\n  \"status\" : \"FAIL\",\n  \"message\": \"Room ID <id> not found\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./controllers/RoomApi.js",
    "groupTitle": "Reomote_Rooms"
  },
  {
    "type": "get",
    "url": "/api/room",
    "title": "Get All Rooms",
    "name": "RoomGetAll",
    "group": "Reomote_Rooms",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Autohization",
            "description": "<p>User token access-key.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": \"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyTmFtZSI6IlBlcGUiLCJpYXQiOjE1MjcxMzg5NzgsImV4cCI6MTUyNzEzOTU3OH0.ov2LdDMDvIQXJMP2_3BEMisfze2KJ4frNdIG-B_M-BA\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"OK\",\n  \"message\": [\n              {\n                \"RoomName\": \"Room1\",\n                \"RoomId\": 1\n               },\n              {\n                \"RoomName\": \"Room2\",\n                \"RoomId\": 2\n               },\n             ]\n }",
          "type": "object[]"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 NOT FOUND\n{\n  \"status\" : \"FAIL\",\n  \"message\": \"No rooms are found\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./controllers/RoomApi.js",
    "groupTitle": "Reomote_Rooms"
  },
  {
    "type": "get",
    "url": "/api/user/:id",
    "title": "Get User by ID",
    "name": "GetUserById",
    "group": "User",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Autohization",
            "description": "<p>User token access-key.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": \"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyTmFtZSI6IlBlcGUiLCJpYXQiOjE1MjcxMzg5NzgsImV4cCI6MTUyNzEzOTU3OH0.ov2LdDMDvIQXJMP2_3BEMisfze2KJ4frNdIG-B_M-BA\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>user id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"OK\",\n  \"message\": {\n                \"UserName\": \"Pepe\",\n                \"UserId\": 1,\n                \"UserPasswd\": \"c9c244e48caa6456183125d7d9359f4b\",\n                \"UserRole\": \"admin\"\n               }\n }",
          "type": "object[]"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 NOT FOUND\n{\n  \"status\" : \"FAIL\",\n  \"message\": \"User ID <id> not found\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./controllers/UserApi.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/api/user/:name",
    "title": "Get User by name",
    "name": "GetUserByName",
    "group": "User",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Autohization",
            "description": "<p>User token access-key.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": \"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyTmFtZSI6IlBlcGUiLCJpYXQiOjE1MjcxMzg5NzgsImV4cCI6MTUyNzEzOTU3OH0.ov2LdDMDvIQXJMP2_3BEMisfze2KJ4frNdIG-B_M-BA\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p>user name</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"OK\",\n  \"message\": {\n                \"UserName\": \"Pepe\",\n                \"UserId\": 1,\n                \"UserPasswd\": \"c9c244e48caa6456183125d7d9359f4b\",\n                \"UserRole\": \"admin\"\n               }\n }",
          "type": "object[]"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 NOT FOUND\n{\n  \"status\" : \"FAIL\",\n  \"message\": \"User <name> not found\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./controllers/UserApi.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/api/user",
    "title": "User Add",
    "name": "UserAdd",
    "group": "User",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Autohization",
            "description": "<p>User token access-key.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": \"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyTmFtZSI6IlBlcGUiLCJpYXQiOjE1MjcxMzg5NzgsImV4cCI6MTUyNzEzOTU3OH0.ov2LdDMDvIQXJMP2_3BEMisfze2KJ4frNdIG-B_M-BA\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Logon user name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userpasswd",
            "description": "<p>Logon user password</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userrole",
            "description": "<p>User role</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    \"username\"   : \"Pepe\",\n    \"userpasswd\" : \"YzljMjQ0ZTQ4Y2FhNjQ1NjE4MzEyNWQ3ZDkzNTlmNGI=\",\n    \"userrole\"   : \"user\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\" : \"OK\",\n    \"message\": \"User <username> added added successfuly\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 409 CONFLICT\n{\n  \"status\" : \"FAIL\",\n  \"message\": \"User <username> already exists\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./controllers/UserApi.js",
    "groupTitle": "User"
  },
  {
    "type": "delete",
    "url": "/api/user/:id",
    "title": "User Delete",
    "name": "UserDelete",
    "group": "User",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Autohization",
            "description": "<p>User token access-key.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": \"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyTmFtZSI6IlBlcGUiLCJpYXQiOjE1MjcxMzg5NzgsImV4cCI6MTUyNzEzOTU3OH0.ov2LdDMDvIQXJMP2_3BEMisfze2KJ4frNdIG-B_M-BA\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "username",
            "description": "<p>id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\" : \"OK\",\n    \"message\": \"User ID <id> deleted successfuly\" \n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 NOT FOUND\n{\n  \"status\" : \"FAIL\",\n  \"message\": \"User ID <id> not found\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./controllers/UserApi.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/api/user",
    "title": "Get All Users",
    "name": "UserGetAll",
    "group": "User",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Autohization",
            "description": "<p>User token access-key.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": \"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyTmFtZSI6IlBlcGUiLCJpYXQiOjE1MjcxMzg5NzgsImV4cCI6MTUyNzEzOTU3OH0.ov2LdDMDvIQXJMP2_3BEMisfze2KJ4frNdIG-B_M-BA\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"OK\",\n  \"message\": [\n              {\n                \"UserName\": \"Pepe\",\n                \"UserId\": 1,\n                \"UserPasswd\": \"c9c244e48caa6456183125d7d9359f4b\",\n                \"UserRole\": \"admin\"\n               },\n               {\n                 \"UserName\": \"Juan\",\n                 \"UserId\": 2,\n                 \"UserPasswd\": \"c9c244e48caa6456183125d7d9359f4b\",\n                 \"UserRole\": \"user\"\n               }\n             ]\n }",
          "type": "object[]"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 NOT FOUND\n{\n  \"status\" : \"FAIL\",\n  \"message\": \"User ID <id> not found\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./controllers/UserApi.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/api/user/login",
    "title": "User Logon",
    "name": "UserLogin",
    "group": "User",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Logon user name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userpasswd",
            "description": "<p>Logon user password</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    \"username\"   : \"Pepe\",\n    \"userpasswd\" : \"YzljMjQ0ZTQ4Y2FhNjQ1NjE4MzEyNWQ3ZDkzNTlmNGI=\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\" : \"OK\",\n    \"message\": {\n                \"UserName\": \"Pepe\",\n                \"Token\"   :,\n                \"Role\"    : \"admin\",\n                \"wssURL\"  : \"wss://web.com\"\n               }  \n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 UNAUTHORIZED\n{\n  \"status\" : \"FAIL\",\n  \"message\": \"Authorization Fail\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./controllers/UserApi.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/api/user/logoff/:name",
    "title": "User Logoff",
    "name": "UserLogoff",
    "group": "User",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Autohization",
            "description": "<p>User token access-key.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": \"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyTmFtZSI6IlBlcGUiLCJpYXQiOjE1MjcxMzg5NzgsImV4cCI6MTUyNzEzOTU3OH0.ov2LdDMDvIQXJMP2_3BEMisfze2KJ4frNdIG-B_M-BA\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p>user name</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\"  : \"OK\",\n  \"message\" : \"User <name> logoff successfuly\" \n }",
          "type": "object[]"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 NOT FOUND\n{\n  \"status\" : \"FAIL\",\n  \"message\": \"User <name> not found\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./controllers/UserApi.js",
    "groupTitle": "User"
  }
] });
