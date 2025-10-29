import { Page } from '@playwright/test';
import { BasePage } from './base/basePage';
import { RegisterForm } from '../components/RegisterForm';

export class HomePage extends BasePage {
    registerForm: RegisterForm;

    constructor(page: Page) {
        super(page);
        this.registerForm = new RegisterForm(page);
    }

    async open() {
        await this.navTo('https://guest:welcome2qauto@qauto.forstudy.space/')
    }

}