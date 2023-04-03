public with sharing class registeredCourses {
    @AuraEnabled(cacheable=true)
    public static List<Tpswrapper> myCourses(){
        List<Enrolled_Course__c> pInstance = New List<Enrolled_Course__c>([select id,Name,Contact__r.Lastname,Program__r.course_name__c,program__r.name from Enrolled_Course__c]);
        List<Tpswrapper> returnlist = new List<Tpswrapper>();
        for(Enrolled_Course__c c:pInstance){
          Tpswrapper d = new Tpswrapper();
          d.name = c.Name;
          d.contactname = c.Contact__r.Lastname;
          d.program = c.Program__r.course_name__c;
          d.facultyname = c.program__r.name;
          
          returnlist.add(d);
        }
          return returnlist;
      }
      Public class Tpswrapper{
          @auraEnabled
            public string name{get;set;}
          @AuraEnabled
            public string contactname{get;set;}
       @AuraEnabled
            public string program{get;set;}
            @AuraEnabled
            public string facultyname{get;set;}
            
      
      }

     
    /*public static List<Enrolled_Course__c> myCourses()
    {
        return [Select id,Name,contact_name__c,program__r.Course_Name__c from Enrolled_Course__c];
    }*/

}