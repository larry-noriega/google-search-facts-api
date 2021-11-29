"use strict"
const axios = require("axios")
const cheerio = require("cheerio")
const path = require("path")

const express = require("express")
let router = express.Router()

let baseUrl = "https://t.me"
let channelLink = path.basename(__filename, ".js")

const scrape = require('../modules/processMessage')

router.use(function (req, res, next) {
    console.log(req.method)
    console.log(req.url, "@", Date.now())
    next()
})

router
    .route("/")
    .get((req, res) => {
        const baseTelegramUrl = `${baseUrl}/s/${channelLink}`
        console.log(baseTelegramUrl)
        axios
            .get(baseTelegramUrl)
            .then((response) => {

                const html = response.data
                scrape(html, res)              

            }).catch((err) => console.log(err))
    })

module.exports = router
