import { test } from "../../src/fixtures/userGaragePage.fixture";

test.describe('Car form and List', () => {

    test('Car created', async({garagePage}) => {
        await garagePage.addCarForm.createCar()
        await garagePage.carsList.deleteCar()
    })

    test('Create and delete car via api', async({garagePage}) => {
        await garagePage.carService.createCar();
        await garagePage.carService.carDelete(garagePage.carService.createdCar[0], true);
    })

    test('Not valid car create and delete via api', async({garagePage}) => {
        await garagePage.carService.createCar(666, 777, 33, false);
        await garagePage.carService.carDelete(-555, false);
    })
})