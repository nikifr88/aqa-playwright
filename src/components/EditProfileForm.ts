import { Page, Locator } from '@playwright/test';
import { BasePage } from '../pages/base/basePage';
import { ProfileLocators } from '../locators/Profile.locators';
import path from 'path';

export class EditProfileForm extends BasePage {
    readonly editProfileBtn: Locator;
    readonly nameInput: Locator;
    readonly lastNameInput: Locator;
    readonly countryInput: Locator;
    readonly birthdayInput: Locator;
    readonly photoFileInput: Locator;
    readonly saveBtn: Locator;
    readonly defaultImg: string;
    readonly changeImg: string;
    readonly userImg: Locator;
    readonly userNameP: Locator;
    readonly birthdayAndCountrySpans: Locator;
    
    constructor(page: Page){
        super(page);

        this.editProfileBtn = page.locator(ProfileLocators.editProfileBtn);
        this.nameInput = page.locator(ProfileLocators.nameInput);
        this.lastNameInput = page.locator(ProfileLocators.lastNameInput);
        this.countryInput = page.locator(ProfileLocators.countryInput);
        this.birthdayInput = page.locator(ProfileLocators.birthdayInput);
        this.photoFileInput = page.locator(ProfileLocators.photoFileInput);
        this.saveBtn = page.locator(ProfileLocators.saveBtn);
        this.userImg = page.locator(ProfileLocators.userImg);
        this.userNameP = page.locator(ProfileLocators.userNameP);
        this.birthdayAndCountrySpans = page.locator(ProfileLocators.birthdayAndCountrySpans);
        this.defaultImg = path.resolve(__dirname, '../fixtures/images/black.png');
        this.changeImg = path.resolve(__dirname, '../fixtures/images/white.png');
    }

    async editProfile(
        name: string = 'AQAName',
        last: string = 'AQALastName',
        country: string = 'Ukraine',
        birthday: string = '22.05.2020',
        defaultImg: boolean = true
    ){
        const photoPath = defaultImg ? this.defaultImg : this.changeImg;

        await this.click(this.editProfileBtn);
        await this.fill(this.nameInput, name);
        await this.fill(this.lastNameInput, last);
        await this.fill(this.countryInput, country);
        await this.fill(this.birthdayInput, birthday);
        await this.addFile(this.photoFileInput, photoPath);
        await this.click(this.saveBtn);
        await this.page.waitForTimeout(5000);
    }

    async checkDataProfile(
        name: string = 'AQAName AQALastName', 
        birthday: string = '22.05.2020', 
        country: string = 'Ukraine'
    ){
        await this.expectVisible(this.userNameP);
        await this.expectText(this.userNameP, name);
        await this.expectVisible(this.userImg);
        await this.expectText(this.birthdayAndCountrySpans.first(), birthday);
        await this.expectVisible(this.birthdayAndCountrySpans.first());
        await this.expectText(this.birthdayAndCountrySpans.nth(1), country);
        await this.expectVisible(this.birthdayAndCountrySpans.nth(1))
    }
}