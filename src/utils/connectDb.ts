import mongoose from 'mongoose'
import CONFIG from '../config/environment.ts'
import { logger } from './logger.ts'

const uri: string = 'mongodb+srv://anton:7yPEP15swwmmOahh@cluster0.wcnp9wv.mongodb.net/web?retryWrites=true&w=majority'

mongoose
  .connect(CONFIG.db)
  .then(() => logger.info('Connect Mongo'))
  .catch((err) => {
    logger.error(err)
    process.exit(1)
  })
