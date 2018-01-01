'use strict'
const Slapp = require('slapp')
const express = require('express')
const BeepBoopConvoStore = require('slapp-convo-beepboop')
const BeepBoopContext = require('slapp-context-beepboop')
if (!process.env.PORT) throw Error('PORT missing but required')

var slapp = Slapp({ 
	convo_store: BeepBoopConvoStore(),
	context: BeepBoopContext() 

})

var app = slapp.attachToExpress(express())

slapp.message('^(hi|hello|hey).*', ['direct_mention', 'direct_message'], (msg, text, greeting) => {
  msg.say('how are you?').route('handleHowAreYou',{what: match1})  // where to route the next msg in the conversation
})

// register a route handler
slapp.route('handleHowAreYou', (msg,state) => {
  // respond with a random entry from array
  msg.say(['Hi' + state.what])
})

// attach handlers to an Express app
slapp.attachToExpress(require('express')()).listen(process.env.PORT)


console.log('Listening on :' + process.env.PORT)
app.listen(process.env.PORT)
