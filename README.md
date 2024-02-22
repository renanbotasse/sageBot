
<div align="center">
  <img src="https://github.com/renanbotasse/sageBot/assets/101360239/42a1ca03-c1b9-48c5-ab48-9d863e58b6e5" alt="SageBot">
</div>



# Sage - Telegram Bot 🤖🟢
 <img src="https://img.shields.io/badge/Version%20-0.1-blue"> <img src="https://img.shields.io/badge/License%20-GPL%203.0-green">
## Introduce

Hello there! I'm **Sage**, your trusty ChatBot companion! 💚

I'm here to assist you with a wide range of tasks and activities:

- **Conversations**: Let's chat about anything you'd like! 👾
- **Knowledge**: I'm here to share fascinating facts and help you learn. 🧐
- **Stories**: Dive into adventures with me. 🌌

We can have a friendly conversation, learn something new, or immerse ourselves in captivating tales. Ready to embark on our journey? ✌️ 

[Sage Telegram Profile](https://t.me/the_sage_bot)


## Commands
- "start" - Begin chatting with the bot.

- "random" - Get a random Wikipedia page.

- "search" - Search for Wikipedia pages.

- "sage" - Chat with the Sage AI.

- "tale" - Ask for the AI a story.

- "help" - See available commands.

- "language" - Choose a language.

- "save_link" - Save a random Wikipedia page.

- "save_list" - Save a search list.

- "save_tale" - Save a story.

- "saved_link" - Display saved Wikipedia pages.

- "saved_list" - Display saved search lists.

- "saved_tale" - Display saved stories.

- "delete_id" - Delete a saved link, list, or story.

- "android" - Get information about The SageBot Project.

## Getting Started

The SageBot is a Telegram chatbot built using Node.js.

Sage is powered by Cohere AI to engage users in conversation, offering stories with up to 1000 words upon request. Additionally, it utilizes the Wikipedia API to provide random pages and make small searches, presenting users with lists of potential topics.

Users can save tales, random pages, and search lists, stored in a MongoDB database. The bot also can delete the stored content.

For deployment, Sage runs on Google Cloud Run using Docker containers, ensuring easy deployment and updates. However, it can also be run locally if preferred.

The Sage Project combines Node, Telegraf, Cohere, Wikipedia, and MongoDB to provide knowledge and entertainment to users.

### Configuration

Create a .env file and add the parameters like: 

| Parameter                   | Description                                                                                                                                                                                                                   |
|-----------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `COHERE_TOKEN`            | Your Cohere API key, you can get it from [here](https://dashboard.cohere.com/api-keys) |                                                                                                                             
| `TELEGRAM_BOT_TOKEN`        | Your Telegram bot's token, obtained using [BotFather](http://t.me/botfather) |
| `MONGODB_URI`            |  Your mongoDB connection take a look [here](https://www.mongodb.com/docs/drivers/go/v1.11/fundamentals/connections/connection-guide/#:~:text=After%20you%20successfully%20start%20your,to%20listen%20for%20incoming%20connections.) |               

### Deploy

#### Local

After creating the .env file and configuring it correctly, follow these steps:

- Install the necessary files using npm: ```npm install```

- Start your local server: ```npm run start```

That's it! You'll now be running the project locally.

#### Google Cloud Run 
To deploy using Google Cloud Run, might seem more complex, but with Docker and a Dockerfile in place, the process becomes straightforward:

1 - If not already installed on your computer, install Docker and Docker Compose.

2 - Create the Dockerfile running ```docker build -t PROJECTNAME .```

3 - Configure your project with [Google Cloud](https://cloud.google.com/resource-manager/docs/creating-managing-projects).

4 - If not installed on your computer, install the [gcloud CLI](https://cloud.google.com/sdk/docs/install).

5 - Initialize gcloud in your project [folder](https://cloud.google.com/sdk/docs/initializing).

6 - Begin the deployment process with the command: ```gcloud run deploy```.

#### If you encounter any issues, these links can help deploy:
  A - [Host Telegram bot in Node.js in Google Cloud Run - Nick Filat](https://medium.com/@nickfilat/host-telegram-bot-in-node-js-in-google-cloud-run-7b5b854dd6e3).
    
  B - [How to deploy an existing Docker container project to Google Cloud Run - Taylor Hughes]( https://medium.com/@taylorhughes/how-to-deploy-an-existing-docker-container-project-to-google-cloud-run-with-the-minimum-amount-of-daca0b5978d8).
    
 C - [Deploy a containerised Node.js application to Cloud Run](https://medium.com/@vinhle95/deploy-a-containerised-node-js-application-to-cloud-run-80d2da6b7040).

### Contributing
Issues and pull requests (PRs) are warmly welcomed! Whether you've spotted a bug, have an enhancement idea, or want to contribute code, your input is valued and appreciated.

<p align="center">
  <img src="https://64.media.tumblr.com/ce237ad7762fc6bce812f5f47f499d76/215844a9b980cfd1-b8/s1280x1920/7acfce390ffb6e00a0b8f0dce34b0c0169943001.gifv" alt="Sage Resting" width="600px" height="300px">
</p>


### License
[GPL-3.0](https://www.gnu.org/licenses/lgpl-3.0.txt)
