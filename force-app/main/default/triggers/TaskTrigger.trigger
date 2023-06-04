trigger TaskTrigger on Task (after update) {
    if (Trigger.isAfter && Trigger.isUpdate) {
        List<Task> updatedTasks = Trigger.new;
        TaskTriggerHandler.handleAfterUpdate(updatedTasks);
    }
}