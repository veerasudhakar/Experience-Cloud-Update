import { LightningElement } from "lwc";
import { NavigationMixin } from "lightning/navigation";

export default class NavigateFromLWC extends NavigationMixin(LightningElement) {
  navigateWithoutAura() {
    let cmpDef = {
      componentDef: "c:salesforce"
    };

    let encodedDef = btoa(JSON.stringify(cmpDef));
    this[NavigationMixin.Navigate]({
      type: "standard__webPage",
      attributes: {
        url: "/one/one.app#" + encodedDef
      }
    });
  }
  navigateWithoutAura1() {
    let cmpDef = {
      componentDef: "c:java"
    };

    let encodedDef = btoa(JSON.stringify(cmpDef));
    this[NavigationMixin.Navigate]({
      type: "standard__webPage",
      attributes: {
        url: "/one/one.app#" + encodedDef
      }
    });
  }
  navigateWithoutAura2() {
    let cmpDef = {
      componentDef: "c:Python"
    };

    let encodedDef = btoa(JSON.stringify(cmpDef));
    this[NavigationMixin.Navigate]({
      type: "standard__webPage",
      attributes: {
        url: "/one/one.app#" + encodedDef
      }
    });
  }


}