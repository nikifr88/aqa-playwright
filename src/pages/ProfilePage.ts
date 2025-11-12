import { Page } from '@playwright/test';
import { BasePage } from './base/basePage';
import { EditProfileForm } from '../components/editProfileForm';
import { UserProfileCard } from '../components/UserProfileCard';

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