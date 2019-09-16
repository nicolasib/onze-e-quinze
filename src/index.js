const Twitter = require('twitter')
require('dotenv').config()
const server = require('./server')
const CronJob = require('cron').CronJob
const cors = require('cors')

const cliente = new Twitter({
    consumer_key: process.env.consumer_key,
    consumer_secret: process.env.consumer_secret,
    access_token_key: process.env.access_token_key,
    access_token_secret: process.env.access_token_secret
})

server.use(cors())

const server_port = process.env.PORT || 80

server.get('/', (req, res) => {
    console.log('Requisição aceita')
    const job = new CronJob('00 31 16 * * 1-7', function(){
        const dadosFinais = require('../testeString/index')

        if(dadosFinais.domingo) cliente.tweetar(dadosFinais.domingo)
        else cliente.tweetar(montaMensagem(dadosFinais))
        
    }, function(){
        console.log(`Cron stopped!`)
    }, true, 'America/Sao_Paulo')

})

const job = new CronJob('00 00 09 * * 1-7', function(){
    const dadosFinais = require('../testeString/index')
    
    if(dadosFinais.domingo) cliente.tweetar(dadosFinais.domingo)
    else cliente.tweetar(montaMensagem(dadosFinais))

}, function(){
    console.log(`Cron stopped!`)
}, true, 'America/Sao_Paulo')


cliente.tweetar = function (tweet){
    console.log("tweet = "+tweet)
    cliente.post('statuses/update', { status: tweet }, function(error, tweet, response){
        if(error) console.log(error)
        else console.log('Tweet enviado!')
    })
}

function montaMensagem(obj){
    let msg = `Feijão: ${obj.feijao}\nPrato principal: ${obj.pratoPrincipal}\n`
    msg += `Opção vegetariana: ${obj.vegetariano}\nGuarnição: ${obj.guarnicao}\n`
    msg += `\nSobremesa: ${obj.sobremesa}\n\nBom apetite!`

    return msg
}

server.listen(server_port, function(error){
    console.log('Listening on port %d', server_port)
})

