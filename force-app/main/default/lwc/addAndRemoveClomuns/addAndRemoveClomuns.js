import { LightningElement, wire } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';

export default class AccountTable extends LightningElement {
    columns = [
        { label: 'Name', fieldName: 'Name', display: true },
        { label: 'Industry', fieldName: 'Industry', display: true },
        { label: 'Phone', fieldName: 'Phone', display: true },
        { label: 'Billing City', fieldName: 'BillingCity', display: true }
    ];
    columnOptions = this.columns.map(col => {
        return { label: col.label, value: col.fieldName };
    });
    selectedColumns = this.columns.filter(col => col.display).map(col => col.fieldName);
    data = [];

    @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
    accountInfo;

    get tableColumns() {
        return this.columns.filter(col => this.selectedColumns.includes(col.fieldName)).map(col => {
            return { label: col.label, fieldName: col.fieldName };
        });
    }

    handleCheckboxChange(event) {
        this.selectedColumns = event.detail.value;
        this.columns.forEach(col => {
            col.display = this.selectedColumns.includes(col.fieldName);
        });
    }
}