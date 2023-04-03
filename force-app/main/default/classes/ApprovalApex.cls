public with sharing class  ApprovalApex {

 @AuraEnabled(cacheable=true)
   public static List<ProcessInstance> getprocessInsta(){
    
        return [SELECT Id, TargetObjectid, Status,TargetObject.name,(select id,actor.name from Workitems),(SELECT Id, StepStatus, Comments,Actor.Name FROM Steps) FROM ProcessInstance];
    
   }
}