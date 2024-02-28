const express = require("express");
const crypto = require("crypto");
const router = express.Router();
const generatePdf = require("../controller/generatePdf");
const handlebars = require('handlebars')
const fs = require('fs');
const path = require("path");

handlebars.registerHelper('toFixed', function (value, places = 2) {
  if (!value) return value
  return `${Number(value).toFixed(places)}`
})

handlebars.registerHelper('toRound', function (value) {
  if (!value) return value
  return `${Math.round(value)}`
})

handlebars.registerHelper('reduce', function (value, factor) {
  if (!value) return value
  return `${value / factor}`
})

handlebars.registerHelper('cable', function (value) {
  return value === 'Fiber Core' ? 'Alma de Fibra' : 'Alma Cabo Independ.'
})

handlebars.registerHelper('percent', function (value) {
  return (value * 100).toFixed(2)
})

handlebars.registerHelper('formatDate', function (value) {
  const dt = new Date(value)
  const date = String(dt.getDate()).padStart(2, '0')
  const month = String(dt.getMonth() + 1).padStart(2, '0')
  const year = String(dt.getFullYear()).padStart(4, '0')

  return `${date}/${month}/${year}`
})

router.get("/", (_, res) => {
  res.send({health: true})
});

router.post('/memorial', async (req, res) => {
  const {data, title} = req.body
  let html = await fs.readFileSync(path.join(__dirname, '../templates/memorial.hbs'))
  html = handlebars.compile(html.toString())(data)
  let result = await generatePdf(html);
  console.log('title', title)
  let filename = `${title}-${+new Date()}`
  res.attachment(`${filename}.pdf`);
  res.contentType("application/pdf");
  res.send(result);
})

router.post("/generate-pdf", async (req, res) => {
  const {content, title} = req.body
  let result = await generatePdf(content);
  console.log('title', title)
  let filename = `${title}-${+new Date()}`
  res.attachment(`${filename}.pdf`);
  res.contentType("application/pdf");
  res.send(result);
});

router.get("*", (req, res) => {
  res.redirect("/");
});

module.exports = router;
