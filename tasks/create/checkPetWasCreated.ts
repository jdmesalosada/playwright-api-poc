import test, { APIRequestContext, APIResponse, expect } from "@playwright/test";
import Logger from "../../utils/Logger";
import { NewPetResponseModel } from "../../models/newPetResponseModel";

export class CheckPetWasCreated {

    private expectedPet: any

    constructor(expectedPet: any) {
        this.expectedPet = expectedPet
    }

    public async withInfo(newPetResponse: APIResponse): Promise<void> {

         await test.step('Checking the pet was created', async () => {
            console.log(JSON.stringify(await newPetResponse.json()))

            const newPetJsonResponse = await newPetResponse.json()

            const newPetResponseModel = newPetJsonResponse as NewPetResponseModel
    
            const headers = newPetResponse.headersArray()
            headers.forEach(cabecera => console.log(`name: ${cabecera.name} value: ${cabecera.value}`))
    
            const keepAliveHeader = headers.filter(header => header.name === 'Keep-Alive')[0].value
            console.log('Keep Alive header value', keepAliveHeader)
    
            expect(newPetResponse.status()).toBe(201)
            expect(newPetJsonResponse.status).toBe("success")
            expect(newPetJsonResponse.message).toContain("Pet")
    
            expect(newPetResponseModel.data.name).toBe(this.expectedPet.name)
            expect(newPetResponseModel.data.type, "the pet type is not the expected").toBe(this.expectedPet.type)
    
            expect(newPetJsonResponse.data.id).toBeTruthy()
    
            console.log("status:", newPetJsonResponse.status)
            console.log("message:", newPetJsonResponse.message)
            console.log("data type:", newPetJsonResponse.data.type)
    
            Logger.error("this is a error")
            Logger.info("Pet was created successfully")
        })  
    }

}