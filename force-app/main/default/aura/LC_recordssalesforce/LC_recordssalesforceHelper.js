({  
    pullData:function(component){
        component.set("v.isLoading", true);
        var action=component.get("c.getSalesforceProgramList");       
        action.setCallback(this,function(e){
            component.set("v.isLoading", false);
            if(e.getState()=='SUCCESS'){
                var results=e.getReturnValue();                 
                if(results.length>0){
                    component.set('v.results', results);                                                           
                }
                else{
                    component.set('v.results', []);                                        
                }
            }
            else{
                this.showToast("ERROR","error",JSON.stringify(e.getError()));   
            }
        });
        $A.enqueueAction(action);
    },
    
    viewRecord : function(component, event) {
        var row = event.getParam('row');
        var recordId = row.Id;
        var viewRec=$A.get("event.force:navigateToSObject");
        viewRec.setParams({
            "recordId": recordId,
            "slideDevName": "detail"
        });
        viewRec.fire();
    },
    
    editRecord : function(component, event) {
        var row = event.getParam('row');
        var recordId = row.Id;
        $A.get("e.force:editRecord").setParams({"recordId": recordId}).fire();
    },  
    
    deleteRecord : function(component, event) {
        component.set("v.isLoading", true);
        var accountRec = event.getParam('row');        
        var action = component.get("c.delAccount");
        action.setParams({
            "accountRec": accountRec
        });
        action.setCallback(this, function(response) {
            component.set("v.isLoading", false);            
            if (response.getState() === "SUCCESS" ) {
                var rows = component.get('v.results');
                var rowIndex = rows.indexOf(accountRec);
                rows.splice(rowIndex, 1);
                component.set('v.results', rows);
                this.showToast("Success!","success","The record has been delete successfully.");
            }
            else{
                this.showToast("ERROR","error",JSON.stringify(response.getError())); 
            }
        });
        $A.enqueueAction(action);
    },
    
    showToast:function(title,type,message){
        var toastEvent = $A.get("e.force:showToast");
        if(toastEvent){
            toastEvent.setParams({"title": title,"type": type,"message": message}).fire();
        }
        else{
            alert(message);
        }
    },
 })