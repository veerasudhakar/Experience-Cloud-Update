@isTest
public class LogoutEventTriggerTest{
    /*
    
    public static testmethod void testInsertion()
    {
        LogoutEventStream a = new LogoutEventStream(UserId = '0052w00000C64scAAB', Username = 'Test123',EventIdentifier ='b0f735ec-97db-405a-8f1a-803c7c8fad4d',RelatedEventIdentifier='', SessionKey ='6NJja818NVzOCiy9', LoginKey ='xL2Kj96t/MNQ1EMN', SessionLevel ='STANDARD', SourceIp ='103.24.21.110'); 
        insert a;
        // LogoutEventStream c = [SELECT UserId FROM LogoutEventStream WHERE UserId =:a.UserId LIMIT 1];
        Session_logout__c con = [SELECT UserId__c FROM Session_logout__c WHERE UserId__c =:a.UserId LIMIT 1];
        
        Test.startTest(); {
        
        System.assertEquals('0052w00000C64scAAB', con.UserId__c);
    } 
         Test.stopTest();
    
}
}
/*
@isTest
public class LogoutEventTriggerTest {

@isTest
public static void testInsertion(){
LogoutEventStream a = new LogoutEventStream(UserId = '0052w00000C64scAAB', Username = 'Test123',EventIdentifier ='b0f735ec-97db-405a-8f1a-803c7c8fad4d',RelatedEventIdentifier='', SessionKey ='6NJja818NVzOCiy9', LoginKey ='xL2Kj96t/MNQ1EMN', SessionLevel ='STANDARD', SourceIp ='103.24.21.110');
insert a;

Session_logout__c con = new Session_logout__c();

Test.startTest();

update con;

Test.stopTest();

}
}*/
  @isTest
   public static void scenario1(){
       User u = new User();
       u.Email = 'test@tste.com';
       u.Username = 'test@tstetstete.com';
       u.MobilePhone = '1234567890';
       u.CommunityNickname = 'testssf';
       Profile p = [SELECT Id,Name FROM Profile WHERE Name = 'System Administrator'];
       p.PermissionsCustomizeApplication  = True;
       u.ProfileId = p.id;
       u.LastName = 'test';
       u.Alias = 'tstsfsf';
       u.TimeZoneSidKey = 'Asia/Kolkata';
       u.LocaleSidKey = 'en_US';
       u.LanguageLocaleKey = 'en_US';
       u.EmailEncodingKey = 'UTF-8';
       u.IsActive = True;
       insert u;
       
       Test.startTest();
       User u1 = [SELECT Id, UserName FROM User WHERE Id =:u.id];
       LogoutEventStream event = new LogoutEventStream();
       event.UserName = u1.UserName;
       EventBus.publish(event);
       Test.stopTest(); 
   }
}