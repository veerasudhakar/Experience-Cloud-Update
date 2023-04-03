import { LightningElement ,api, wire, track} from 'lwc';
import myCourses from '@salesforce/apex/registeredCourses.myCourses';
export default class myRegisteredCourses extends LightningElement {
    @track columns = [{
            label: 'Enroll Num',
            fieldName: 'name',
            
            
        },
        {
            label: 'Faculty Name',
            fieldName: 'facultyname',
            
            
        },
        {
            label: 'Course Name',
            fieldName: 'program',
            
            
        },
            ];
 
    @track error;
    @track accList ;
    @wire(myCourses)
    wiredAccounts({
        error,
        data
    }) {
        if (data) {
            this.accList = data;
        } else if (error) {
            this.error = error;
        }
    }
}