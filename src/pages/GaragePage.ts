import { Page } from '@playwright/test';
import { BasePage } from './base/basePage';
import { AddCarForm } from '../components/AddCarForm';
import { CarsList } from '../components/CarsList';

export class GaragePage extends BasePage {
    addCarForm: AddCarForm;
    carsList: CarsList;
    
    constructor(page: Page) {
        super(page);

        this.addCarForm = new AddCarForm(page);
        this.carsList = new CarsList(page);
    }

    async open() {
        await this.navTo('/panel/garage')
    }
}