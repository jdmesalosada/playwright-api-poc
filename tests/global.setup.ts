import {request, test as setup} from '@playwright/test'
import Logger from '../utils/Logger'

setup('Create a new database', async({request})=> {
    Logger.info('Before all tests -> creating database')
})