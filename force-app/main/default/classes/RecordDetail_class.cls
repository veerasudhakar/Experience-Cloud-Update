public with sharing class RecordDetail_class {
    @AuraEnabled(cacheable=true)
    public static list<Program__c> RecordDetails(){
        list<Program__c> programlist =[SELECT Id, Name, Faculty_Name__c, Program_Time__c, Program_Type__c, Contact__c, Program_Date__c FROM Program__c where createdById=:Userinfo.getUserId()] ;
        return programlist;
      }
}