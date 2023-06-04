trigger AccountTrigger on Account (after insert) {
    if(Trigger.IsInsert && Trigger.ISAfter){
        AccountTriggerHandler.handleAfterInsert(Trigger.new);
    }
}