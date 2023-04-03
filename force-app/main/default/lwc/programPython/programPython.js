import { LightningElement ,wire} from 'lwc';

import getDetailsByTypewithCustomer from '@salesforce/apex/CommunityPythonclass.getDetailsByTypewithCustomer';
//import getEntrolledCourse from '@salesforce/apex/EntrolledComponentController.getEntrolledCourse'
import createEntrolledCourse from '@salesforce/apex/EntrolledComponentController.createEntrolledCourse'
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';

const columns = [
    {label:'Course Name',fieldName:'ProgramName',type:'url',
    typeAttributes: { label:{fieldName:'CourseName'},target:'__blank'} },
    {label:'Faculty Name',fieldName:'Name',type:'text'},
    {label:'Program Type',fieldName:'ProgramType',type:'Picklist'},
    {label:'Program Date',fieldName:'ProgramDate',type:'Date/Time'},
    {label:'Program End Date',fieldName:'ProgramEndDate',type:'Date/Time'},
    { label:'Enroll Status',type: "button",typeAttributes: {  
        label: 'Enroll',  
        name: 'Enroll',  
        title: 'Enroll',
        variant:'brand' ,
        disabled:{ fieldName:'IsActive'},
        value: 'Enroll',  
        iconPosition: 'left'  
    } }]
  

export default class ProgramPython extends LightningElement {
    
    availableAccounts;
    error;
    columns = columns;
programList=[]
    @wire(getDetailsByTypewithCustomer )  
    getentrolled(result)
    {
        this.programList=result
        if(result.data)
        {
console.log('data',result.data)
            let tempRecs = [];
            result.data.forEach( ( record ) => {
                let tempRec = Object.assign( {}, record );  
                tempRec.ProgramName = '/' + tempRec.Id;
                tempRecs.push( tempRec );
                
            });
            this.availableAccounts = tempRecs;
            this.error = undefined;

        } else if (result.error ) {

            this.error = result.error;
            this.availableAccounts = undefined;

        }

    }

    
    
    
   /* @wire(getEntrolledCourse)
    getentrolled({data,error})
    {
        if(data)
        {

             
            let tempRecords = JSON.parse( JSON.stringify( data ) );
            console.log('tempRecords',tempRecords)
            tempRecords = tempRecords.map( row => {
                return {...row,CourseName:row.Course__r?.Name };
            })
            
             this.entrolledRecords = tempRecords;
        }
        if(error)
        {
            console.log('error',error)  
        }
    }*/
    callRowAction(event)
    {
        console.log('event',event.detail.action.name)
        console.log('row',event.detail.row.Id)
        createEntrolledCourse({progId:event.detail.row.Id}).then(result=>{
            console.log('result',result)
            this.ToastMethod('Success!!','Your Course Entroll Request Submitted to Faculty Successfully','success')
            /*const evt = new ShowToastEvent({
                title:'Success!!',
                message:'Your Course Entroll Request Submitted to Faculty Successfully',
                variant:'success'
            });
            this.dispatchEvent(evt);*/
            refreshApex(this.programList)
        }).catch(error=>{
            console.log('error',error)
            this.ToastMethod('Error!!','Your Course Entrollement Request Submition Failed due to'+error,'error')

    })
        
    }


    ToastMethod(title,message,variant)
    {
        const evt = new ShowToastEvent({
            title,
            message,
            variant
        });
        this.dispatchEvent(evt);  
    }
    
}