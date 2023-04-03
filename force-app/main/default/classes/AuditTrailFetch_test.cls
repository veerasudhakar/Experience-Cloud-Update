@isTest
public class AuditTrailFetch_test {
@isTest static void testMethod1() 
    {
        
        Test.startTest();  
    
           AuditTrailFetch AUT = new AuditTrailFetch();
        System.schedule('UAMTesting','0 10 0 * * ? *',AUT);
      
            
        Test.stopTest();
    }
    
}