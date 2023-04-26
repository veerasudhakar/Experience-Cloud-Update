public class FacultyCustomerDetails {
@AuraEnabled(cacheable=true)
    
    public static List<attendenceWrapper> getcustomercontacts(){
        List<attendenceWrapper> wraps=new List<attendenceWrapper>();
        //List<string> types=new List<String>{'Absent','Present'};
        List<Attendance__c> attends=[SELECT Id, Name, Attendence_Date__c, Present__c, Absent__c, Enrolled_Course__c FROM Attendance__c where Attendence_Date__c=TODAY];
        Map<String,Boolean> attendMap=new Map<String,Boolean>();
        for(Attendance__c a:attends)
        {
            attendMap.put(a.Enrolled_Course__c,true);
        }
    for(Enrolled_Course__c ec:[SELECT Id, Name,Attendence__c, Contact__r.Name, Program__c,Program__r.Course__r.Name,Email__c,Status__c FROM Enrolled_Course__c where Status__c='Approved' AND Program__r.Email__c=:USerInfo.getUserEmail()])
    {
      attendenceWrapper wrap=new attendenceWrapper();
      wrap.Id=ec.Id;
       wrap.Name=ec.Name;
       wrap.courseName=ec.Program__r.Course__r.Name;
       wrap.customerName=ec.Contact__r.Name;
       wrap.AttendenceDate=System.today();
       wrap.attendenceType=attendMap.ContainsKey(ec.Id)?ec.Attendence__c:'';
       wrap.AttendenceDisable=!attendMap.ContainsKey(ec.Id);
     //  System.debug(' wrap.AttendenceDisable'+ wrap.AttendenceDisable);
      // boolean a=!attendMap.ContainsKey('a095h00000TKouuAAD');
       // System.debug(' !attendMap.ContainsKey(ec.Id)'+a);
       wrap.Name=ec.Name;
      wraps.add(wrap);
    }   
    return wraps;  
    }
    public class attendenceWrapper
    {
        @AuraEnabled public String Id;
         @AuraEnabled public String Name;
        @AuraEnabled public string customerName;
        @AuraEnabled public string courseName;
        @AuraEnabled public string  attendenceType;
        @AuraEnabled public Boolean AttendenceDisable;
        @AuraEnabled public Date AttendenceDate;
       
    }
    @AuraEnabled
    public static void createAttendence(string EId)
    {
Map<Id,Enrolled_Course__c> empMap=new Map<Id,Enrolled_Course__c>([SELECT Id, Name,Attendence__c, Contact__r.Name, Program__c,Program__r.Course__r.Name,Email__c,Status__c FROM Enrolled_Course__c where Id=:EId]);
Attendance__c a=new Attendance__c();
//a.Name=empMap.get(EId).Contact__r.Name;
a.Attendence_Date__c=System.today();
if(empMap.get(EId).Attendence__c=='Present')
{
a.Present__c=true;
}else{
    a.Absent__c=true;
}
a.Enrolled_Course__c=EId;
insert a;
    }
    @AuraEnabled(Cacheable = true)
    public static list<Enrolled_Course__c> getAccountData(String textkey) {
        textkey = '%' + textkey + '%';
        list<Enrolled_Course__c> accLst = [SELECT Id, Name,Attendence__c, Contact__r.Name, Program__c,Program__r.Course__r.Name,Email__c,Status__c FROM Enrolled_Course__c WHERE Program__r.Course__r.Name LIKE :textkey];
        
        if(accLst.isEmpty()) {
            throw new AuraHandledException('No Record Found..');
        }
        return accLst; 
    }
}