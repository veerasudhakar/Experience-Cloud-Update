({
	afterScriptsLoaded: function(cmp,evt,helper){
     var events = cmp.get("v.events");
     if(events == null)
      {
         helper.fetchEvents(cmp);
      }
      helper.createCalendar(cmp,events);
    }
    
})