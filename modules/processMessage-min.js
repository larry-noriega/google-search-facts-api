const cheerio=require("cheerio");function newScrapedData(e,t){const s=cheerio.load(e),n=[];return s(".tgme_widget_message_bubble",e).each((function(){const e=s(this).parent(".service_message"),t=s(this).find('.js-message_text:contains("#")').text(),i=t.split(" ").filter((e=>e.startsWith("#"))),r=s(this).find(".tgme_widget_message_link_preview").attr("href"),a=function(e){let t=/(?<fact>\w.+?)\s@(?<verbosity>\w.+#\w.+)/g.exec(e);if(null===t)return 0;return t[1]}(t);!(e.length<0)&&function(e,t,s){e.length>0&&n.push({fact:e,media:t,hashTags:s})}(a,r,i)})),t.send(n)}module.exports=newScrapedData;