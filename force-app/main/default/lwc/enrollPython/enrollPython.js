import { LightningElement } from 'lwc';
import getDetailsByTypewithCustomer from '@salesforce/apex/CummintyClass.getDetailsByTypewithCustomer';
const c = [
    {label:'Course Name',fieldName:'ProgramName',type:'url',
    typeAttributes: { label:{fieldName:'Course_Name__c'},target:'__blank'} },
    {label:'Faculty Name',fieldName:'Name',type:'text'},
    {label:'Program Type',fieldName:'Program_Type__c',type:'Picklist'},
    {label:'Program Date',fieldName:'Program_Date__c',type:'Date/Time'},
    {label:'Program End Date',fieldName:'Program_End_Date__c',type:'Date/Time'},
    { label:'Enroll Status',type: "button",typeAttributes: {  
        label: 'Enroll',  
        name: 'Enroll',  
        title: 'Enroll',
        variant:'brand' ,
        disabled: false,  
        value: 'Enroll',  
        iconPosition: 'left'  
    } }
    
 ];

export default class EnrollPython extends LightningElement {
  other;
  customer;
  prospect;
  error;
  col1=c;
    PythonHandler(event)
    {
        getDetailsByTypewithCustomer().then(result=>{
          let tempRecs = [];
        result.forEach((record) => 
        {
            let temprec = Object.assign({},record);
            temprec.ProgramName = '/' + temprec.Id;
            tempRecs.push(temprec);
            console.log('python'+tempRecs);
            
        });
         this.customer = tempRecs;
         console.log(this.customer);
        }).catch(error=>{
            this.error=error;
        })

    }
}