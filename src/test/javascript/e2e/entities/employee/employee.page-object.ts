import { element, by, ElementFinder } from 'protractor';

export class EmployeeComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-employee div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class EmployeeUpdatePage {
    pageTitle = element(by.id('jhi-employee-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    emailInput = element(by.id('field_email'));
    firstNameInput = element(by.id('field_firstName'));
    lastNameInput = element(by.id('field_lastName'));
    langSelect = element(by.id('field_lang'));
    activeInput = element(by.id('field_active'));
    organizationSelect = element(by.id('field_organization'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setEmailInput(email) {
        await this.emailInput.sendKeys(email);
    }

    async getEmailInput() {
        return this.emailInput.getAttribute('value');
    }

    async setFirstNameInput(firstName) {
        await this.firstNameInput.sendKeys(firstName);
    }

    async getFirstNameInput() {
        return this.firstNameInput.getAttribute('value');
    }

    async setLastNameInput(lastName) {
        await this.lastNameInput.sendKeys(lastName);
    }

    async getLastNameInput() {
        return this.lastNameInput.getAttribute('value');
    }

    async setLangSelect(lang) {
        await this.langSelect.sendKeys(lang);
    }

    async getLangSelect() {
        return this.langSelect.element(by.css('option:checked')).getText();
    }

    async langSelectLastOption() {
        await this.langSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    getActiveInput() {
        return this.activeInput;
    }

    async organizationSelectLastOption() {
        await this.organizationSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async organizationSelectOption(option) {
        await this.organizationSelect.sendKeys(option);
    }

    getOrganizationSelect(): ElementFinder {
        return this.organizationSelect;
    }

    async getOrganizationSelectedOption() {
        return this.organizationSelect.element(by.css('option:checked')).getText();
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}
