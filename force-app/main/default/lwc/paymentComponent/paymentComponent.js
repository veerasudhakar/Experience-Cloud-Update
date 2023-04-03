import { LightningElement,api,track,wire } from 'lwc';
import PAYMENT_METHOD_FIELD from '@salesforce/schema/Payment__c.Payment_Method__c'
import OMS_PAYMENT_OBJECT from '@salesforce/schema/Payment__c'
import { getObjectInfo, getPicklistValues } from 'lightning/uiObjectInfoApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'
import { NavigationMixin } from 'lightning/navigation';
import getPaymentMethod from '@salesforce/apex/paymentDetails.getPaymentMethod'
export default class PaymentComponent extends LightningElement {

@api orderdata
    cardName
    cardNo
    timer
    isCard=false
    isUPI=false
    isCOD=false
    selectedstatus
    @track cardName=''
    @track cardNo=''
    @track valueMM = '';
    @track valueYY = '';
    @track cardCvv=''
    @track cardUpi=''
    statusOptions=[]
    get options() {
        return [
            { label: '01', value: '01' },
            { label: '02', value: '02' },
            { label: '03', value: '03' },
            { label: '04', value: '04' },
            { label: '05', value: '05' },
            { label: '06', value: '06' },
            { label: '07', value: '07' },
            { label: '08', value: '08' },
            { label: '09', value: '09' },
            { label: '10', value: '10' },
            { label: '11', value: '11' },
            { label: '12', value: '12' },
            
        ];
    }

    handleChange(event) {
        this.valueMM = event.detail.value;
        console.log('MM',event.detail.value)
        
    }
    get options1() {
        return [
            { label: '23', value: '23' },
            { label: '24', value: '24' },
            { label: '25', value: '25' },
            { label: '26', value: '26' },
            { label: '27', value: '27' },
            { label: '28', value: '28' },
            
        ];
    }

    handleChange1(event) {
        this.valueYY = event.detail.value;
        
            console.log('yy',event.detail.value)
        
    }
    @wire(getObjectInfo, {objectApiName:OMS_PAYMENT_OBJECT})
    objectInfo

    @wire(getPicklistValues, { recordTypeId:'$objectInfo.data.defaultRecordTypeId', fieldApiName:PAYMENT_METHOD_FIELD})
    statusPicklist({data, error}){
        if(data){
            console.log(data)
            this.statusOptions = [...this.generatePicklist(data)]
        }
        if(error){
            console.error(error)
        }
    }

    generatePicklist(data){
        return data.values.map(item=>({ label: item.label, value: item.value }))
    }

    
    handleChange2(event){
        this.selectedstatus = event.detail.value;
        if(event.detail.value ==='Credit Card' ||event.detail.value ==='Debit Card'){
          this.isCard=true 
          this.isCOD=false
          this.isUPI=false
           
        }
        else if(event.detail.value ==='UPI'){
            this.isUPI=true
            this.isCard=false
            this.isCOD=false
        }
        else if(event.detail.value ==='Cash On Delivery'){
            this.isCOD=true
            this.isCard=false
            this.isUPI=false
        }
        else{
            this.isCard=false
            this.isCOD=false
            this.isUPI=false
        }
    }

    handleChange3(event){
        window.clearTimeout(this.timer)
        this.timer = window.setTimeout(()=>{
            this.cardNo=event.detail.value
            console.log('Card number',event.detail.value)
        },1000)
        
    }
    handleChange4(event){
        window.clearTimeout(this.timer)
        this.timer = window.setTimeout(()=>{
            this.cardName = event.detail.value
            console.log('Card name',event.detail.value)
        },1000)
        
    }

    handleChange5(event){
        window.clearTimeout(this.timer)
        this.timer = window.setTimeout(()=>{
            this.cardCvv = event.detail.value
            console.log('CVV',event.detail.value)
        },1000)
        
    }

    handleChange6(event){
        window.clearTimeout(this.timer)
        this.timer = window.setTimeout(()=>{
            this.cardUpi = event.detail.value
            console.log('Upi',event.detail.value)
        },1000)
    }
    orderId
     applyHandler(){
        console.log('---------------------------')
        console.log('selected Payment Type',this.selectedstatus)
        console.log('Card number',this.cardNo)
        console.log('Card name',this.cardName)
        console.log('MM',this.valueMM)
        console.log('YY',this.valueYY)
        console.log('CVV',this.cardCvv)
        console.log('UPI',this.cardUpi)
        console.log('this.orderdata.cartid',this.orderdata.cartid)
        console.log('this.orderdata.selectedAddressId',this.orderdata.selectedAddressId)
        console.log('this.orderdata.totalAmount',this.orderdata.totalAmount)
        

        getPaymentMethod({
            type:this.selectedstatus,
            Name:this.cardName,
            Num:this.cardNo,
            month:this.valueMM,
            year:this.valueYY,
            cvv:this.cardCvv,
            upi:this.cardUpi
        })
        .then(result=>{
            console.log('result',result.length)
            if(result.length){
               
              createOrder({
                    cartId : this.orderdata.cartid,
                    addressId :this.orderdata.selectedAddressId,
                    totalAmount :this.orderdata.totalAmount,
                    type : this.selectedstatus,
                    totalAmount1 : this.orderdata.totalAmount1,
                    totalAmount2 : this.orderdata.totalAmount2,
                })
                .then(result => {
                    console.log(' Order Information is ', result);
                    this.orderId=result.Id
                    const toast = new ShowToastEvent({
                        'title' : 'Success!!',
                        "message" : 'Order has beed successfully placed. Your Order no is '+result.Name,
                        "variant" : "success", 
                    });
                    this.dispatchEvent(toast);
                    this[NavigationMixin.Navigate]({
                        type: 'standard__navItemPage',
                        attributes: {
                            apiName: 'kOrderDetailPage' 
                        },
                        state : {
                            n__orderId :result.Id
                        }
                    }, true);
                })

            }
            else{
                this.showToast('Error','Please Enter Correct Details','error')
            }
        }).catch(error=>{
            console.error(error)
        })
    }

        //Toast Notification
        showToast(title,message,variant) { 
            this.dispatchEvent(new ShowToastEvent({ 
                title, 
                message, 
                variant:variant||'success' 
            }) 
            ) 
        }
       
        navigateToCart(){
            this[NavigationMixin.Navigate]({
                type:'standard__navItemPage',
                attributes:{
                    apiName:'kCartDetails'
                },
                state:{
                    n__cartId:this.orderdata.cartid
                }
            })
        }
}