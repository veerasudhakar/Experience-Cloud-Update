/*raghu*/
public class ObjectInformation {
    /*public static void getObjectInformation(Map<Id,UAM_Activity_tracker__c> uamMap) {
           Map<String, Schema.SObjectType> gd = Schema.getGlobalDescribe();
        List<UAM_Activity_tracker__c> UAMlists=new List<UAM_Activity_tracker__c>();
         for(UAM_Activity_tracker__c uam:[SELECT Id, Name, Section__c, COName__c, Display__c FROM UAM_Activity_tracker__c where Id IN:uamMap.keySet()])
          {
              string str=uam.Display__c;  
              string name;
              for(Schema.SObjectType s:gd.values()) 
              {
              Schema.DescribeSObjectResult describeSObjectResultObj = s.getDescribe();
             if(str.contains(s.getDescribe().getLabel()))
             {
                 name = s.getDescribe().getName();
                 
             }
             uam.COName__c=name;    
            }
                UAMlists.add(uam); 
          }
        update UAMlists;
        system.debug('update'+UAMlists);
    }*/
   public static void getObjectInformation(Map<Id, UAM_Activity_tracker__c> uamMap) {
    Map<String, Schema.SObjectType> gd = Schema.getGlobalDescribe();
    List<UAM_Activity_tracker__c> UAMlists = new List<UAM_Activity_tracker__c>();
    for (UAM_Activity_tracker__c uam : [SELECT Id, Name, Section__c, COName__c, Display__c FROM UAM_Activity_tracker__c WHERE Id IN :uamMap.keySet()]) {
        String str = uam.Display__c;
        String name = null; // Initialize with null to handle cases where Display__c is null
        if (str != null) { // Check if Display__c is null before using it
            for (Schema.SObjectType s : gd.values()) {
                Schema.DescribeSObjectResult describeSObjectResultObj = s.getDescribe();
                if (str.contains(s.getDescribe().getLabel())) {
                    name = s.getDescribe().getName();
                }
                uam.COName__c = name;
            }
        }
        UAMlists.add(uam);
    }
    update UAMlists;
    system.debug('update' + UAMlists);
}
}