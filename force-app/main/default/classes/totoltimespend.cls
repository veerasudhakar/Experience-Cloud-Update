public class totoltimespend {
    public static void totaltimespendformicro() {
   
   List<UAM_Activity_tracker__c> oppList = [SELECT Id, Createddate__c, Time_On_Object__c, Time_Spent__c FROM UAM_Activity_tracker__c WHERE Createddate__c=today ORDER BY Createddate__c ASC];
        system.debug(oppList);
        for (Integer i = 1; i < oppList.size(); i++) {
            UAM_Activity_tracker__c currOpp = oppList[i];
            UAM_Activity_tracker__c prevOpp = oppList[i-1];
            Long timeDiffInMillis = currOpp.Createddate__c.getTime() - prevOpp.Createddate__c.getTime();
            //Double timeDiffInHours = timeDiffInMillis / (1000.0 * 60.0 * 60.0);
            long timesecond=timeDiffInMillis / (1000);
            String s =DateTime.valueOf(timesecond*1000).formatGMT('HH:mm:ss');
            Double timeDiffInHours = timeDiffInMillis / (1000.0 * 60.0 );
           
            
            
            prevOpp.Time_Spent__c = s;
            prevOpp.Time_On_Object__c=timeDiffInHours;
            system.debug(oppList);
        
        }
         
        update oppList;
    }

}