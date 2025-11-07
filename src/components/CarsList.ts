import { Page, Locator } from '@playwright/test';
import { BasePage } from '../pages/base/basePage';
import { GarageLocators } from '../locators/Garage.locators';

export class CarsList extends BasePage {
    readonly carListUl: Locator;
    
    constructor(page: Page){
        super(page);

        this.carListUl = page.locator(GarageLocators.carListUl);
    }

    async createdCarExist(brand: string = 'BMW', model: string = '3'){
        const car = await this.findLiInList(this.carListUl, `${brand} ${model}`);

        await this.expectVisible(car, true)
    }
}