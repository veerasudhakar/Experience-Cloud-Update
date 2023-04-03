@isTest
public class TotalTimeSpendSchedulerTest {
    @isTest
    static void testExecute() {
        Test.startTest();
        TotalTimeSpendScheduler sched = new TotalTimeSpendScheduler();
        String sch = '0 0 0 * * ?';
        system.schedule('Test TotalTimeSpendScheduler', sch, sched);
        Test.stopTest();
       
    }
}