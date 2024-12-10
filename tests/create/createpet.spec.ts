import test from "@playwright/test"
import { CreateNewPet } from "../../tasks/create/createNewPet"
import Logger from "../../utils/Logger"
import { CheckPetWasCreated } from "../../tasks/create/checkPetWasCreated"
import { NewPetRequestModel } from "../../models/newPetRequestModel"
import { faker } from '@faker-js/faker'

/*test.beforeEach(async ({ request }) => {
  Logger.info("running before test")
})*/

/*test.beforeAll('Setup', async({request}) =>{
  Logger.info('Running before all')

})*/

test('Should create a new pet', async ({ request }) => {

  const newPetRequest: NewPetRequestModel = {
    name: faker.animal.cat(),
    type: "Perro",
    age: 1
  }

  Logger.info("creating a new pet")

  const createNewPet = new CreateNewPet(request)
  const newPetResponse = await createNewPet.withInfo(newPetRequest)

  const checkPetWasCreated = new CheckPetWasCreated(newPetRequest)
  await checkPetWasCreated.withInfo(newPetResponse)
})


test('Should create a new pet 2', async ({ request }) => {

  const newPetRequest: NewPetRequestModel = {
    name: faker.animal.cat(),
    type: "Perro",
    age: 1
  }

  Logger.info("creating a new pet")

  const createNewPet = new CreateNewPet(request)
  const newPetResponse = await createNewPet.withInfo(newPetRequest)

  const checkPetWasCreated = new CheckPetWasCreated(newPetRequest)
  await checkPetWasCreated.withInfo(newPetResponse)
})


/*test.afterAll('Teardown', async({request}) =>{
  Logger.info('Running after all')

})*/

/*test.afterEach(async ({ request }) => {
  Logger.info("running after test")

})*/
