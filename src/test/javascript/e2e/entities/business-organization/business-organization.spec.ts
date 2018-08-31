import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { BusinessOrganizationComponentsPage, BusinessOrganizationUpdatePage } from './business-organization.page-object';

describe('BusinessOrganization e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let businessOrganizationUpdatePage: BusinessOrganizationUpdatePage;
    let businessOrganizationComponentsPage: BusinessOrganizationComponentsPage;

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load BusinessOrganizations', async () => {
        await navBarPage.goToEntity('business-organization');
        businessOrganizationComponentsPage = new BusinessOrganizationComponentsPage();
        expect(await businessOrganizationComponentsPage.getTitle()).toMatch(/prefWebApp.businessOrganization.home.title/);
    });

    it('should load create BusinessOrganization page', async () => {
        await businessOrganizationComponentsPage.clickOnCreateButton();
        businessOrganizationUpdatePage = new BusinessOrganizationUpdatePage();
        expect(await businessOrganizationUpdatePage.getPageTitle()).toMatch(/prefWebApp.businessOrganization.home.createOrEditLabel/);
        await businessOrganizationUpdatePage.cancel();
    });

    it('should create and save BusinessOrganizations', async () => {
        await businessOrganizationComponentsPage.clickOnCreateButton();
        await businessOrganizationUpdatePage.setNameInput('name');
        expect(await businessOrganizationUpdatePage.getNameInput()).toMatch('name');
        const selectedActive = businessOrganizationUpdatePage.getActiveInput();
        if (await selectedActive.isSelected()) {
            await businessOrganizationUpdatePage.getActiveInput().click();
            expect(await businessOrganizationUpdatePage.getActiveInput().isSelected()).toBeFalsy();
        } else {
            await businessOrganizationUpdatePage.getActiveInput().click();
            expect(await businessOrganizationUpdatePage.getActiveInput().isSelected()).toBeTruthy();
        }
        await businessOrganizationUpdatePage.save();
        expect(await businessOrganizationUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
