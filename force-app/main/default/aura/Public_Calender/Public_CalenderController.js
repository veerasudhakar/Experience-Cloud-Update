({
    getEvents: function(component, event, helper) {
        var action = component.get("c.getPublicEvents");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.events", response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    }
})