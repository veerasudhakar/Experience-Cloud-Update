@isTest
public class UAMTriggerTestClass {
@isTest 
    static Void UAMActivityMethod()
    {
        UAM_Activity_tracker__c a=new UAM_Activity_tracker__c(Id__c='0Ym2w00001ZYLO1CAP',Display__c='Organization setup action: topicTimeSlotOffOn has changed.');
        insert a;
    }
}