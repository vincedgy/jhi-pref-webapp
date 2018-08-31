import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { PreferenceComponentsPage, PreferenceUpdatePage } from './preference.page-object';

describe('Preference e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let preferenceUpdatePage: PreferenceUpdatePage;
    let preferenceComponentsPage: PreferenceComponentsPage;

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Preferences', async () => {
        await navBarPage.goToEntity('preference');
        preferenceComponentsPage = new PreferenceComponentsPage();
        expect(await preferenceComponentsPage.getTitle()).toMatch(/prefWebApp.preference.home.title/);
    });

    it('should load create Preference page', async () => {
        await preferenceComponentsPage.clickOnCreateButton();
        preferenceUpdatePage = new PreferenceUpdatePage();
        expect(await preferenceUpdatePage.getPageTitle()).toMatch(/prefWebApp.preference.home.createOrEditLabel/);
        await preferenceUpdatePage.cancel();
    });

    it('should create and save Preferences', async () => {
        await preferenceComponentsPage.clickOnCreateButton();
        const selectedActive = preferenceUpdatePage.getActiveInput();
        if (await selectedActive.isSelected()) {
            await preferenceUpdatePage.getActiveInput().click();
            expect(await preferenceUpdatePage.getActiveInput().isSelected()).toBeFalsy();
        } else {
            await preferenceUpdatePage.getActiveInput().click();
            expect(await preferenceUpdatePage.getActiveInput().isSelected()).toBeTruthy();
        }
        await preferenceUpdatePage.setContentInput('content');
        expect(await preferenceUpdatePage.getContentInput()).toMatch('content');
        await preferenceUpdatePage.employeeSelectLastOption();
        await preferenceUpdatePage.businessServiceSelectLastOption();
        await preferenceUpdatePage.save();
        expect(await preferenceUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
