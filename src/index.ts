import { chromium, devices } from 'playwright'

const iphone = devices[`iPhone 12 Pro`]

interface TakeScreenshotOptions {
  keyword: string
  saveName: string
  delay?: number
  prefix?: string
}

export async function getScreenshot() {
  const browser = await chromium.launch({ headless: false })
  const context = await browser.newContext({ ...iphone })

  async function take({
    keyword,
    saveName,
    delay = 1000,
    prefix = ``,
  }: TakeScreenshotOptions) {
    const page = await context.newPage()
    await page.goto(`https://www.baidu.com/s?word=${keyword}&ms=1`)
    await page.waitForTimeout(delay)

    await page.screenshot({ path: `screenshots/${prefix}${saveName}.png` })

    page.close()
  }

  await take({ keyword: `上海疫情`, saveName: `shanghai` })
  await take({ keyword: `西安疫情`, saveName: `shanxi` })
  await browser.close()
}

try {
  getScreenshot()
} catch (err) {
  console.log(err)
}
