import { LightningElement } from 'lwc';
import {NavigationMixin} from 'lightning/navigation';
export default class ReturnHome extends NavigationMixin(LightningElement) {
		
  handleLWCNavigate1(e){
    console.log("Calender..");
    this[NavigationMixin.Navigate]({
     type: "standard__webPage",
     attributes: {
       url: "/calendar"
     }
   });
 }
}