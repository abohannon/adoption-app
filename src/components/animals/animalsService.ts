import * as cheerio from 'cheerio'
import puppeteer from 'puppeteer'
import { Animal } from './animalsTypes'

const animalsService = {
  scrapeSDHumanSociety: async () => {
    const url = 'https://www.sdhumane.org/adopt/available-pets/'

    try {
      const browser = await puppeteer.launch()
      const page = await browser.newPage()
      await page.goto(url)
      await page.waitForSelector('.pet-item', { timeout: 10000})

      const data = await page.evaluate(() => {
        return document.querySelector('#animalGallery')?.innerHTML
      })

      await browser.close()

      if (!data) {
        throw new Error('No animals found')
      }

      const $ = cheerio.load(data)

      const animalElements = $('.pet-item')

      const animals: Animal[] = []

      animalElements.each((i, el) => {
        const animal = {
          name: '',
          type: '',
          breed: '',
          sex: '',
          url: '',
          location: '',
          imageUrl: '',
          organization: 'San Diego Human Society',
          organizationUrl: 'https://www.sdhumane.org',
          organizationPhoneNumber: '619-299-7012'
        }

        animal.name = $(el).find('.pet-info').find('h6').find('.petName').text() || ''
        animal.type = $(el).find('.pet-info').find('.pet-type').text() || ''
        animal.breed = $(el).find('.pet-info').find('.breed').text() || ''
        animal.sex = $(el).find('.pet-info').find('.gender').text() || ''
        animal.url = $(el).find('.pet-info').find('.learnMore').attr('href') || ''
        animal.imageUrl = $(el).find('.thumbnail').find('img').attr('src') || ''

        animals.push(animal)
      })

      return animals
    } catch (err) {
      console.error(err)
    }
  }
}

export default animalsService;
