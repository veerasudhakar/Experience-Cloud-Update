/*Raghu Gajjela
02-02-2023*/ 
global class AuditTrailFetch implements Database.Batchable<sObject>,Schedulable{
    global Database.QueryLocator start(Database.BatchableContext bc){
        string query='SELECT Id, Action, Section, CreatedDate, CreatedById, Display, CreatedByContext,CreatedBy.Name FROM SetupAuditTrail';
        if(Test.isRunningTest())
        {
            query=query+' limit 200';
        }
        system.debug('query'+query);
        return Database.getQueryLocator(query);
    }
    global void execute(Database.BatchableContext bc, List<SetupAuditTrail>trail){
        system.debug('trail'+trail);
        Map<String,UAM_Activity_tracker__c> uamMap=new  Map<String,UAM_Activity_tracker__c>();
        for(UAM_Activity_tracker__c uam:[SELECT Id, Id__c, Section__c, Createddate__c FROM UAM_Activity_tracker__c])
        {
           
            uamMap.put(uam.Id__c,uam); 
        }
        List<UAM_Activity_tracker__c> uat = new List<UAM_Activity_tracker__c>();
        for(SetupAuditTrail tr:trail){
            if(!uamMap.ContainsKey(tr.Id))
            {
                UAM_Activity_tracker__c ut = new UAM_Activity_tracker__c();
                ut.Id__c = tr.Id;
                ut.User_Name__c =tr.CreatedBy.Name;
                ut.Createddate__c = tr.CreatedDate;
                ut.CreatedbyId__c = tr.CreatedById;
                ut.Display__c = tr.Display;
                ut.Section__c = tr.Section;
                ut.Action__c = tr.Action;
                uat.add(ut);
            }
            
        }
        if(uat.size()>0)
        {
            insert uat;
            system.debug('uat'+uat);
            
        }
    }
    global void finish(Database.BatchableContext bc){
        
    }
   global void execute (schedulableContext sc){
        AuditTrailFetch AUT = new AuditTrailFetch();
    Database.executeBatch(AUT,2000);
     
   
        
        /*String CRON_EXP = '0 0 * * * ?'; 
        AuditTrailFetch AUT = new AuditTrailFetch(); 
        system.schedule('Hourly Batch Schedule job', CRON_EXP, AUT );*/
       }
}