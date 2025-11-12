import { APIRequestContext, Page } from '@playwright/test';
import { BasePage } from './base/basePage';
import { AddCarForm } from '../components/AddCarForm';
import { CarsList } from '../components/CarsList';
import { CarService } from '../service/car.service';

export class GaragePage extends BasePage {
    addCarForm: AddCarForm;
    carsList: CarsList;
    carService: CarService;
    
    constructor(page: Page, api: APIRequestContext) {
        super(page);

        this.addCarForm = new AddCarForm(page);
        this.carsList = new CarsList(page);
        this.carService = new CarService(api);
    }

    async open() {
        await this.navTo('/panel/garage')
    }
}