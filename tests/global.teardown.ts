import {request, test as teardown} from "@playwright/test"
import Logger from "../utils/Logger"

teardown('deleting database', async({request}) =>{

    Logger.info("After all ->  deleting database")
})