# avby-scraper

**Get updates for AV.by search queries in Telegram.** 


* [Usage](#usage)
* [Configuration](#configuration)

## Usage

- Create a `.json` request file, put it into `http` directory
- Set Telegram Bot Token and Chat ID in `.env` file
- Start up MongoDB
- Run the app, it'll periodically run requests and send new cars to your Telegram.

## Configuration
All configuration options are available in `./config/default.json`. Some of them can be set through ENV variables.
