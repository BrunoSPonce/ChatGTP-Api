# API to deploy with Docker that calls OpenAI's ChatGPT
### NodeJs ChatGPT Docker
## Command to deploy
first of all after you have cloned the repository you run 'NPM INSTALL'
after that you run the docker build command:
docker build --build-arg NODE_ENV=development --build-arg OPENAI_API_KEY=sk-jsoefkegjapwokBlbkFJmUQ5FJTJmMe56k7 . -t node-web-app

in 'OPENAI_API_KEY=sk-jsoefkegjapwokBlbkFJmUQ5FJTJmMe56k7' you change to your OpenAI API key

Than you run your image in a container
docker run -p 80:80 -d node-web-app

#### Access Swagger in localhost:80/docs