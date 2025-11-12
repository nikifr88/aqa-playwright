import {
    APIRequestContext,
    expect
} from "@playwright/test";

export class CarService {

    readonly createdCar: number[];

    constructor(private api: APIRequestContext) {
        this.createdCar = [];
    }

    async createCar(
        brandID: number = 1,
        modelID: number = 1,
        mileage: number = 1,
        valid: boolean = true
    ) {

        const resp = await this.api.post('/api/cars', {
            data: {
                "carBrandId": brandID,
                "carModelId": modelID,
                "mileage": mileage
            }
        });
        const respBody = await resp.json();

        expect(resp.status()).toBe(valid ? 201 : 404)

        if (valid) {
            this.createdCar.push(respBody.data.id)
            expect(respBody.data.carBrandId).toBe(brandID);
            expect(respBody.data.carModelId).toBe(modelID);
            expect(respBody.data.mileage).toBe(modelID);
        } else {
            expect(respBody.status).toBe('error');
            expect(respBody.message).toBe('Brand not found')
        }
    }

    async carDelete(id: number, valid: boolean = true){
        const resp = await this.api.delete(`/api/cars/${id}`);
        const respBody = await resp.json();

        expect(resp.status()).toBe(valid ? 200 : 404)

        if(valid){
            expect(respBody.status).toBe('ok');
            expect(respBody.data.carId).toBe(id);
        } else {
            expect(respBody.status).toBe('error');
            expect(respBody.message).toBe('Car not found')
        }
    }
}