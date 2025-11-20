import { Page } from '@playwright/test';
import { BasePage } from './base/basePage.ts';
import { RegisterForm } from '../components/RegisterForm.ts';

export class HomePage extends BasePage {
    registerForm: RegisterForm;

    constructor(page: Page) {
        super(page);
        this.registerForm = new RegisterForm(page);
    }

    async open() {
        await this.navTo('/')
    }

}