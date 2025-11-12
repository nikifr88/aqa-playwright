import { Page, Locator } from '@playwright/test';
import { BasePage } from '../pages/base/basePage';
import { ProfileLocators } from '../locators/Profile.locators';
import { mockProfile } from '../mocks/profile.mock';

export class UserProfileCard extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async mockProfileData(
        name: string, 
        lastName: string, 
        dateBirth: string,
        country: string
    ){
        mockProfile(this.page, name, lastName, dateBirth, country);
    }
}