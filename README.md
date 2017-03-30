To start db: mongod --smallfiles --dbpath=./data

To start app: nodemon

All scores are from 0.5 - 0.75
Math.round((Math.random()*(0.75-0.5)+0.5) * 100) / 100

All plagiarism scores are from 50 to 100
Math.floor(Math.random() * 51) + 50