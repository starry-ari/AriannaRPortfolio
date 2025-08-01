#!/bin/bash

curl -X POST http://localhost:5000/api/timeline_post \
     -H "Content-Type: application/json" \
     -d '{"name": "Arianna R", "email":arianna.richardson2020@gmail.com"
        "content": "This is a test post from curl!"}'

curl -X GET http://localhost:5000/api/timeline_post
        {"timeline_posts": []}
        