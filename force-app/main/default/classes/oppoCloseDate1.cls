public class oppoCloseDate1 {
@AuraEnabled
    public static string getOppo()
    {
        list<opportunity> oppoList = new list<opportunity>();
        oppoList = [ SELECT Id, Name, closeDate FROM opportunity];
        return JSON.serialize(oppoList); 
    }
}