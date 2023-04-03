@isTest
public class TestScheduleUserInfo {
    @isTest
    static void testExecute() {
        Test.startTest();
        ScheduleUserInfo scheduler = new ScheduleUserInfo();
        String sch = '0 0 23 * * ?'; // run daily at 11 PM
        String jobID = system.schedule('ScheduleUserInfo Test', sch, scheduler);
        Test.stopTest();
    }
}