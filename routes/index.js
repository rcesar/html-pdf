const express = require("express");
const crypto = require("crypto");
const router = express.Router();
const generatePdf = require("../controller/generatePdf");

router.get("/", (_, res) => {
  res.send({health: true})
});

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
