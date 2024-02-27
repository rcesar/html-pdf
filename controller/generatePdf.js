const puppeteer = require('puppeteer')

const generatePdf = async payload => {
  // Browser actions & buffer creator
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'] // SEE BELOW WARNING!!!
  })

  const page = await browser.newPage()
  await page.setContent(payload)
  const pdf = await page.pdf({
    format: 'a4',
    margin: { top: '1.27cm', right: '1.27cm', bottom: '1.27cm', left: '1.27cm' },
    printBackground: true
  })
  await browser.close()
  // Return Buffer
  return pdf
}

module.exports = generatePdf
