import { test } from "../../src/fixtures/userGaragePage.fixture";

test.describe('Car form and List', () => {

    test('Car created', async({garagePage}) => {
        await garagePage.addCarForm.createCar()
    })
})