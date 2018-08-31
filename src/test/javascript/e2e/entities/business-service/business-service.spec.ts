import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { BusinessServiceComponentsPage, BusinessServiceUpdatePage } from './business-service.page-object';

describe('BusinessService e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let businessServiceUpdatePage: BusinessServiceUpdatePage;
    let businessServiceComponentsPage: BusinessServiceComponentsPage;

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load BusinessServices', async () => {
        await navBarPage.goToEntity('business-service');
        businessServiceComponentsPage = new BusinessServiceComponentsPage();
        expect(await businessServiceComponentsPage.getTitle()).toMatch(/prefWebApp.businessService.home.title/);
    });

    it('should load create BusinessService page', async () => {
        await businessServiceComponentsPage.clickOnCreateButton();
        businessServiceUpdatePage = new BusinessServiceUpdatePage();
        expect(await businessServiceUpdatePage.getPageTitle()).toMatch(/prefWebApp.businessService.home.createOrEditLabel/);
        await businessServiceUpdatePage.cancel();
    });

    it('should create and save BusinessServices', async () => {
        await businessServiceComponentsPage.clickOnCreateButton();
        await businessServiceUpdatePage.setNameInput('name');
        expect(await businessServiceUpdatePage.getNameInput()).toMatch('name');
        await businessServiceUpdatePage.setDescriptionInput('description');
        expect(await businessServiceUpdatePage.getDescriptionInput()).toMatch('description');
        const selectedActive = businessServiceUpdatePage.getActiveInput();
        if (await selectedActive.isSelected()) {
            await businessServiceUpdatePage.getActiveInput().click();
            expect(await businessServiceUpdatePage.getActiveInput().isSelected()).toBeFalsy();
        } else {
            await businessServiceUpdatePage.getActiveInput().click();
            expect(await businessServiceUpdatePage.getActiveInput().isSelected()).toBeTruthy();
        }
        await businessServiceUpdatePage.save();
        expect(await businessServiceUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
