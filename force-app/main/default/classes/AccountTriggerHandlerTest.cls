@IsTest
public class AccountTriggerHandlerTest {
    @IsTest
    public static void testHandleAfterInsert() {
        // Create test data
        List<Account> accounts = new List<Account>();
        for (Integer i = 0; i < 5; i++) {
            Account acc = new Account(Name = 'Test Account ' + i, OwnerId = UserInfo.getUserId());
            accounts.add(acc);
        }
        
        Test.startTest();
        
        // Trigger the after insert event
        AccountTriggerHandler.handleAfterInsert(accounts);
        
        Test.stopTest();
        
        // Verify the created tasks
        List<Task> tasks = [SELECT Subject, WhatId, ActivityDate, Status, OwnerId FROM Task];
        System.assertEquals(accounts.size(), tasks.size(), 'Number of tasks created should match number of accounts');
        
        for (Integer i = 0; i < accounts.size(); i++) {
            Account acc = accounts[i];
            Task task = tasks[i];
            
            System.assertEquals('Review Account - ' + acc.AccountNumber, task.Subject);
            System.assertEquals(acc.Id, task.WhatId);
            System.assertEquals(System.Today().addDays(7), task.ActivityDate);
            System.assertEquals('Not Started', task.Status);
            System.assertEquals(acc.OwnerId, task.OwnerId);
        }
    }
}