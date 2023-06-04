public class AccountTriggerHandler {
    // Handler method for after insert trigger event on Account object
    public static void handleAfterInsert(List<Account> newAccounts) {
        List<Task> newTasks = new List<Task>();
        
        // Create tasks for each new account
        for (Account acc : newAccounts) {
            Task newTask = new Task();
            newTask.Subject = 'Review Account - ' + acc.AccountNumber;
            newTask.WhatId = acc.Id;
            newTask.ActivityDate = System.Today().addDays(7);
            newTask.Status = 'Not Started';
            newTask.OwnerId = acc.OwnerId;
            newTasks.add(newTask);
        }
        
        // Insert the newly created tasks
        if (!newTasks.isEmpty()) {
            insert newTasks;
        }
    }
}