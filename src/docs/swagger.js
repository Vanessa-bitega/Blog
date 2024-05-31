const swaggerDocumentation = {
  
  
    "swagger": "2.0",
    "info": {
      "title": "Music Forum",
      "version": "1.0.0",
      "description": "API Documentation"
    },
    "host": "localhost:8080",
    "basePath": "/",
    "schemes": [
      "http",
      "https"
    ],
    "securityDefinitions": {
      "Bearer": {
        "type": "apiKey",
        "name": "Authorization",
        "in": "header",
        "description": "Enter the token with the `Bearer ` prefix, e.g. \"Bearer abcde12345\"."
      }
    },
    "paths": {
      "/Questions": {
        "get": {
          "summary": "Retrieve all questions",
          "tags": ["Questions"],
          "responses": {
            "200": {
              "description": "A list of questions",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/Question"
                    }
                  }
                }
              }
            }
          }
        },
        "post": {
          "summary": "Create a new question",
          "tags": ["Questions"],
          "security": [
            {
              "Bearer": []
            }
          ],
          "parameters": [
            {
              "in": "body",
              "name": "question",
              "description": "Question details",
              "required": true,
              "schema": {
                "$ref": "#/components/schemas/Question"
              }
            }
          ],
          "responses": {
            "201": {
              "description": "Created",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Question"
                  }
                }
              }
            }
          }
        },
        "put": {
          "summary": "Update a question",
          "tags": ["Questions"],
          "parameters": [
            {
              "in": "query",
              "name": "id",
              "required": true,
              "type": "string",
              "description": "The ID of the question to update"
            },
            {
              "in": "body",
              "name": "question",
              "description": "Question details",
              "required": true,
              "schema": {
                "$ref": "#/components/schemas/Question"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Updated",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Question"
                  }
                }
              }
            }
          }
        },
        "delete": {
          "summary": "Delete a question",
          "tags": ["Questions"],
          "parameters": [
            {
              "in": "query",
              "name": "id",
              "required": true,
              "type": "string",
              "description": "The ID of the question to delete"
            }
          ],
          "responses": {
            "200": {
              "description": "Deleted"
            }
          }
        }
      },
      "/Question": {
        "get": {
          "summary": "Retrieve a question by ID",
          "tags": ["Questions"],
          "parameters": [
            {
              "in": "query",
              "name": "id",
              "required": true,
              "schema": {
                "type": "string"
              },
              "description": "The ID of the question to retrieve"
            }
          ],
          "responses": {
            "200": {
              "description": "One question",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Question"
                  }
                }
              }
            }
          }
        }
       
      },
      "/auth/signup": {
        "post": {
          "summary": "Sign up a new user",
          "description": "Registers a new user with the provided credentials.",
      "parameters": [
        {
          "in": "body",
          "name": "userData",
          "description": "User data to sign up",
          "required": true,
          "schema": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string",
                "description": "The name of the user"
              },
              "email": {
                "type": "string",
                "description": "The email of the user"
              },
              "password": {
                "type": "string",
                "description": "The password of the user"
              }
            }
          }
        }
      ],

          "tags": ["Authentication"],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/User"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "User successfully created",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/User"
                  }
                }
              }
            },
            "409": {
              "description": "Username or Email already exists",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/auth/login": {
        "post": {
          "summary": "User Login",
          "description": "Logs in a user with the provided credentials.",
          "tags": ["Authentication"],
          "parameters": [
            {
              "in": "body",
              "name": "userData",
              "description": "User data to log in",
              "required": true,
              "schema": {
                "type": "object",
                "properties": {
                  "name": {
                    "type": "string",
                    "description": "The name of the user"
                  },
                  "password": {
                    "type": "string",
                    "description": "The password of the user"
                  }
                }
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Login successful.",
              "headers": {
                "Authorization": {
                  "type": "string",
                  "description": "JWT token for authentication"
                }
              },
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "msg": {
                        "type": "string",
                        "description": "Message indicating login success"
                      },
                      "token": {
                        "type": "string",
                        "description": "JWT token for authentication"
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized. Incorrect password or user not found."
            },
            "500": {
              "description": "Internal server error."
            }
          }
        }
      },
      "/forgot-password": {
        "post": {
          "summary": "Forgot Password",
          "description": "Initiates the process to reset the password for a user by sending a reset password email.",
          "tags": ["Authentication"],
          "parameters": [
            {
              "in": "body",
              "name": "forgotData",
              "description": "Forgot password data",
              "required": true,
              "schema": {
                "type": "object",
                "properties": {
                  "email": {
                    "type": "string",
                    "description": "The email of the user"
                  }
                }
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Reset password email sent."
            },
            "404": {
              "description": "Not found. User with provided email not found."
            },
            "500": {
              "description": "Internal server error."
            }
          }
        }
      },
      "/reset-password": {
        "post": {
          "summary": "Reset Password",
          "description": "Resets the password for a user with the provided reset token and new password.",
          "tags": ["Authentication"],
          "parameters": [
            {
              "in": "body",
              "name": "resetData",
              "description": "Reset password data",
              "required": true,
              "schema": {
                "type": "object",
                "properties": {
                  "email": {
                    "type": "string",
                    "description": "The email of the user"
                  },
                  "resetToken": {
                    "type": "string",
                    "description": "The reset token received by the user"
                  },
                  "newPassword": {
                    "type": "string",
                    "description": "The new password for the user"
                  }
                }
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Password reset successful."
            },
            "401": {
              "description": "Unauthorized. Invalid reset token or token has expired."
            },
            "404": {
              "description": "Not found. User with provided email not found."
            },
            "500": {
              "description": "Internal server error."
            }
          }
        }
      },
      "/reply": {
        "post": {
          "summary": "Create a new reply for a question",
          "description": "Creates a new reply for a specified question.",
          "security": [
            {
              "Bearer": []
            }
          ],
          "parameters": [
            {
              "in": "query",
              "name": "id",
              "required": true,
              "schema": {
                "type": "string"
              },
              "description": "ID of the question to which the reply belongs"
            },
            {
              "in": "body",
              "name": "reply",
              "description": "The reply object to be created",
              "required": true,
              "schema": {
                "type": "object",
                "properties": {
                  "content": {
                    "type": "string",
                    "description": "The content of the reply"
                  }
                }
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Successful operation. Returns the created reply."
            },
            "400": {
              "description": "Bad request. Missing or invalid parameters."
            },
            "404": {
              "description": "Question not found."
            },
            "500": {
              "description": "Internal server error."
            }
          }
        }
      },
      "/upvote": {
        "post": {
          "summary": "Upvote or remove upvote for a reply",
          "description": "Upvotes or removes upvote from a reply based on user's interaction.",
          "security": [
            {
              "Bearer": []
            }
          ],
          "parameters": [
            {
              "in": "query",
              "name": "id",
              "required": true,
              "schema": {
                "type": "string"
              },
              "description": "ID of the reply to upvote"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful operation. Returns the updated reply."
            },
            "404": {
              "description": "Reply not found."
            },
            "500": {
              "description": "Internal server error."
            }
          }
        }
      },
      "/Questions/{genre}": {
        "get": {
          "summary": "search questions by genre",
          "description": "Retrieves questions with the specified genre from the database.",
          "parameters": [
            {
              "in": "path",
              "name": "genre",
              "required": true,
              "schema": {
                "type": "string"
              },
              "description": "The genre of the questions to retrieve"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful operation. Returns the questions."
            },
            "500": {
              "description": "Internal server error."
            }
          }
        }
      }
    },
    "components": {
      "schemas": {
        "Question": {
          "type": "object",
          "properties": {
            
          }
        },
        "User": {
          "type": "object",
          "properties": {
            
          }
        },
        "LoginRequest": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "description": "User's name"
            },
            "password": {
              "type": "string",
              "description": "User's password"
            }
          },
          "required": ["name", "password"]
        },
        "LoginResponse": {
          "type": "object",
          "properties": {
            "msg": {
              "type": "string",
              "description": "Message indicating successful login"
            },
            "token": {
              "type": "string",
              "description": "JWT token for authentication"
            }
          },
          "required": ["msg", "token"]
        },
        "ForgotPasswordRequest": {
          "type": "object",
          "properties": {
            "email": {
              "type": "string",
              "description": "User's email address"
            }
          },
          "required": ["email"]
        },
        "ResetPasswordRequest": {
          "type": "object",
          "properties": {
            "email": {
              "type": "string",
              "description": "User's email address"
            },
            "resetToken": {
              "type": "string",
              "description": "Reset token received by the user"
            },
            "newPassword": {
              "type": "string",
              "description": "New password to set"
            }
          },
          "required": ["email", "resetToken", "newPassword"]
        },
        "Reply": {
        "type": "object",
        "properties": {
          "content": {
            "type": "object",
            "description": "Content of the reply"
            
          },
          "userId": {
            "type": "string",
            "description": "ID of the user who posted the reply"
          },
          "parentId": {
            "type": "string",
            "description": "ID of the parent question or reply"
          },
          "votes": {
            "type": "number",
            "description": "Number of votes for the reply",
            "default": 0
          },
          "votedBy": {
            "type": "array",
            "items": {
              "type": "string"
            },
            "description": "Array of user IDs who voted for the reply"
          }
        },
        "required": ["content", "userId"]
        }
      }
    }
  }
  
  
  export default swaggerDocumentation;
  