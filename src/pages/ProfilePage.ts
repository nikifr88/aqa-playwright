import { Page } from '@playwright/test';
import { BasePage } from './base/basePage.ts';
import { EditProfileForm } from '../components/editProfileForm.ts';
import { UserProfileCard } from '../components/UserProfileCard.ts';

export class ProfilePage extends BasePage {
    editProfileForm: EditProfileForm;
    userProfileCard: UserProfileCard;
    
    constructor(page: Page) {
        super(page);
        this.editProfileForm = new EditProfileForm(page);
        this.userProfileCard = new UserProfileCard(page);
    }

    async open() {
        await this.navTo('/panel/profile')
    }
}