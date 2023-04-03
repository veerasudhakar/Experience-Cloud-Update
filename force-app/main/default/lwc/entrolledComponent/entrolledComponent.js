import { LightningElement,wire} from 'lwc';
/*import ENTROLLED_OBJECT from '@salesforce/schema/Enrolled_Course__c';
import CONTACT_FIELD from '@salesforce/schema/Enrolled_Course__c.Contact__c';
import PROGRAM_FIELD from '@salesforce/schema/Enrolled_Course__c.Program__c';
import EMAIL_FIELD from '@salesforce/schema/Enrolled_Course__c.Email__c';
import STATUS_FIELD from '@salesforce/schema/Enrolled_Course__c.Status__c';*/
import getEntrolledCourse from '@salesforce/apex/EntrolledComponentController.getEntrolledCourse'
import createEntrolledCourse from '@salesforce/apex/EntrolledComponentController.createEntrolledCourse'
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';
export default class EntrolledComponent extends LightningElement {
    // @track isShowModal = false;

    // showModalBox() {  
    //     this.isShowModal = true;
    // }

    // hideModalBox() {  
    //     this.isShowModal = false;
    // }

   /* @api objName=ENTROLLED_OBJECT
    fields=[CONTACT_FIELD,PROGRAM_FIELD,EMAIL_FIELD,STATUS_FIELD]
    handleSuccess(event)
    {
        console.log('event.detail.Id',event.detail.id)
    }*/
    entrolledRecords
 columns = [  
        { label: 'Course Name', fieldName: 'CourseName' },
        { label: 'Faculty Name', fieldName: 'Name' },
        { label: 'Program Type', fieldName: 'ProgramType' },
        { label: 'Program Date', fieldName: 'ProgramDate' },  
        { label: 'Program EndDate', fieldName: 'ProgramEndDate' },  
        { label:'Enroll Status',type: "button",typeAttributes: {  
            label: 'Enroll',  
            name: 'Enroll',  
            title: 'Enroll',
            variant:'brand' ,
            disabled: { fieldName:'IsActive'},
            value: 'Enroll',  
            iconPosition: 'left'  
        } }
    ];  
    
    connectedCallback() {
        
    }
    programList=[]
    @wire(getEntrolledCourse)
    getentrolled(result)
    {
        this.programList=result
        if(result.data)
        {


            let tempRecords = JSON.parse( JSON.stringify( result.data ) );
            console.log('tempRecords',tempRecords)
            /*tempRecords = tempRecords.map( row => {
                return {...row,CourseName:row.Course__r?.Name };
            })*/
            
             this.entrolledRecords = tempRecords;
        }
        if(result.error)
        {
            console.log('error',error)  
        }
    }
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