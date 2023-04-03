public class HideLoginButton {
    @AuraEnabled(cacheable=true)
    public static list<user> userdetails(){
       list<user>  us = [select id,firstname, lastname from user limit 1];
         system.debug(us);
        return us;
        
    }    
}