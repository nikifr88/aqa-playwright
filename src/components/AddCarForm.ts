import { Page, Locator } from '@playwright/test';
import { BasePage } from '../pages/base/basePage';
import { GarageLocators } from '../locators/Garage.locators';

export class AddCarForm extends BasePage {
    readonly addCarBtn: Locator;
    readonly brandCarSelect: Locator;
    readonly modelCarSelect: Locator;
    readonly mileageCarInput: Locator;
    readonly createCarBtn: Locator;

    constructor(page: Page){
        super(page);

        this.addCarBtn = page.locator(GarageLocators.addCarBtn);
        this.brandCarSelect = page.locator(GarageLocators.brandCarSelect);
        this.modelCarSelect = page.locator(GarageLocators.modelCarSelect);
        this.mileageCarInput = page.locator(GarageLocators.mileageCarInput);
        this.createCarBtn = page.locator(GarageLocators.createCarBtn);
    }

    async createCar(
        brand: 'Audi' | 'BMW' | 'Ford' | 'Porsche' | 'Fiat' = 'BMW', 
        model: string = '3', 
        mileage: number = 123
    ) {
        await this.click(this.addCarBtn);
        await this.select(this.brandCarSelect, brand);
        await this.select(this.modelCarSelect, model);
        await this.fill(this.mileageCarInput, mileage.toString());
        await this.click(this.createCarBtn);
    }
}