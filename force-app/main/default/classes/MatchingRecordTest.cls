@isTest
public class MatchingRecordTest{
    
   
    public static testmethod void testInsertion()
    {
        Login_Hours__c LHour =new Login_Hours__c(Username__c='Test123', User_ID__c ='0052w00000C64scAAB');
        insert LHour;
        Session_logout__c a = new Session_logout__c(Username__c = 'Test123', UserId__c='0052w00000C64scAAB'); 
        insert a;
        
        
        Test.startTest(); {
        
        System.assertEquals('Test123', LHour.Username__c);
    } 
         Test.stopTest();
    
}
}