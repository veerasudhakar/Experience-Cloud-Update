public with sharing class EntrolledComponentController {
   //@AuraEnabled(cacheable=true)
  public static List<EntrolledCousreWrapper> getEntrolledCourse(string courseName){
      List<EntrolledCousreWrapper> wraps=new List<EntrolledCousreWrapper>();
      Map<String,Boolean> entrolledMap=new Map<String,Boolean>();
      List<Enrolled_Course__c> entrolled=[Select Program__r.Course__c,Contact__c,Status__c from Enrolled_Course__c where Status__c !=''];
       for(Enrolled_Course__c e:entrolled)
       {

       entrolledMap.put(String.valueOf(e.Program__c)+String.valueOf(e.Program__r.Course__c)+String.valueOf(e.Contact__c),true);
       }
    for(Program__c p:[SELECT Id,Course__r.Name,Course__c,Name, Program_Time__c, Program_Type__c,Program_Date__c,Program_End_Date__c FROM Program__c where Course__r.Name=:courseName])
    {
       EntrolledCousreWrapper wrap=new EntrolledCousreWrapper();
        wrap.Id=p.Id;
        wrap.CourseName=p.Course__r.Name;
         wrap.courseId=p.Course__c;
         wrap.Name=p.Name;
         wrap.ProgramType=p.Program_Type__c;
         wrap.ProgramDate=p.Program_Date__c;
         wrap.ProgramEndDate=p.Program_End_Date__c;
         Contact c=[Select Id,Name,Email from Contact where Email=:UserInfo.getUserEmail() limit 1];
         String check=String.valueOf(p.Id)+String.valueOf(p.Course__c)+String.valueOf(c.Id);
         if(!entrolledMap.isEmpty())
         {
          wrap.IsActive=entrolledMap.containsKey(check)?entrolledMap.get(check):false;
         }else{
           wrap.IsActive=false; 
         }
         wraps.add(wrap);
    }
        return wraps;
    
   }
   @AuraEnabled
   public static Enrolled_Course__c createEntrolledCourse(string progId){
    Contact c=[Select Id,Name,Email from Contact Where Email=:UserInfo.getUserEmail() limit 1];
    Enrolled_Course__c er=new Enrolled_Course__c(Program__c=progId,Contact__c=c.Id,Email__c=c.Email);
    insert er;
    return er;
   
    
   }
   public class EntrolledCousreWrapper
   {
      @AuraEnabled public string courseId;
      @AuraEnabled public string Id;
      @AuraEnabled public string CourseName;
      @AuraEnabled public string Name;
      @AuraEnabled public string ProgramType;
      @AuraEnabled public DateTime ProgramDate;
       @AuraEnabled public DateTime ProgramEndDate;
       @AuraEnabled public Boolean IsActive;

   }
}