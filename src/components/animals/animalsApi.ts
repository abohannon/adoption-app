import express from 'express'
import { getAnimals } from './animalsController'

const router = express.Router()

router.get('/', getAnimals)

export default router
