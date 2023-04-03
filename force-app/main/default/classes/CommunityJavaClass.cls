public with sharing class CommunityJavaClass {
    @AuraEnabled(cacheable=true)
    public static List<EntrolledComponentController.EntrolledCousreWrapper> getDetailsByTypewithProspect()
    {
        List<EntrolledComponentController.EntrolledCousreWrapper> wrap= EntrolledComponentController.getEntrolledCourse('Java');
       return wrap;
        //return [Select id,Name,Program_Type__c,Program_Date__c,Program_End_Date__c,Course_Name__c from Program__c WHERE Course_Name__c='Java'];
    }
    
}