import { LightningElement } from 'lwc';

import getDetailsByTypewithProspect from '@salesforce/apex/approvalHistoryclass.getApprovalHistory';


const c = [
    {label:'Object Name',fieldName:'ProgramName',type:'url',
    typeAttributes: { label:{fieldName:'objectnaem'},target:'__blank'} },
    {label:'Id',fieldName:'ids',type:'text'},
    {label:'Status',fieldName:'status',type:'text'},
    {label:'Approver Name',fieldName:'courseName',type:'text'},

    
     
  ];
  

export default class approvalHistoryComponent extends LightningElement {
    customer;
    error;
    col1=c;

    PythonHandler(event)
    {
        getDetailsByTypewithProspect().then(result=>{
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