# Running the application
1. From this directory, run docker-compose build. This will rebuild the images.
2. From this directory, run docker-compose run. Will run the images that were just built.

# To run without Docker
In front_end/package.json, comment out the line "proxy": "http://server"...

Currently, the frontend is available at port 3000 and the backend is at port 5001.