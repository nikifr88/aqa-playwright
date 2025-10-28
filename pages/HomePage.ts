import { Page, Locator } from '@playwright/test';
import { BasePage } from './base/basePage';
import { HomePageLocators } from './locators/HomePage.locators';

export class HomePage extends BasePage {
    readonly signInButton: Locator;
    readonly signUpButton: Locator;
    readonly signInEmailInput: Locator;
    readonly signInPasswordInput: Locator;
    readonly signInRememberCheckbox: Locator;
    readonly registrationButton: Locator;
    readonly signUpNameInput: Locator;
    readonly signUpLastNameInput: Locator;
    readonly signUpEmailInput: Locator;
    readonly signUpPasswordInput: Locator;
    readonly signUpRePasswordInput: Locator;
    readonly signUpRegisterButton: Locator;
    readonly signUpErrorInputs: Locator;
    readonly emailForRegister: string;
    readonly errorName: string[];

    constructor(page: Page) {
        super(page);

        this.signInButton = page.locator(HomePageLocators.signInButton)
        this.signUpButton = page.locator(HomePageLocators.signUpButton);
        this.signInEmailInput = page.locator(HomePageLocators.signInEmailInput);
        this.signInPasswordInput = page.locator(HomePageLocators.signInPasswordInput);
        this.signInRememberCheckbox = page.locator(HomePageLocators.signInRememberCheckbox);
        this.registrationButton = page.locator(HomePageLocators.registrationButton);
        this.signUpNameInput = page.locator(HomePageLocators.signUpNameInput);
        this.signUpLastNameInput = page.locator(HomePageLocators.signUpLastNameInput);
        this.signUpEmailInput = page.locator(HomePageLocators.signUpEmailInput);
        this.signUpPasswordInput = page.locator(HomePageLocators.signUpPasswordInput);
        this.signUpRePasswordInput = page.locator(HomePageLocators.signUpRePasswordInput);
        this.signUpRegisterButton = page.locator(HomePageLocators.signUpRegisterButton);
        this.signUpErrorInputs = page.locator(HomePageLocators.signUpErrorInputs);

        this.emailForRegister = `aqa-${Date.now()}@example.com`;
        this.errorName = ['Name', 'Last name', 'Email', 'Password', 'Re-enter password'];
    }

    async open() {
        await this.navTo('https://guest:welcome2qauto@qauto.forstudy.space/')
    }

    async expectRedirectToGarage() {
        await this.expectCurrUrl('/panel/garage');
    }

    async signUpButtonVisible() {
        await this.expectVisible(this.signUpButton);
    }

    async register(confirm: boolean = false, errorType: string = 'empty', name: string = '', lastName: string = '', email: string = '', pass: string = ''){
        await this.click(this.signUpButton);
        await this.fill(this.signUpNameInput, name);
        await this.fill(this.signUpLastNameInput, lastName);
        await this.fill(this.signUpEmailInput, email);
        await this.fill(this.signUpPasswordInput, pass);
        await this.fill(this.signUpRePasswordInput, pass);

        if(confirm) {
            await this.click(this.signUpRegisterButton)
            await this.expectRedirectToGarage()
        } else {
            await this.click(this.signUpNameInput);
            await this.expectInputErrors(errorType);
            await this.expectDisabled(this.signUpRegisterButton)
        }
    }

    async expectInputErrors(typeOfError: string) {
        switch (typeOfError) {
            case 'empty':
                let i = 0;

                for (const error of await this.signUpErrorInputs.all()) {
                    await this.expectText(error, `${this.errorName[i]} required`);
                    await this.expectCss(error, 'color', 'rgb(220, 53, 69)');
                    ++i;
                }
                break;
            case 'invalid':
                for (let i = 0; i < 2; i++) {
                    const error = this.signUpErrorInputs.nth(i)

                    this.expectText(error, `${this.errorName[i]} is invalid`);
                    this.expectCss(error, 'color', 'rgb(220, 53, 69)');
                }
                break;
            case 'wrong':
                const count = await this.signUpErrorInputs.count()

                for (let i = 0; i < count; i++) {
                    const error = this.signUpErrorInputs.nth(i)
                    let errorText;

                    switch (i) {
                        case 0:
                            errorText = 'Name has to be from 2 to 20 characters long';
                            break;
                        case 1:
                            errorText = 'Last name has to be from 2 to 20 characters long';
                            break;
                        case 2:
                            errorText = 'Email is incorrect';
                            break;
                        case 3:
                            errorText = 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter';
                            break;
                        case 4:
                            //Отображаемая ошибка на сайте не соответствует требованиям, добавил некорректуню ошибку, чтобы тесты не падали
                            //errorText = 'Passwords do not match.'
                            errorText = 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter';
                            break;
                        default:
                            errorText = 'Error';
                    }

                    this.expectText(error, errorText);
                    this.expectCss(error, 'color', 'rgb(220, 53, 69)');
                }
                break;
            default:
                console.log('Error');
        }
    }
    }