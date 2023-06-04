public class TaskTriggerHandler {
    // Handler method for after update trigger event on Task object
    public static void handleAfterUpdate(List<Task> updatedTasks) {
        // Set to store Account Ids related to completed tasks
        Set<Id> accountIds = new Set<Id>();
        
        // Map to store Account Ids and corresponding task comments
        Map<Id, String> accountComments = new Map<Id, String>();
        
        // Collect Account Ids and task comments from updated tasks
        for (Task task : updatedTasks) {
            if (task.Status == 'Completed' || task.Subject.startsWith('Review Account-') || task.WhatId.getSObjectType() == Account.sObjectType) {
                accountIds.add(task.WhatId);
                system.debug('accountIds............' + accountIds);
                accountComments.put(task.WhatId, task.Description);
                system.debug('accountComments............' + accountComments.Values());
            }
        }
        
        // Check if there are any related Account Ids to update
        if (!accountIds.isEmpty()) {
            List<Account> accountsToUpdate = new List<Account>();
            
            // Query the related Accounts and update their fields
            for (Account acc : [SELECT Id, Active__c, Description FROM Account WHERE Id IN :accountIds AND Active__c = false]) {
                acc.Active__c = true;
                acc.Description = accountComments.get(acc.Id);
                accountsToUpdate.add(acc);
            }
            
            // Update the modified Account records
            if (!accountsToUpdate.isEmpty()) {
                update accountsToUpdate;
            }
        }
    }
}