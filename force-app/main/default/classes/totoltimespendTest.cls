//Saroj Yadav
 //test class for totoltimespend 
 //21-02-2023
 

@isTest
public class totoltimespendTest {
    @isTest
    static void testTotalTimeSpend() {
     //here creating records for test 
        List<UAM_Activity_tracker__c> oppList = new List<UAM_Activity_tracker__c>();
        for (Integer i = 0; i < 5; i++) {
            oppList.add(new UAM_Activity_tracker__c(
                Createddate__c = DateTime.now().addSeconds(i * 10),
                Time_On_Object__c = 0.0,
                Time_Spent__c = ''
                	
            ));
        }
        insert oppList;

      // here call method for test
        Test.startTest();
        totoltimespend.totaltimespendformicro();
        Test.stopTest();

     // checking record inserted or not
        oppList = [SELECT Id, Createddate__c, Time_On_Object__c, Time_Spent__c FROM UAM_Activity_tracker__c];
        System.assertEquals(5, oppList.size());
        for (Integer i = 1; i < oppList.size(); i++) {
            UAM_Activity_tracker__c currOpp = oppList[i];
            UAM_Activity_tracker__c prevOpp = oppList[i-1];
            Long timeDiffInMillis = currOpp.Createddate__c.getTime() - prevOpp.Createddate__c.getTime();
            long timesecond=timeDiffInMillis / (1000);
            String s = DateTime.valueOf(timesecond*1000).formatGMT('HH:mm:ss');
            Double timeDiffInMinutes = timeDiffInMillis / (1000.0 * 60.0);
            System.assertEquals(s, prevOpp.Time_Spent__c);
            System.assertEquals(timeDiffInMinutes, prevOpp.Time_On_Object__c);
        }
    }
}