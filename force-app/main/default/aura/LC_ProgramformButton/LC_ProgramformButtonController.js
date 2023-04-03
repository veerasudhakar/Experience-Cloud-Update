({
    openModel: function(component, event, helper) {
      // Set isModalOpen attribute to true
      component.set("v.isModalOpen", true);
        component.set("v.hidebutton", false);
   },
  
   closeModel: function(component, event, helper) {
      // Set isModalOpen attribute to false  
      component.set("v.isModalOpen", false);
       component.set("v.isModalOpen1", true);
       
   },
  
   /*submitDetails: function(component, event, helper) {
      // Set isModalOpen attribute to false
      //Add your code to call apex method or do some processing
      component.set("v.isModalOpen", false);
   },*/

    navigate1 : function(component, event, helper){
       
        var urlEvent = $A.get("e.force:navigateToURL");    
        urlEvent.setParams({"url": "https://wissen-2e-dev-ed.develop.my.site.com/CustomerNewPortal1/s/login/?startURL=program-offerings"});  
        urlEvent.fire();
    },
    
    /*openModel2 : function(component, event, helper){
        
       // component.set("v.hidebutton", true);
       component.set("v.isModalOpen1", true);
       
         /*var navService = component.find("navService");        
        var pageReference = {
            type:'standard__objectPage',         
            attributes: {              
                //"recordId": component.get("v.recordId"),
                actionName: "list",               
                objectApiName:"Program__c"              
            }        
        };
                
        component.set("v.pageReference", pageReference);
            
        var pageReference = component.get("v.pageReference");
        navService.navigate(pageReference); 
   
       
    },*/

    
    init: function(component, event, helper)
    {
        var userId = $A.get("$SObjectType.CurrentUser.Id");
        if(userId!=''&&userId!=null){
            $A.util.addClass(component.find("toggle2"), "slds-hide");
            
        }
        else
        {
             $A.util.addClass(component.find("toggle1"), "slds-hide");
            
        }
    
}
 
    
})