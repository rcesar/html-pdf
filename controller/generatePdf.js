const puppeteer = require('puppeteer')

const generatePdf = async payload => {
  // Browser actions & buffer creator
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/chromium-browser',
    headless: 'new',
    ignoreDefaultArgs: ['--disable-extensions'],
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

  const page = await browser.newPage()
  await page.setContent(payload)
  const pdf = await page.pdf({
    format: 'a4',
    margin: { top: '1.27cm', right: '1.27cm', bottom: '1.27cm', left: '1.27cm' },
    printBackground: true
  })
  await page.close()
  await browser.close()
  // Return Buffer
  return pdf
}

module.exports = generatePdf
