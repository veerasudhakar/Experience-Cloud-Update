({
    fetchEvents: function(cmp){
        var action = cmp.get("c.fetchFromServer");
        action.setCallback(this, function(response){ 
            var state = response.getState();
            if(cmp.isValid() && state === "SUCCESS"){
                cmp.set("v.events",response.getReturnValue());
            }
        });
     },
     createCalendar: function(cmp,events){
        $('#calendar').fullCalendar({ });
     }
})