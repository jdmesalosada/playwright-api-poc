import test, { expect } from "@playwright/test"
import { CreateNewPet } from "../../tasks/create/createNewPet"
import Logger from "../../utils/Logger"
import { CheckPetWasCreated } from "../../tasks/create/checkPetWasCreated"
import { NewPetRequestModel } from "../../models/newPetRequestModel"
import { faker } from '@faker-js/faker'
import exp from "constants"

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

test('Should create a new pet - public', {tag: '@prod'}, async ({ request }) => {

 const createPetResponse = await request.post('https://petstore.swagger.io/v2/pet', {
  data: {
    "id": 0,
    "category": {
      "id": 0,
      "name": "string"
    },
    "name": "doggie",
    "photoUrls": [
      "string"
    ],
    "tags": [
      {
        "id": 0,
        "name": "string"
      }
    ],
    "status": "available"
  }
 })

 expect(createPetResponse.status()).toBe(200)

 const createPetResponseJson = await createPetResponse.json()
 expect(createPetResponseJson.id).toBeTruthy()

})




/*test.afterAll('Teardown', async({request}) =>{
  Logger.info('Running after all')

})*/

/*test.afterEach(async ({ request }) => {
  Logger.info("running after test")

})*/
