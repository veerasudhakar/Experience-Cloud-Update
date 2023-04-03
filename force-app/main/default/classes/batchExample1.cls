global class batchExample1  implements database.Batchable<sobject>, database.stateful {
    
    global   database.QueryLocator start( database.BatchableContext bc )
    {
        string query;
        query ='select id, name from Account';
        return database.getQueryLocator(query);
    }
     global void  execute(database.BatchableContext bc, list<Account> scope)
     {
         
     }
    global void finish (database.BatchableContext bc){
        
    }
      
        
}