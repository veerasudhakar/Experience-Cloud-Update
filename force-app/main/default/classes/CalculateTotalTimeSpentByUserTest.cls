@isTest
private class CalculateTotalTimeSpentByUserTest {
     @isTest
    static void testInsertUsers() 
    {

        Login_Hours__c uh=new Login_Hours__c(User__c=UserInfo.getUserId(),Login_Time__c=system.today(),Logout_Time__c=system.today());
        insert uh;
        Test.setCreatedDate(uh.Id, System.now().addDays(-1));

        CalculateTotalTimeSpentByUser.main();
    }
    
  /*  @isTest
    static void testInsertUsers() {
        // create test users
        List<User> testUsers = new List<User>();
        List<Profile> profiles = [SELECT Id,name FROM Profile WHERE Name = 'Standard User' OR Name = 'System Administrator'];
        System.debug('this is profiles'+profiles);
        Id standardUserProfileId;
        Id systemAdminProfileId;
        for (Profile p : profiles) {
            if (p.Name == 'Standard User') {
                standardUserProfileId = p.Id;
            } else if (p.Name == 'System Administrator') {
                systemAdminProfileId = p.Id;
            }
        }
        for (Integer i = 0; i < 2; i++) {
           
            User u = new User();
            u.Username = 'testuser' + i + '@example.com';
            u.LastName = 'Test';
            u.Email = 'testuser' + i + '@example.com';
            u.Alias = 'test' + i;
            u.TimeZoneSidKey = 'America/Los_Angeles';
            u.LocaleSidKey = 'en_US';
            u.EmailEncodingKey = 'UTF-8';
            if (i == 0) {
                u.ProfileId = standardUserProfileId;
            } else {
                u.ProfileId = systemAdminProfileId;
            }
            u.LanguageLocaleKey = 'en_US';
            testUsers.add(u);
        }
        insert testUsers;
         
        // verify that users were created
        List<User> users = [SELECT Id FROM User WHERE Username LIKE 'testuser%'];
        System.debug('this is username' +users.size());
        System.assertEquals(2, users.size());
    }
    @isTest
    static void testInsertLoginHours() {
        // create test login hour records with different session times for each user
         
        List<User> testUsers = [SELECT Id FROM User WHERE Username LIKE 'testuser%'];
        System.debug('this is' +testUsers.size());
        List<Login_Hours__c> testLoginHours = new List<Login_Hours__c>();
        if (!testUsers.isEmpty()) {
            System.debug('this is' +testUsers.size());
            testLoginHours.add(new Login_Hours__c(User__c = testUsers[0].Id, Login_Time__c = Datetime.newInstance(Date.today(), Time.newInstance(15, 0, 0, 0)), Logout_Time__c=Datetime.newInstance(Date.today(), Time.newInstance(25, 0, 0, 0))));
            testLoginHours.add(new Login_Hours__c(User__c = testUsers[0].Id, Login_Time__c = Datetime.newInstance(Date.today(), Time.newInstance(11, 0, 0, 0)), Logout_Time__c =Datetime.newInstance(Date.today(), Time.newInstance(13, 0, 0, 0))));
            testLoginHours.add(new Login_Hours__c(User__c = testUsers[1].Id, Login_Time__c = Datetime.newInstance(Date.today(), Time.newInstance(5, 0, 0, 0)), Logout_Time__c = Datetime.newInstance(Date.today(), Time.newInstance(7, 0, 0, 0))));
        }
         
        if (!testLoginHours.isEmpty()) {
            System.debug('Number of Login_Hours__c records to be inserted: ' + testLoginHours.size());
           
            try {
                insert testLoginHours;
            } catch (Exception e) {
                System.debug('Error inserting Login_Hours__c records: ' + e.getMessage());
            }
            Map<Id, Integer> userLoginCount = new Map<Id, Integer>();
            Map<Id, Decimal> sessionTimeMap = new Map<Id, Decimal>();
            for (Login_Hours__c lh : testLoginHours) {
                if(userLoginCount.containsKey(lh.User__c)){
                    userLoginCount.put(lh.User__c, userLoginCount.get(lh.User__c) + 1);
                    sessionTimeMap.put(lh.User__c, sessionTimeMap.get(lh.User__c) + lh.Session_Time__c);
                } else {
                    userLoginCount.put(lh.User__c, 1);
                    sessionTimeMap.put(lh.User__c, lh.Session_Time__c);
                }
            }
            
            // Verify the results
            System.assertEquals(3, userLoginCount.get(testUsers[0].Id));
            System.assertEquals(12600, sessionTimeMap.get(testUsers[0].Id)); 
        }
        
        Test.startTest();
        
        // wrap non-setup object DML operations in a System.runAs block to avoid mixed DML operations error
        System.runAs(new User(Id = UserInfo.getUserId())) {
            CalculateTotalTimeSpentByUser.main();
        }
        
        Test.stopTest();
        
        // verify that login hours were created
        List<Login_Hours__c> lhList = [SELECT Id FROM Login_Hours__c];
        System.assertEquals(3, lhList.size());
    }
    
    @isTest
    static void testUserLoginCount() {
        List<User_Information__c> userInfos = [SELECT Id, User__c, Login_Count__c FROM User_Information__c];
        for(User_Information__c ui : userInfos) {
            // verify that the login count is correct for each user
            Integer expectedCount = [SELECT COUNT() FROM Login_Hours__c WHERE User__c = :ui.User__c AND CreatedDate = YESTERDAY];
            System.assertEquals(expectedCount, ui.Login_Count__c);
        }
    }
    
    @isTest
    static void testUserTotalTime() {
        List<User_Information__c> userInfos = [SELECT Id, User__c, total_time_of_user_spend__c FROM User_Information__c];
        for(User_Information__c ui : userInfos) {
            // verify that the total time is correct for each user
            List<Login_Hours__c> loginHours = [SELECT Session_Time__c FROM Login_Hours__c WHERE User__c = :ui.User__c AND CreatedDate = YESTERDAY];
            Integer expectedTime = 0;
            for(Login_Hours__c lh : loginHours) {
                expectedTime += lh.Session_Time__c.intValue();
            }
            Integer expectedHours = expectedTime/60;
            Integer expectedMinutes = Math.mod(expectedTime, 60);
            String expectedTimeString = expectedHours + ' hours ' + expectedMinutes + ' minutes';
            System.assertEquals(expectedTimeString, ui.total_time_of_user_spend__c);
            
            
        }
    }*/
}