public class paymentDetails {
@AuraEnabled
    public static List<Payment__c> getPaymentMethod(String type, String Name, String Num, String month, String year, String cvv, String upi ){
        system.debug('type'+type);
        system.debug('Name'+Name);
        system.debug('Num'+Num);
        system.debug('month'+month);
        system.debug('year'+year);
        system.debug('upi'+upi);
       
        if(type !=''&& Name !=''&& Num !='' && month !=''&& year !='' && cvv !=''){
            List<Payment__c> listCreditCard = [select Name, Card_Name__c, 
                                     Card_Number__c,CVV__c, Expiry_Month__c,
                                     Expiry_Year__c, Payment_Method__c
                                     from Payment__c 
                                     where Payment_Method__c =: type AND Card_Name__c =: Name AND Card_Number__c =: Num AND CVV__c=:cvv AND Expiry_Month__c =:month AND
                                             Expiry_Year__c =: year limit 1];
           return listCreditCard;
        }
        else if(type !=''&& upi !=''){
             List<Payment__c> listCreditCard = [select Name, Payment_Method__c, UPI_Id__c
                                     from Payment__c 
                                     where  Payment_Method__c =: type AND UPI_Id__c =: upi limit 1];   
            return listCreditCard;
        }else if(type =='Cash On Delivery' && Name =='' && Num =='' && month ==''&& year =='' && cvv =='' && upi ==''){
            List<Payment__c> listCreditCard = [select Name, Payment_Method__c
                                     from Payment__c 
                                     where  Payment_Method__c =: type  limit 1];
            return listCreditCard;
        }
        return null;
        
    }
}