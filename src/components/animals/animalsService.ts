import * as cheerio from 'cheerio'
import puppeteer from 'puppeteer'
import { Animal } from './animalsTypes'
import axios from 'axios'

const animalsService = {
  fetchSDHumaneSociety: async () => {
    const apiUrl = 'https://tje3xq7eu2.execute-api.us-west-1.amazonaws.com/production/search?AnimalType=ALL&Location=El%20Cajon%20Campus&Location=Escondido%20Campus&Location=Oceanside%20Campus%20-%20Cats/Small%20Animals&Location=Oceanside%20Campus%20-%20Dogs&Location=San%20Diego%20Campus%20-%205500&Location=San%20Diego%20Campus%20-%205485&Location=San%20Diego%20Campus%20-%20Behavior%20Center&Location=San%20Diego%20Campus%20-%205480&Location=Nursery%20-%20San%20Diego&Location=San%20Diego%20Campus%20-%205495&Location=San%20Diego%20Campus%20-%205525&StatusCategory=available'

    const petBaseUrl = 'https://www.sdhumane.org/adopt/available-pets/animal-single.html?petId='
    const imageBaseUrl = 'https://do31x39459kz9.cloudfront.net/'

    try {
      const response = await axios.get(apiUrl)

      const animalData = response?.data?.response

      let animals: Animal[] = []

      animalData.forEach((data: { [key: string]: any }) => {
        // const [imagePath] = data?.MainPhoto?.default
        // const imageUrl = !!imagePath ? `${imageBaseUrl}${imagePath}` : ''

        const animal = {
          breed: data.Breed.Primary,
          imageUrl: '',
          location: data.Location,
          name: data.Name,
          organization: 'San Diego Human Society',
          organizationPhoneNumber: '619-299-7012',
          organizationUrl: 'https://www.sdhumane.org',
          sex: data.Sex,
          type: data.AnimalType,
          url: `${petBaseUrl}${data.AnimalId}`,
        }

        animals.push(animal)
      })

      return animals
    } catch (error) {
      console.error(error)
    }
  }
  // scrapeSDHumanSociety: async () => {
  //   const url = 'https://www.sdhumane.org/adopt/available-pets/'

  //   try {
  //     const browser = await puppeteer.launch({ args: ['--no-sandbox'] })
  //     const page = await browser.newPage()
  //     await page.goto(url)
  //     await page.waitForSelector('.pet-item', { timeout: 10000})

  //     const data = await page.evaluate(() => {
  //       return document.querySelector('#animalGallery')?.innerHTML
  //     })

  //     await browser.close()

  //     if (!data) {
  //       throw new Error('No animals found')
  //     }

  //     const $ = cheerio.load(data)

  //     const animalElements = $('.pet-item')

  //     const animals: Animal[] = []

  //     animalElements.each((i, el) => {
  //       const animal = {
  //         name: '',
  //         type: '',
  //         breed: '',
  //         sex: '',
  //         url: '',
  //         location: '',
  //         imageUrl: '',
  //         organization: 'San Diego Human Society',
  //         organizationUrl: 'https://www.sdhumane.org',
  //         organizationPhoneNumber: '619-299-7012'
  //       }

  //       animal.name = $(el).find('.pet-info').find('h6').find('.petName').text() || ''
  //       animal.type = $(el).find('.pet-info').find('.pet-type').text() || ''
  //       animal.breed = $(el).find('.pet-info').find('.breed').text() || ''
  //       animal.sex = $(el).find('.pet-info').find('.gender').text() || ''
  //       animal.url = $(el).find('.pet-info').find('.learnMore').attr('href') || ''
  //       animal.imageUrl = $(el).find('.thumbnail').find('img').attr('src') || ''

  //       animals.push(animal)
  //     })

  //     return animals
  //   } catch (err) {
  //     console.error(err)
  //   }
  // }
}

export default animalsService;
