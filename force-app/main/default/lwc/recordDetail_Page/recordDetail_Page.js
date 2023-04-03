import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
// import Name from '@salesforce/schema/Program__c.Name';
import FacultyName from '@salesforce/schema/Program__c.Faculty_Name__c';
import ProgramTime from '@salesforce/schema/Program__c.Program_Time__c';

export default class recordDetail_Page extends LightningElement {
    @api recordId;
    @wire(getRecord, { recordId: '$recordId', fields: [FacultyName, ProgramTime] })
    record;

    get Faculty_Name__c() {
        return getFieldValue(this.record.data,FacultyName);
    }

    get Program_Time__c() {
        return getFieldValue(this.record.data,ProgramTime);
    }
  
}