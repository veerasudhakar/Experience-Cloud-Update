import { LightningElement, track, wire } from 'lwc';
 import { NavigationMixin } from 'lightning/navigation';
 import { ShowToastEvent } from 'lightning/platformShowToastEvent';
 import { refreshApex } from '@salesforce/apex';
 import getJavaProgramList from '@salesforce/apex/ProgramHelper.getJavaProgramList';
 import deleteProgram1 from '@salesforce/apex/ProgramHelper.deleteProgram1';
 import { subscribe, unsubscribe, onError } from 'lightning/empApi';

 //define row actions
 const actions = [
    { label: 'View', name: 'view' },
    { label: 'Edit', name: 'edit' },
    { label: 'Delete', name: 'delete' }
 ];

 //define datatable columns with row actions
 const columns = [
    { label: 'Course Name', fieldName: 'courseName1' },
    { label: 'Name', fieldName: 'name1' },
    { label: 'Program Type', fieldName: 'programType1' },
    {
        type: 'action',
        typeAttributes: {
            rowActions: actions,
            menuAlignment: 'right'
        }
    }
 ];
 export default class recordsOfJava extends NavigationMixin(LightningElement) {
    @track data;
    @track columns = columns;
    @track showLoadingSpinner = false;
    recordId;    
    refreshTable;
    error;
    subscription = {};
    CHANNEL_NAME = '/event/RefreshDataTable__e';

    connectedCallback() {
        subscribe(this.CHANNEL_NAME, -1, this.handleEvent).then(response => {
            console.log('Successfully subscribed to channel');
            this.subscription = response;
        });

        onError(error => {
            console.error('Received error from server: ', error);
        });
    }

    handleEvent = event => {
        const refreshRecordEvent = event.data.payload;
        if (refreshRecordEvent.RecordId__c === this.recordId) {
            this.recordId='';
            return refreshApex(this.refreshTable);
        }
    }

    disconnectedCallback() {
        unsubscribe(this.subscription, () => {
            console.log('Successfully unsubscribed');
        });
    }

    // retrieving the accounts using wire service
    @wire(getJavaProgramList)
    accounts(result) {
        this.refreshTable = result;
        if (result.data) {
            this.data = result.data;
            this.error = undefined;

        } else if (result.error) {
            this.error = result.error;
            this.data = undefined;
        }
    }

    handleRowActions(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;
        this.recordId = row.Id;
        switch (actionName) {
            case 'view':
                this[NavigationMixin.Navigate]({
                    type: 'standard__recordPage',
                    attributes: {
                        recordId: row.Id,
                        actionName: 'view'
                    }
                });
                break;
            case 'edit':
                this[NavigationMixin.Navigate]({
                    type: 'standard__recordPage',
                    attributes: {
                        recordId: row.Id,
                        objectApiName: 'Program__c',
                        actionName: 'edit'
                    }
                });
                break;
            case 'delete':
                this.delAccount(row);
                break;
        }
    }

    delAccount(currentRow) {
        this.showLoadingSpinner = true;
        deleteAccount({ objaccount: currentRow }).then(result => {
            window.console.log('result^^' + result);
            this.showLoadingSpinner = false;
            this.dispatchEvent(new ShowToastEvent({
                title: 'Success!!',
                message: currentRow.Name + ' account deleted.',
                variant: 'success'
            }));
            return refreshApex(this.refreshTable);
        }).catch(error => {
            window.console.log('Error ====> ' + error);
            this.showLoadingSpinner = false;
            this.dispatchEvent(new ShowToastEvent({
                title: 'Error!!',
                message: JSON.stringify(error),
                variant: 'error'
            }));
        });
    }
 }