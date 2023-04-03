public with sharing class approvalHistoryclass {
    /*@AuraEnabled(cacheable=true)
    public static List<ProcessInstance> getDetailsByTypewithProspect()
    {
        return [SELECT Id,TargetObjectid, Status,
                (select id,actor.name from Workitems),
                (SELECT Id, StepStatus, Comments,Actor.Name FROM Steps) FROM ProcessInstance];
        
    }*/

    @AuraEnabled(cacheable=true)
    public static List<Tpswrapper> getApprovalHistory(){
      List<ProcessInstanceWorkitem> pInstance = New List<ProcessInstanceWorkitem>([select id , actor.name,ProcessInstance.Status,ProcessInstance.Id,ProcessInstance.TargetObjectid,ProcessInstance.TargetObject.name from ProcessInstanceWorkitem]);
      List<Tpswrapper> returnlist = new List<Tpswrapper>();
      for(ProcessInstanceWorkitem c:pInstance){
        Tpswrapper d = new Tpswrapper();
        d.courseName = c.actor.name;
        d.status = c.ProcessInstance.Status;
        d.id = c.ProcessInstance.Id;
        d.ids = c.ProcessInstance.TargetObjectid;
        d.objectnaem = c.ProcessInstance.TargetObject.name;
        returnlist.add(d);
      }
        return returnlist;
    }
    Public class Tpswrapper{
        @auraEnabled
          public string courseName{get;set;}
        @AuraEnabled
          public string status{get;set;}
     @AuraEnabled
          public string id{get;set;}
          @AuraEnabled
          public string ids{get;set;}
          @AuraEnabled
          public string objectnaem{get;set;}
    
    }
}