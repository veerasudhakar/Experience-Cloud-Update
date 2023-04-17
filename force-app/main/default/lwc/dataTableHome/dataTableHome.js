import { LightningElement,api,wire} from 'lwc';
import getCourse from '@salesforce/apex/getCourseFromRecordPage.getCourse';
export default class DataTableHome extends LightningElement {
    @api recordId;
    name = '';
    connectedCallback(){
        console.log('recordId....'+this.recordId);
    }
    @wire(getCourse, { recId: '$recordId'})
    getCourse({data,error}){
        if(data){
            this.name = data;
        }
    }
}