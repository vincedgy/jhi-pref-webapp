import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { EmployeeComponentsPage, EmployeeUpdatePage } from './employee.page-object';

describe('Employee e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let employeeUpdatePage: EmployeeUpdatePage;
    let employeeComponentsPage: EmployeeComponentsPage;

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Employees', async () => {
        await navBarPage.goToEntity('employee');
        employeeComponentsPage = new EmployeeComponentsPage();
        expect(await employeeComponentsPage.getTitle()).toMatch(/prefWebApp.employee.home.title/);
    });

    it('should load create Employee page', async () => {
        await employeeComponentsPage.clickOnCreateButton();
        employeeUpdatePage = new EmployeeUpdatePage();
        expect(await employeeUpdatePage.getPageTitle()).toMatch(/prefWebApp.employee.home.createOrEditLabel/);
        await employeeUpdatePage.cancel();
    });

    it('should create and save Employees', async () => {
        await employeeComponentsPage.clickOnCreateButton();
        await employeeUpdatePage.setEmailInput('email');
        expect(await employeeUpdatePage.getEmailInput()).toMatch('email');
        await employeeUpdatePage.setFirstNameInput('firstName');
        expect(await employeeUpdatePage.getFirstNameInput()).toMatch('firstName');
        await employeeUpdatePage.setLastNameInput('lastName');
        expect(await employeeUpdatePage.getLastNameInput()).toMatch('lastName');
        await employeeUpdatePage.langSelectLastOption();
        const selectedActive = employeeUpdatePage.getActiveInput();
        if (await selectedActive.isSelected()) {
            await employeeUpdatePage.getActiveInput().click();
            expect(await employeeUpdatePage.getActiveInput().isSelected()).toBeFalsy();
        } else {
            await employeeUpdatePage.getActiveInput().click();
            expect(await employeeUpdatePage.getActiveInput().isSelected()).toBeTruthy();
        }
        await employeeUpdatePage.organizationSelectLastOption();
        await employeeUpdatePage.save();
        expect(await employeeUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
