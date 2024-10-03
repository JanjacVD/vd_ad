<?php

return [
    /*
    |--------------------------------------------------------------------------
    | API Title
    |--------------------------------------------------------------------------
    |
    | The title of your API documentation.
    |
    */
    "title" => env("SWAGGER_TITLE", "Api Documentation"),

    /*
    |--------------------------------------------------------------------------
    | API Description
    |--------------------------------------------------------------------------
    |
    | The description of your API.
    |
    */
    "description" => env("SWAGGER_DESCRIPTION", "Laravel autogenerate swagger"),

    /*
    |--------------------------------------------------------------------------
    | API Email
    |--------------------------------------------------------------------------
    |
    | The email associated with your API documentation.
    |
    */
    "email" => env("SWAGGER_EMAIL", "hussein4alaa@gmail.com"),

    /*
    |--------------------------------------------------------------------------
    | API Version
    |--------------------------------------------------------------------------
    |
    | The version of your API.
    |
    */
    "version" => env("SWAGGER_VERSION", "3.0.7"),

    /*
    |--------------------------------------------------------------------------
    | Enable Response Schema
    |--------------------------------------------------------------------------
    |
    | Whether to enable response schema or not.
    |
    */
    "enable_response_schema" => true,

    "suggestions_select_input" => true,

    "load_from_json" => false,

    /*
    |--------------------------------------------------------------------------
    | Authentication Middlewares
    |--------------------------------------------------------------------------
    |
    | List of middleware names used for authentication.
    |
    */
    "auth_middlewares" => [
        "auth",
        "auth:api",
    ],

    /*
    |--------------------------------------------------------------------------
    | API URL
    |--------------------------------------------------------------------------
    |
    | The URL path for accessing your API documentation.
    |
    */
    "url" => env("SWAGGER_URL", "swagger/documentation"),

    /*
    |--------------------------------------------------------------------------
    | Issues URL
    |--------------------------------------------------------------------------
    |
    | The URL path for accessing issues related to your API documentation.
    |
    */
    "issues_url" => env("SWAGGER_ISSUE_URL", "swagger/issues"),

    /*
    |--------------------------------------------------------------------------
    | Enable Swagger
    |--------------------------------------------------------------------------
    |
    | Whether Swagger is enabled or not.
    |
    */
    "enable" => env('SWAGGER_ENABLED', true),

    /*
    |--------------------------------------------------------------------------
    | Show Prefix
    |--------------------------------------------------------------------------
    |
    | List of prefixes to show in Swagger.
    |
    */
    "show_prefix" => [],


    /*
    |--------------------------------------------------------------------------
    | API Versions
    |--------------------------------------------------------------------------
    |
    | List of versions to show in Swagger.
    |
    */
    "versions" => [
        "all",
        // "v1"
    ],

    "default" => "all",


    /*
    |--------------------------------------------------------------------------
    | Servers
    |--------------------------------------------------------------------------
    |
    | List of servers associated with your API.
    |
    */
    "servers" => [
        [
            "url" => env("APP_URL"),
            "description" => "localhost"
        ]
    ],


    /*
    |--------------------------------------------------------------------------
    | Security Schemes
    |--------------------------------------------------------------------------
    |
    | Security schemes used in your API.
    |
    */
    "security_schemes" => [
        "authorization" => [
            "type" => "apiKey",
            "name" => "authorization",
            "in" => "header"
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Spatie Query Builder
    |--------------------------------------------------------------------------
    |
    | Enable it if you using Spatie query builder package to add spatie filters in all GET routes.
    |
    */
    "spatie_query_builder" => false,


    /*
    |--------------------------------------------------------------------------
    | Status
    |--------------------------------------------------------------------------
    |
    | HTTP response statuses for various methods.
    |
    */
    "status" => [
        "GET" => [
            "200" => [
                "description" => "Successful Operation",
            ],
            "404" => [
                "description" => "Not Found"
            ]
        ],
        "POST" => [
            "200" => [
                "description" => "Successful Operation",
            ],
            "401" => [
                "description" => "Unauthorized"
            ],
            "400" => [
                "description" => "Bad Request"
            ],
            "422" => [
                "description" => "Validation Issues"
            ]
        ],
        "PUT" => [
            "200" => [
                "description" => "Successful Operation",
            ],
            "404" => [
                "description" => "Not Found"
            ],
            "405" => [
                "description" => "Validation exception"
            ]
        ],
        "PATCH" => [
            "200" => [
                "description" => "Successful Operation",
            ],
            "404" => [
                "description" => "Not Found"
            ],
            "405" => [
                "description" => "Validation exception"
            ]
        ],
        "DELETE" => [
            "200" => [
                "description" => "successful Operation",
            ],
            "404" => [
                "description" => "page Not Found"
            ]
        ],
    ],
    'components' => [
        'schemas' => [
            'User' => [
                'type' => 'object',
                'properties' => [
                    'id' => [
                        'type' => 'integer',
                        'example' => 1,
                    ],
                    'title' => [
                        'type' => 'string',
                        'example' => 'Post Title',
                    ],
                    'content' => [
                        'type' => 'string',
                        'example' => 'This is the content of the post.',
                    ],
                    'author' => [
                        '$ref' => '#/components/schemas/User',  // Assume there's a User schema for the author
                    ],
                    'created_at' => [
                        'type' => 'string',
                        'format' => 'date-time',
                        'example' => '2023-09-14T12:00:00Z',
                    ],
                    'updated_at' => [
                        'type' => 'string',
                        'format' => 'date-time',
                        'example' => '2023-09-14T12:00:00Z',
                    ],
                ],
            ],
        ],
    ],
];
