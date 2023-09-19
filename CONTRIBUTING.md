Any contributions are welcome! 

The guidelines provided here are designed to emulate the process of contributing to open-source repositories, providing you with a valuable learning experience.

## Setup the Project 
1. Fork the repo (click the `Fork` button at the top right of [this page](https://github.com/smu-hack-dsc/telegram-bot))

1. Clone your fork locally 

```
git clone https://github.com/<your-github-username>/telegram-bot.git
```

2. Setup all dependencies and packages by running `npm install`

3. Rename `.env.example` to `.env` and add your own `BOT_TOKEN`

## Commands
`npm install`: bootstraps the entire project, installing the required dependencies

`npm run build`: builds the project 

`npm start`: starts the bot locally on your machine

## Creating a pull request?
Before you create a pull request, please check the following
* All Github Actions CI worflow have passed ✅
* All commits follow the following convention `category: message`. If you are unsure, please check out the [guidelines here](https://www.conventionalcommits.org/en/v1.0.0/#summary)

Pull requests require 1👍from a collaborator to be merged

