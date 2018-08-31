import { element, by, ElementFinder } from 'protractor';

export class PreferenceComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-preference div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class PreferenceUpdatePage {
    pageTitle = element(by.id('jhi-preference-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    activeInput = element(by.id('field_active'));
    contentInput = element(by.id('field_content'));
    employeeSelect = element(by.id('field_employee'));
    businessServiceSelect = element(by.id('field_businessService'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    getActiveInput() {
        return this.activeInput;
    }
    async setContentInput(content) {
        await this.contentInput.sendKeys(content);
    }

    async getContentInput() {
        return this.contentInput.getAttribute('value');
    }

    async employeeSelectLastOption() {
        await this.employeeSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async employeeSelectOption(option) {
        await this.employeeSelect.sendKeys(option);
    }

    getEmployeeSelect(): ElementFinder {
        return this.employeeSelect;
    }

    async getEmployeeSelectedOption() {
        return this.employeeSelect.element(by.css('option:checked')).getText();
    }

    async businessServiceSelectLastOption() {
        await this.businessServiceSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async businessServiceSelectOption(option) {
        await this.businessServiceSelect.sendKeys(option);
    }

    getBusinessServiceSelect(): ElementFinder {
        return this.businessServiceSelect;
    }

    async getBusinessServiceSelectedOption() {
        return this.businessServiceSelect.element(by.css('option:checked')).getText();
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
