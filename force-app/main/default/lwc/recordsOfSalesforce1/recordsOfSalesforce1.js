/*import { LightningElement } from 'lwc';
 import { NavigationMixin } from 'lightning/navigation';
 import { ShowToastEvent } from 'lightning/platformShowToastEvent';
 import { refreshApex } from '@salesforce/apex';
 import getSalesforceProgramList from '@salesforce/apex/ProgramHelper.getSalesforceProgramList';
 import deleteProgram from '@salesforce/apex/ProgramHelper.deleteProgram';
 import { subscribe, unsubscribe, onError } from 'lightning/empApi';


 const c = [
    {label:'Program Name',fieldName:'courseName',type:'url',
    typeAttributes: { label:{fieldName:'Name'},target:'__blank'} },
    {label:'Faculty Name',fieldName:'name'},
    {label:'Program Type',fieldName:'programType'},
  ];

export default class RecordsOfSalesforce1 extends LightningElement {

    other;
    error;
    col1=c;

    handleRowActions(event)
    {
        getSalesforceProgramList().then((result)=>{
         let tempRecs = [];
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

}*/

/*import { LightningElement ,wire,track} from 'lwc';
import getSalesforceProgramList from '@salesforce/apex/ProgramHelper.getSalesforceProgramList';

export default class recordsOfSalesforce1 extends LightningElement {
    @track columns = [
        {
            label: 'Faculty Name',
            fieldName: 'name',
            type: 'url',
            typeAttributes: {label: { fieldName: 'name' }, 
            target: 'standard__recordPage'},
            sortable: true
        },
        {
            label: 'Course Name',
            fieldName: 'courseName',
            type: 'text',
            sortable: true
        },
        {
            label: 'Program Type',
            fieldName: 'programType',
            type: 'picklist',
            sortable: true
        }

    ];

    @track error;
    @track opportunities = [];


    @wire(getSalesforceProgramList)
    wiredOpps({error,data}) {
        if (data) {
            this.opportunities = data;
           
        } else if (error) {
            this.error = error;
            this.opportunities = undefined;
        }
    }
}*/


import { LightningElement } from 'lwc';
import getSalesforceProgramList from '@salesforce/apex/ProgramHelper.getSalesforceProgramList';

const c = [
    {label:'Course Name',fieldName:'ProgramName',type:'url',
    typeAttributes: { label:{fieldName:'courseName'},target:'__blank'} },
    {label:'Faculty Name',fieldName:'name',type:'text'},
    {label:'Program Type',fieldName:'programType',type:'Picklist'},
   
  ];
  

export default class recordsOfSalesforce1 extends LightningElement {

   
    other;
    error;
    col1=c;
    SalesforceHandler(event)
    {
        getSalesforceProgramList().then((result)=>{
         let tempRecs = [];
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