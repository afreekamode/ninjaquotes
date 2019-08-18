const SlackBot = require('slackbots');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config()

const bot = new SlackBot({
    token: `${process.env.BOT_TOKEN}`,
    name: 'ninjaquotes'
})

// Start Handler
bot.on('start', () => {
    const params = {
        icon_emoji: ':pikachu:'
    }

    bot.postMessageToChannel(
        'random',
        'Get inspired while working with @ninjaquotes',
        params
    );
    // // define existing username instead of 'user_name'
    // bot.postMessageToUser('user_name', 'Hello world!', 
    // 	params
    // ); 
   
    
    // // define private group instead of 'private_group', where bot exist
    // bot.postMessageToGroup('private_group', 'Hello world!', 
    // 	params
    // ); 
})


// Error Handler
bot.on('error', (err) => {
    console.log(err);
})

// Message Handler
bot.on('message', (data) => {
    if(data.type !== 'message') {
        return;
    }
    handleMessage(data.text);
})

// Response Handler
function handleMessage(message) {
    if(message.includes(' inspire me')) {
        inspireMe()
    } else if(message.includes(' random joke')) {
        randomJoke()
    } else if(message.includes(' help')) {
        runHelp()
    }
}

// inspire Me
// So we want to get a random quote plus the author name every time the user request for it. From our Axios response, we just do this:
function inspireMe() {
    axios.get('https://raw.githubusercontent.com/BolajiAyodeji/inspireNuggets/master/src/quotes.json')
      .then(res => {
            const quotes = res.data;
            const random = Math.floor(Math.random() * quotes.length);
            const quote = quotes[random].quote
            const author = quotes[random].author

            const params = {
                icon_emoji: ':male-technologist:'
            }
        
            bot.postMessageToChannel(
                'random',
                `:zap: ${quote} - *${author}*`,
                params
            );

      })
}

// Random Joke
// So we want to get a random joke plus the author name every time the user request for it. From our Axios response, we just do this:
function randomJoke() {
    axios.get('https://api.chucknorris.io/jokes/random')
      .then(res => {
            const joke = res.data.value;

            const params = {
                icon_emoji: ':smile:'
            }
        
            bot.postMessageToChannel(
                'random',
                `:zap: ${joke}`,
                params
            );

      })
}

// Show Help
function runHelp() {
    const params = {
        icon_emoji: ':question:'
    }

    bot.postMessageToChannel(
        'random',
        `Type *@ninjaquotes* with *inspire me* to get an inspiring techie quote, *random joke* to get a Chuck Norris random joke and *help* to get this instruction again`,
        params
    );
}