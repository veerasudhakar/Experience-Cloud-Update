public with sharing class ProgramHelper {
    @AuraEnabled(cacheable=true)
    public static List<Tpswrapper> getSalesforceProgramList()
    {
      List<Program__c> clist = new List<Program__c>([SELECT Id,Course__r.Name , Name,  Program_Type__c FROM Program__c WHERE  Course__r.Name = 'Salesforce']);
      List<Tpswrapper> returnlist = new List<Tpswrapper>();
      for(Program__c c:clist){
        Tpswrapper d = new Tpswrapper();
        d.courseName = c.Course__r.Name;
        d.name = c.Name;
        d.programType = c.Program_Type__c;
        returnlist.add(d);
      }
        return returnlist;
    }
    Public class Tpswrapper{
    @auraEnabled
      public string courseName{get;set;}
    @AuraEnabled
      public string name{get;set;}
 @AuraEnabled
      public string programType{get;set;}
 
}
    @AuraEnabled
    public static void deleteProgram(Program__c objaccount){
        try {
            delete objaccount;
        }
        catch(Exception ex) {
            throw new AuraHandledException(ex.getMessage());
        }
    }


    @AuraEnabled(cacheable=true)
    public static List<Tpswrapper1> getJavaProgramList()
    {
      List<Program__c> clist = new List<Program__c>([SELECT Id,Course__r.Name , Name,  Program_Type__c FROM Program__c WHERE  Course__r.Name = 'Java']);
      List<Tpswrapper1> returnlist = new List<Tpswrapper1>();
      for(Program__c c:clist){
        Tpswrapper1 d = new Tpswrapper1();
        d.courseName1 = c.Course__r.Name;
        d.name1 = c.Name;
        d.programType1 = c.Program_Type__c;
        returnlist.add(d);
      }
        return returnlist;
    }
    Public class Tpswrapper1{
    @auraEnabled
      public string courseName1{get;set;}
    @AuraEnabled
      public string name1{get;set;}
 @AuraEnabled
      public string programType1{get;set;}
 
}
    @AuraEnabled
    public static void deleteProgram1(Program__c objaccount){
        try {
            delete objaccount;
        }
        catch(Exception ex) {
            throw new AuraHandledException(ex.getMessage());
        }
    }



    @AuraEnabled(cacheable=true)
    public static List<Tpswrapper2> getPythonProgramList()
    {
      List<Program__c> clist = new List<Program__c>([SELECT Id,Course__r.Name , Name,  Program_Type__c FROM Program__c WHERE  Course__r.Name = 'Python']);
      List<Tpswrapper2> returnlist = new List<Tpswrapper2>();
      for(Program__c c:clist){
        Tpswrapper2 d = new Tpswrapper2();
        d.courseName2 = c.Course__r.Name;
        d.name2 = c.Name;
        d.programType2 = c.Program_Type__c;
        returnlist.add(d);
      }
        return returnlist;
    }
    Public class Tpswrapper2{
    @auraEnabled
      public string courseName2{get;set;}
    @AuraEnabled
      public string name2{get;set;}
 @AuraEnabled
      public string programType2{get;set;}
 
}
    @AuraEnabled
    public static void deleteProgram2(Program__c objaccount){
        try {
            delete objaccount;
        }
        catch(Exception ex) {
            throw new AuraHandledException(ex.getMessage());
        }
    }
}