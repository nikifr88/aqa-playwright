import { Page, Locator } from '@playwright/test';
import { BasePage } from '../pages/base/basePage';
import { GarageLocators } from '../locators/Garage.locators';

export class CarsList extends BasePage {
    readonly carListUl: Locator;
    readonly carEditBtns: Locator;
    readonly removeCarBtn: Locator;
    readonly approveRemoveBtn: Locator;
    
    constructor(page: Page){
        super(page);

        this.carListUl = page.locator(GarageLocators.carListUl);
        this.carEditBtns = page.locator(GarageLocators.carEditBtns)
        this.removeCarBtn = page.locator(GarageLocators.removeCarBtn);
        this.approveRemoveBtn = page.locator(GarageLocators.approveRemoveBtn);
    }

    async deleteCar(brand: string = 'BMW', model: string = '3'){
        const car = await this.findLiInList(this.carListUl, `${brand} ${model}`);

        await this.expectVisible(car, true);
        await this.click(this.carEditBtns.first());
        await this.click(this.removeCarBtn);
        await this.click(this.approveRemoveBtn)
    }
}