import { LightningElement , api } from 'lwc';
import NAME_FIELD from '@salesforce/schema/Program__c.Name';
//import {getfieldValue} from 'lightning/uiRecordApi'
export default class ViewRecordpage extends LightningElement {
    nameField = NAME_FIELD;
    // Flexipage provides recordId and objectApiName
    @api recordId;
    recordId = 'a015h00001zmXGtAAM';
    @api Program__c;

    handlerecordloaded(event)
    {
        recordId=this.event;
    }
}