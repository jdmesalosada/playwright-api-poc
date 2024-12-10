import { test, expect } from '@playwright/test';

test('Should update a pet', async ({ request }) => {

  const newPetRequest = {
    name: "Bingo3",
    type: "Perro",
    age: 1
  }

  const newPetResponse = await request.post('http://localhost:3000/pets', {
    data: newPetRequest
  })

  const newPetResponseJson = await newPetResponse.json()
  const petId = newPetResponseJson.data.id


  const updatePetRequest = {
    name: "Bingo3 Updated",
    type: "Loro",
    age: 5
  }

  const updatePetResponse = await request.put('http://localhost:3000/pets/' + petId, {
    data: updatePetRequest
  })

  console.log(JSON.stringify(await updatePetResponse.json()))

})

test('Should update partially a pet', async ({ request }) => {

  const newPetRequest = {
    name: "Bingo3",
    type: "Perro",
    age: 1
  }

  const newPetResponse = await request.post('http://localhost:3000/pets', {
    data: newPetRequest
  })

  const newPetResponseJson = await newPetResponse.json()
  const petId = newPetResponseJson.data.id


  const updatePartiallyPetRequest = {
    age: 5
  }

  const updatePetResponse = await request.patch('http://localhost:3000/pets/' + petId, {
    data: updatePartiallyPetRequest
  })

  console.log(JSON.stringify(await updatePetResponse.json()))

})


test('Should get a pet by id', async ({ request }) => {

  const newPetRequest = {
    name: "Bingo3",
    type: "Perro",
    age: 1
  }

  const newPetResponse = await request.post('http://localhost:3000/pets', {
    data: newPetRequest
  })

  const newPetResponseJson = await newPetResponse.json()
  const petId = newPetResponseJson.data.id

  const getPetByIdResponse = await request.get('http://localhost:3000/pets/' + petId)

  console.log("Response", await getPetByIdResponse.json())

})


test('Should get all pets', async ({ request }) => {

  const getAllPetsResponse = await request.get('http://localhost:3000/pets')
  console.log("Response", await getAllPetsResponse.json())

})

test('Should do basic authentication', async ({ request }) => {

  const credentialsBase64 = btoa('admin:password123')

  const basicAuthenticationResponse = await request.get('http://localhost:3000/protected-basic', {
    headers: {
      Authorization: `Basic ${credentialsBase64}`
    }
  })
  console.log("Response status", basicAuthenticationResponse.status())
  console.log("Response text", await basicAuthenticationResponse.text())

})

test('Should do bearer authorization', async ({ request }) => {

  const authenticationTokenResponse = await request.post('http://localhost:3000/login', {
    data: {
      "username": "automation"
    }
  })

  const jsonResponse = await authenticationTokenResponse.json()
  const token = jsonResponse.data.accessToken
  console.log(`Token: ${token}`)


  const bearerResponse = await request.get('http://localhost:3000/protected-bearer', {
    headers:{
      'authorization': `Bearer ${token}`
    }
  })

  expect(bearerResponse.status()).toBe(200)
  expect(await bearerResponse.text()).toBe('Hello automation, you have accessed a protected endpoint!')
})

