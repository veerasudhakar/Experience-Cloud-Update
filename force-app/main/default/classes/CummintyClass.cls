public with sharing class CummintyClass {
    @AuraEnabled(cacheable=true)
    public static List<EntrolledComponentController.EntrolledCousreWrapper> getDetailsByTypewithOther()
    {
      List<EntrolledComponentController.EntrolledCousreWrapper> wrap= EntrolledComponentController.getEntrolledCourse('Salesforce');
       return wrap;
        //return [Select id,Name,Program_Type__c,Program_Date__c,Program_End_Date__c,Course_Name__c from Program__c WHERE Course_Name__c='Salesforce'];
    }

    @AuraEnabled(cacheable=true)
    public static List<Program__c> getDetailsByTypewithCustomer()
    {
        // List<EntrolledComponentController.EntrolledCousreWrapper> wrap= EntrolledComponentController.getEntrolledCourse('Python');
       //return wrap;
    return [Select id,Name,Program_Type__c,Program_Date__c,Program_End_Date__c,Course_Name__c from Program__c WHERE Course_Name__c='Python'];
    }
        @AuraEnabled(cacheable=true)
    public static List<Program__c> getDetailsByTypewithProspect()
    {
         //List<EntrolledComponentController.EntrolledCousreWrapper> wrap= EntrolledComponentController.getEntrolledCourse('Java');
      // return wrap;
        return [Select id,Name,Program_Type__c,Program_Date__c,Program_End_Date__c,Course_Name__c from Program__c WHERE Course_Name__c='Java'];
    }
    
}