import { LightningElement } from 'lwc';
import myResource from "@salesforce/resourceUrl/B2B";
import {NavigationMixin} from 'lightning/navigation';
export default class CardDetailspage extends NavigationMixin(LightningElement) {
    torontoImage = myResource;
   
    handleLWCNavigate(e){
     console.log("Calender..");
     this[NavigationMixin.Navigate]({
      type: "standard__webPage",
      attributes: {
        url: "/calendar"
      }
    });
  }
   /*
    veeran =false
    handleLWCNavigate() {

    this.veeran=true
    */
        /*let cmpDef = {
          componentDef: "c:veeranCalenderNew"
          
        };
    
        let encodedDef = btoa(JSON.stringify(cmpDef));
        this[NavigationMixin.Navigate]({
          type: "standard__webPage",
          attributes: {
            url: "/one/one.app#" + encodedDef
          }
        });  */
}