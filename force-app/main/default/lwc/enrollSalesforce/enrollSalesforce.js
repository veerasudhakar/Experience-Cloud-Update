import { LightningElement } from 'lwc';

import getDetailsByTypewithOther from '@salesforce/apex/CummintyClass.getDetailsByTypewithOther';

const c = [
    {label:'Course Name',fieldName:'ProgramName',type:'url',
    typeAttributes: { label:{fieldName:'Course_Name__c'},target:'__blank'} },
    {label:'Faculty Name',fieldName:'Name',type:'text'},
    {label:'Program Type',fieldName:'Program_Type__c',type:'Picklist'},
    {label:'Program Date',fieldName:'Program_Date__c',type:'Date/Time'},
    {label:'Program End Date',fieldName:'Program_End_Date__c',type:'Date/Time'},
    {label:'Enroll Status',type: "button",typeAttributes: {  
        label: 'Enroll',  
        title: 'Enroll',
        variant:'brand' ,
        disabled: false,  
        iconPosition: 'left'  
    } }
    
 ];
  
export default class EnrollSalesforce extends LightningElement {
    
    other;
    customer;
    prospect;
    error;
    col1=c;
    SalesforceHandler(event)
    {
        getDetailsByTypewithOther().then((result)=>{
         let tempRecs = [];
         console.log('result salesforce')
         result.forEach((record) => 
         {
              let temprec = Object.assign({},record);
              temprec.ProgramName = '/' + temprec.Id;
              tempRecs.push(temprec);
            
         });
         this.other = tempRecs;
         this.error = undefined;
        }).catch((error)=>{
          this.error = error;
        });
        
       
    }
}