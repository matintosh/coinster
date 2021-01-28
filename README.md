# coinster

# Getting started

Run backend:
`docker-compose up --build`

Run frontend:
- `cd frontend/coisnter-app`
- `npm i`
- `npm start`



# known issues
The project uses a postgress database hosted in heroku, so every a couple of minutes it gets sleep, so probably when you start using the app you will get some CORS errors. They'll leave after one or two tries. An advice: try to navigate throught al the sections once you are logged in

Another issue relates to a service is that the project also uses a third party rabbitmq host, the thing here is that sometimes some workers stay listening and literally taking a place in the "workers list". The visible error here is e.g. you create a new transaction but the daemon that takes care of validate and "make" it, never reach that "new_transference" call, so if you have a couple of open workers you are going to see that maybe one every 2 or 3 transferences will be getting proceessed.




# architecture
There are 4 main services that take care of all the bussines logic and serving the features to the app project
- currency
    - This service keeps the currency logic, basically a CRUD and that's it
- user
    - Here we have our users models, authentication flows ( jwt token authorization ), users sign-up/sign-in, etc.
- wallet
    - Wallet takes care of the bussines logic regarding to the users money, a user could have as wallets as they want and then use them as small recipients of money or give different usages for each one.
    - Wallet has a queue listener ( or worker ) that listens to every new tranference creates in transference service, it takes care of make the money transference from one wallet to another, validating balances etc...
- transference
    - This is the service that gets the transactions requests, this first creates the 'in progress' or 'pending of aproval' transference record in the databae, and then after the wallet worker makes the money moves, it updates the status to 'aproved' or 'rejected' depending of the case
    - Transference service algo has a worker that takes care of listen the transferences being completed by the other worker
    - I was aiming to add a new worker listening the trnasferences updates in order to generate some sort of notifications but that will remain as a #TODO for some day in the future