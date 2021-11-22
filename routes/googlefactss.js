"use strict"
const axios = require("axios")
const cheerio = require("cheerio")
const path = require("path")

const express = require("express")
let router = express.Router()

let baseUrl = "https://t.me"
let channelLink = path.basename(__filename, ".js")

router.use(function (req, res, next) {
    console.log(req.method)
    console.log(req.url, "@", Date.now())
    next()
})

router
    .route("/")
    .get((req, res) => {

        const baseTelegramUrl = `${baseUrl}/s/${channelLink}/`

        axios
            .get(baseTelegramUrl)
            .then((response) => {

                const html = response.data
                const $ = cheerio.load(html)
                const googleFacts = []

                const unwantedWords = /[@#]\w+\b/g

                const messageBubble = ".tgme_widget_message_bubble"
                const textBubble = ".js-message_text"
                const parent = ".service_message"
                const elementMultimedia = ".tgme_widget_message_link_preview"

                var hashTags = undefined
                var url = undefined

                $(messageBubble, html).each(function () {

                    const catchMessage = $(this)
                        .find(`${textBubble}:contains("#")`)
                        .text()
                    const filteredMessage = catchMessage.replace(unwantedWords, '')

                    const parentDiv = $(this)
                        .parent(parent)

                    url = $(this)
                        .find(`${elementMultimedia}`)
                        .attr("href")

                    hashTags = catchMessage
                        .split(' ')
                        .filter(hash => hash.startsWith('#'))

                    parentDiv.length < 0 ? null : newFact(filteredMessage)
                })

                function newFact(filteredMessage) {

                    filteredMessage.length > 0
                        ? googleFacts.push({

                            fact: filteredMessage,
                            media: url,
                            hashtags: hashTags

                        }) : null

                }
                res.send(googleFacts)

            }).catch((err) => console.log(err))
    })


module.exports = router
