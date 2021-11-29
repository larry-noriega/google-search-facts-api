const cheerio = require('cheerio')

function newScrapedData(html, res) {
    const $ = cheerio.load(html)

    const googleFacts = []

    const messageBubble = ".tgme_widget_message_bubble"
    const textBubble = ".js-message_text"
    const parent = ".service_message"
    const elementMultimedia = ".tgme_widget_message_link_preview"

    $(messageBubble, html).each(function () {

        const parentDiv = $(this)
            .parent(parent)

        const catchMessage = $(this)
            .find(`${textBubble}:contains("#")`)
            .text()
            
        const hashTags = catchMessage
            .split(' ')
            .filter( hash => hash.startsWith('#') )

        const url = $(this)
            .find(`${elementMultimedia}`)
            .attr("href")
        
        const filteredFact = cleanFact(catchMessage)

        parentDiv.length < 0 ? null : newFact(filteredFact, url, hashTags)

    })

    function newFact(text, url, hashTags) {

        text.length > 0
            ? googleFacts.push({

                fact: text,
                media: url,
                hashTags: hashTags

            }) : null

    }

    function cleanFact(text) {

        var reg = /(?<fact>\w.+?)\s@(?<verbosity>\w.+#\w.+)/g

        let match = reg.exec(text)        

        if (match === null) {           
            return 0
        } else {
            const factFiltered = match[1]
            return factFiltered
        }            
    }

    return res.send(googleFacts)

}

module.exports = newScrapedData