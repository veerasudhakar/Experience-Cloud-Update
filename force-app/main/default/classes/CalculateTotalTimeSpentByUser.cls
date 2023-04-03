public class CalculateTotalTimeSpentByUser {
   
    public static void main() {
        List<Login_Hours__c> lhList = [SELECT Id, User__c, Session_Time__c FROM Login_Hours__c WHERE Session_Time__c != NULL AND CreatedDate = YESTERDAY ];
        Map<Id, Integer> userLoginCount = new Map<Id, Integer>();
        Map<Id, Decimal> sessionTimeMap = new Map<Id, Decimal>();
        for(Login_Hours__c lh : lhList){
            if(userLoginCount.containsKey(lh.User__c)){
                userLoginCount.put(lh.User__c, userLoginCount.get(lh.User__c) + 1);
                sessionTimeMap.put(lh.User__c, sessionTimeMap.get(lh.User__c) + lh.Session_Time__c);
            } else {
               userLoginCount.put(lh.User__c, 1);
                sessionTimeMap.put(lh.User__c, lh.Session_Time__c);
            }
            
        }
         system.debug('sessionTimeMap'+sessionTimeMap);

        List<User_Information__c> inserList = new List<User_Information__c>();
        for(Id userId : sessionTimeMap.keySet()){
         
            Integer totalMinutes = sessionTimeMap.get(userId).intValue();
            Integer hours = totalMinutes/60;
            Integer minutes = Math.mod(totalMinutes, 60);
            User_Information__c us = new User_Information__c(
    User__c = userId, 
    Login_Count__c = userLoginCount.get(userId),
    total_time_of_user_spend__c = hours + ' hours ' + minutes + ' minutes'
);
            inserList.add(us); 
            system.debug('inserList'+inserList);
        }
        
        if(inserList.size() > 0){
            insert inserList;
             system.debug('inserList'+inserList);
        }
    }
}