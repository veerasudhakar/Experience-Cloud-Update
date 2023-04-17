import { LightningElement, track, wire } from 'lwc';
import fetchAccounts from '@salesforce/apex/FacultyCustomerDetails.getcustomercontacts';
import createAttendence from '@salesforce/apex/FacultyCustomerDetails.createAttendence';
import { updateRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';
import ACCOUNT_OBJECT from '@salesforce/schema/Enrolled_Course__c';
import TYPE_FIELD from '@salesforce/schema/Enrolled_Course__c.Attendence__c';
import { getPicklistValues, getObjectInfo } from 'lightning/uiObjectInfoApi';
 
const columns = [
    {
            label: 'Name',
            fieldName: 'Name',
            type: 'text',
            sortable: true
        },
        {
            label: 'Student Name',
            fieldName: 'customerName',
            type: 'text',
            sortable: true
        },
        {
            label: 'Course Name',
            fieldName: 'courseName',
            type: 'text',
            sortable: true
        },
        {
            label: 'Attendence Date',
            fieldName: 'AttendenceDate',
            disable:true
        },
    {
        label: 'Attendance',fieldName:'Attendence__c',type: 'picklistColumn', editable:{fieldName:'AttendenceDisable'}, typeAttributes: {
            placeholder: 'Choose Type', options: { fieldName: 'pickListOptions'}, 
            value:{fieldName:'attendenceType'}, // default value for picklist,
            context: { fieldName: 'Id' } ,
           // binding account Id with context variable to be returned back
        }
    }
]
 
export default class CustomDatatableDemo extends LightningElement {
  columns = columns;
    showSpinner = false;
    @track data = [];
    @track accountData;
    @track draftValues = [];
    lastSavedData = [];
    @track pickListOptions;
 
    @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
    objectInfo;
 
    //fetch picklist options
    @wire(getPicklistValues, {
        recordTypeId: "$objectInfo.data.defaultRecordTypeId",
        fieldApiName: TYPE_FIELD
    })
 
    wirePickList({ error, data }) {
        if (data) {
            this.pickListOptions = data.values;
        } else if (error) {
            console.log(error);
        }
    }
 
    //here I pass picklist option so that this wire method call after above method
    @wire(fetchAccounts, { pickList: '$pickListOptions' })
    accountData(result) {
        this.accountData = result;
        if (result.data) {
            this.data = JSON.parse(JSON.stringify(result.data));
  console.log('this.data Database',this.data)
            this.data.forEach(ele => {
                console.log('ele',JSON.stringify(ele))
                ele.pickListOptions = this.pickListOptions;
            })
            this.data=this.data.map(item=>{
                return {...item,'Attendence__c':item.attendenceType}
            })
 
            this.lastSavedData = JSON.parse(JSON.stringify(this.data));
 
        } else if (result.error) {
            this.data = undefined;
             console.log('Error Database',result.error)
        }
    };
 
    updateDataValues(updateItem) {
        let copyData = JSON.parse(JSON.stringify(this.data));
 
        copyData.forEach(item => {
            if (item.Id === updateItem.Id) {
                for (let field in updateItem) {
                    item[field] = updateItem[field];
                }
            }
        });
 
        //write changes back to original data
        this.data = [...copyData];
    }
 
    updateDraftValues(updateItem) {
        let draftValueChanged = false;
        let copyDraftValues = [...this.draftValues];
        //store changed value to do operations
        //on save. This will enable inline editing &
        //show standard cancel & save button
        copyDraftValues.forEach(item => {
            if (item.Id === updateItem.Id) {
                for (let field in updateItem) {
                    item[field] = updateItem[field];
                   // console.log('updateItem[field]',updateItem[field])
                }
                draftValueChanged = true;
            }
        });
 
        if (draftValueChanged) {
            this.draftValues = [...copyDraftValues];
        } else {
            this.draftValues = [...copyDraftValues, updateItem];
        }
    }
 
    //handler to handle cell changes & update values in draft values
    handleCellChange(event) {
        //this.updateDraftValues(event.detail.draftValues[0]);
        let draftValues = event.detail.draftValues;
        draftValues.forEach(ele=>{
            this.updateDraftValues(ele);
        })
    }
 
    handleSave(event) {
        this.showSpinner = true;
        this.saveDraftValues = this.draftValues;
 
        const recordInputs = this.saveDraftValues.slice().map(draft => {
            const fields = Object.assign({}, draft);
            return { fields };
        });
 console.log('recordInputs',JSON.stringify(recordInputs))
        // Updateing the records using the UiRecordAPi
        const promises = recordInputs.map(recordInput => updateRecord(recordInput));
        Promise.all(promises).then(res => {
            console.log('res',res)
            res.forEach(item=>{
                console.log('item.fields.id',item.id)
                createAttendence({EId:item.id}).then(result=>{
                console.log('success')
            this.draftValues = [];
            refreshApex(this.accountData)
            this.showToast('Success', 'Attendence Created Successfully!', 'success', 'dismissable');
            //return this.refresh();

            }).catch(error=>{
                console.log('error88',JSON.stringify(error))
            })
            })
        }).catch(error => {
            console.log('error',JSON.stringify(error));
            this.showToast('Error', 'An Error Occured!!', 'error', 'dismissable');
        }).finally(() => {
            this.draftValues = [];
            this.showSpinner = false;
        });
        //console.log('enrolls',entrolls)
    }
 
    handleCancel(event) {
        //remove draftValues & revert data changes
        this.data = JSON.parse(JSON.stringify(this.lastSavedData));
        this.draftValues = [];
    }
 
    showToast(title, message, variant, mode) {
        const evt = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
            mode: mode
        });
        this.dispatchEvent(evt);
    }
 
    // This function is used to refresh the table once data updated
    async refresh() {
        await refreshApex(this.accountData);
    }
}