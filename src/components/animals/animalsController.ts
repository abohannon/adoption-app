import { Request, Response, NextFunction } from 'express'
import animalsService from './animalsService'

export const getAnimals = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sdHumaneSocietyData = await animalsService.scrapeSDHumanSociety()

    return res.json(sdHumaneSocietyData)
  } catch (err) {
    return console.error(err)
  }
}
