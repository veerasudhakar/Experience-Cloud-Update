public with sharing class FullCalendarController {
    
    public class EventException extends Exception {}
    
    /**
* @description: To retrieve the most recent events
*/
    @AuraEnabled(cacheable=true)
    public static List<Program__c> fetchEvents(String programType) {
        if(programType=='All')
        {
            return [SELECT Id, Name, Program_Type__c,Course__c,Contact__c, Program_Date__c,Email__c, Program_End_Date__c FROM Program__c ];
        }
        else{
            return [SELECT Id, Name, Program_Type__c,Course__c,Contact__c,Email__c, Program_Date__c, Program_End_Date__c FROM Program__c WHERE Program_Type__c =: programType];
            
        }
    }
    
    
    /*

@AuraEnabled(cacheable=true)
public static List<Program__c> fetchEventsByType(String programType) {
return [SELECT Id, Name, Program_Type__c,Course__c, Program_Date__c,Email__c, Program_End_Date__c FROM Program__c WHERE Program_Type__c =: programType];
}
*/
    /**
* @description To create an event from web component 
* @param event - json string with event details - title, start and end for now
*/
    @AuraEnabled
    public static Id createEvent(String event){
        
        //The following logic to be replaced with your respective event object
        if(String.isBlank(event)){
            return null;
        }
        Map<String, Object> eventMap = (Map<String, Object>) JSON.deserializeUntyped(event);
        
        Program__c newEvent = new Program__c();
        //newEvent.Name = eventMap.get('title') != null ? (String)eventMap.get('title') : null;
        //newEvent.Email__c = eventMap.get('email') != null ? (String)eventMap.get('email') : null;
        newEvent.Course__c = eventMap.get('course') != null ? (String)eventMap.get('course') : null;
        newEvent.Contact__c = eventMap.get('contact') != null ? (String)eventMap.get('contact') : null;
        
        
        String startdate = eventMap.get('start') != null ? 
            ((String)eventMap.get('start')).replace('T', ' ').replace('.000Z', '') : 
        null;
        String endDate = eventMap.get('end') != null ? 
            ((String)eventMap.get('end')).replace('T', ' ').replace('.000Z', '') : 
        null;
        
        newEvent.Program_Date__c = startdate != null ? Datetime.valueOfGmt(startdate) : null;
        newEvent.Program_End_Date__c = endDate != null ? Datetime.valueOfGmt(endDate) : null;
        newEvent.Program_Type__c = eventMap.get('ProgramType') != null ? (String)eventMap.get('ProgramType') : null;
        // newEvent.Course__c = eventMap.get('Course') != null ? (String)eventMap.get('Course') : null;
        // newEvent.Email__c = eventMap.get('Email') != null ? (String)eventMap.get('Email') : null;
        // newEvent.IsAllDayEvent = eventMap.get('start') != null ? eventMap.get('start') : null;
        insert newEvent;
        system.debug('newEvent'+newEvent);
        Program__c p=[Select Id,CreatedBy.Name,CreatedBy.Email,Email__c from Program__c where Id=:newEvent.Id][0];
        newEvent.Name=p.CreatedBy.Name;
        newEvent.Email__c=p.CreatedBy.Email;
        update newEvent;
        return newEvent.Id;
        
    }
    /**
* @description To delete an event from web component 
* @param eventid - event id to delete from the component
*/
    @AuraEnabled
    public static void deleteEvent(Id eventid) {
        
        if(eventid != null){
            delete [SELECT Id FROM Program__c Where Id=:eventid];
        }else{
            throw new EventException('Event id is not passed');
        }
        
    }
    @AuraEnabled(cacheable=true)
    public static Boolean getUserIds() {
        Boolean IsFaculty;
        if(UserInfo.getUserId()=='0055h000008q2EHAAY'||UserInfo.getUserId()=='0055h000007lSfWAAU'||UserInfo.getUserId()=='0055h000008qfyIAAQ'||UserInfo.getUserId()=='0055h000008qVlmAAE'||UserInfo.getUserId()=='0055h000008grnpAAA')
        {
            IsFaculty=true ;
        }
        else{
            IsFaculty=false;
        }
        return IsFaculty;
        
    }
}