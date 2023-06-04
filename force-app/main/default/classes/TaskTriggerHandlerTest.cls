@IsTest
public class TaskTriggerHandlerTest {
    @IsTest
    public static void testHandleAfterUpdate() {
        // Create test data: Accounts
        List<Account> accounts = new List<Account>();
        for (Integer i = 0; i < 5; i++) {
            Account acc = new Account(Name = 'Test Account ' + i, Active__c = false);
            accounts.add(acc);
        }
        insert accounts;
        
        // Create test data: Completed Tasks
        List<Task> completedTasks = new List<Task>();
        for (Integer i = 0; i < 3; i++) {
            Task t = new Task(Subject = 'Review Account-' + accounts[i].Id, Status = 'Completed', WhatId = accounts[i].Id);
            completedTasks.add(t);
        }
        insert completedTasks;
        
        // Create test data: Incomplete Tasks
        List<Task> incompleteTasks = new List<Task>();
        for (Integer i = 3; i < 5; i++) {
            Task t = new Task(Subject = 'Other Task', Status = 'In Progress', WhatId = accounts[i].Id);
            incompleteTasks.add(t);
        }
        insert incompleteTasks;
        
        Test.startTest();
        
        // Trigger the after update event
        TaskTriggerHandler.handleAfterUpdate(completedTasks);
        TaskTriggerHandler.handleAfterUpdate(incompleteTasks);
        
        Test.stopTest();
        
        // Verify the updated Accounts
        List<Account> updatedAccounts = [SELECT Id, Active__c, Description FROM Account WHERE Id IN :accounts];
        System.assertEquals(5, updatedAccounts.size(), 'Number of updated accounts should match the completed tasks count');
        
        for (Account acc : updatedAccounts) {
            System.assertEquals(true, acc.Active__c, 'Account should be set as active');
            System.assertEquals(completedTasks[0].Description, acc.Description, 'Account description should match the completed task description');
        }
    }
}