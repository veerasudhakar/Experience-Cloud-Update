import { LightningElement } from 'lwc';
import getDetailsByTypewithProspect from '@salesforce/apex/CummintyClass.getDetailsByTypewithProspect';
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
export default class EnrollJava extends LightningElement {
    other;
    customer;
    prospect;
    error;
    col1=c;
    JavaHandler(event)
    {
        getDetailsByTypewithProspect().then(result=>{
            let tempRecs = [];
        result.forEach((record) => 
        {
            let temprec = Object.assign({},record);
            temprec.ProgramName = '/' + temprec.Id;
            tempRecs.push(temprec);
            
        });
           this.prospect = tempRecs;
        }).catch(error=>{
            this.error=error;
        })

    }
}