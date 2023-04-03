import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
 
export default class navigateToSalesforceButton extends NavigationMixin(LightningElement) {
         
    handleLWCNavigate() {
        this[NavigationMixin.Navigate]({
            type: "standard__component",
            attributes: {
                componentName: "c__recordsOfSalesforce"
            },
            state: {
                c__amount: 1000
            }
        });
    }
         
}