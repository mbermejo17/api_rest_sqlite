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
    "type": "delete",
    "url": "/api/user/:id",
    "title": "",
    "name": "ApiUserDelete",
    "group": "User",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "paramName",
            "description": "<p>description</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    property : value\n}",
          "type": "type"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "type",
            "optional": false,
            "field": "name",
            "description": "<p>description</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    property : value\n}",
          "type": "type"
        }
      ]
    },
    "filename": "./controllers/api.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/api/user",
    "title": "",
    "name": "GetAllUsers",
    "group": "User",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "paramName",
            "description": "<p>description</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    property : value\n}",
          "type": "type"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "type",
            "optional": false,
            "field": "name",
            "description": "<p>description</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    property : value\n}",
          "type": "type"
        }
      ]
    },
    "filename": "./controllers/api.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/api/user/:id",
    "title": "",
    "name": "GetUserById",
    "group": "User",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "paramName",
            "description": "<p>description</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    property : value\n}",
          "type": "type"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "type",
            "optional": false,
            "field": "name",
            "description": "<p>description</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    property : value\n}",
          "type": "type"
        }
      ]
    },
    "filename": "./controllers/api.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/api/user/:name",
    "title": "",
    "name": "GetUserByName",
    "group": "User",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "paramName",
            "description": "<p>description</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    property : value\n}",
          "type": "type"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "type",
            "optional": false,
            "field": "name",
            "description": "<p>description</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    property : value\n}",
          "type": "type"
        }
      ]
    },
    "filename": "./controllers/api.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/api/user",
    "title": "",
    "name": "UserAdd",
    "group": "User",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "paramName",
            "description": "<p>description</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    property : value\n}",
          "type": "type"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "type",
            "optional": false,
            "field": "name",
            "description": "<p>description</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    property : value\n}",
          "type": "type"
        }
      ]
    },
    "filename": "./controllers/api.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/api/user/login",
    "title": "",
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
            "field": "paramName",
            "description": "<p>description</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    property : value\n}",
          "type": "type"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "type",
            "optional": false,
            "field": "name",
            "description": "<p>description</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    property : value\n}",
          "type": "type"
        }
      ]
    },
    "filename": "./controllers/api.js",
    "groupTitle": "User"
  }
] });
