import { LightningElement ,track, wire } from 'lwc';

import { NavigationMixin } from 'lightning/navigation';

import { loadScript, loadStyle } from 'lightning/platformResourceLoader';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import FullCalendarJS from '@salesforce/resourceUrl/FullCalendarJS';
import fetchEvents from '@salesforce/apex/FullCalendarController.fetchEvents';
import createEvent from '@salesforce/apex/FullCalendarController.createEvent';
import getUserIds from '@salesforce/apex/FullCalendarController.getUserIds';
//import fetchEventsByType from '@salesforce/apex/FullCalendarController.fetchEventsByType';
import deleteEvent from '@salesforce/apex/FullCalendarController.deleteEvent';
import { refreshApex } from '@salesforce/apex';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import TYPE from "@salesforce/schema/Program__c.Program_Type__c";
import PROGRAM_OBJECT from "@salesforce/schema/Program__c";

export default class CalendarNewone extends NavigationMixin(LightningElement) {
     ProgramEndDate;
    ProgramDate;
    ProgramType;
    FacultysName;
    Email;
    CourseId;
   // ContactId;

    selectedProgramType = '';
    ProgramTypeOptions = [
        { label: 'In person', value: 'In Person' },
        { label: 'Hybrid', value: 'Hybrid' },
        { label: 'Online', value: 'Online' }
    ];
    
    isFaculty
    options =[
        { label: 'All', value: 'All' },
        { label: 'In person', value: 'In Person' },
        { label: 'Hybrid', value: 'Hybrid' },
        { label: 'Online', value: 'Online' }
        
    ];
    selectedProgram='All'
    @wire(getUserIds)
    getUsers({data,error})
    {
        if(data)
        {
            console.log('data User',data)
            this.isFaculty=data
            console.log('this.isFaculty',this.isFaculty)
        }
       else
        {
            console.log('error User',JSON.stringify(error))
            this.isFaculty=false
            console.log('this.isFaculty',this.isFaculty)
        }
    }
    handleProgram(event)
    {
               
this.selectedProgram=event.target.value

    }

 getProgramType(data)
 {
 return data.values.map(item =>({
 value:item.value,label:item.value
 })
 
 )
 }
 handleProductChange(event)
 {
this.selectedProgramType=event.target.value
 }

    fullCalendarJsInitialised = false;
   

    //Fields to store the event data -- add all other fields you want to add
    //@track fields
    //title;
   
    eventsRendered = true;//To render initial events only once
    openSpinner = false; //To open the spinner in waiting screens
    openModal = false; //To open form

    @track
    events= []; //all calendar events are stored in this field

    //To store the orignal wire object to use in refreshApex method
    eventOriginalData = [];
    
    //Get data from server - in this example, it fetches from the event object
 
    @wire(fetchEvents,{programType:'$selectedProgram'})
    eventObj(value){
        // this.eventOriginalData = value; //To use in refresh cache
console.log(value)
        let {data, error} = value;
        if(data){
            // this.events=[]
            //format as fullcalendar event object
            console.log('data',data);
            let events = data.map(event => {
                console.log(event)
                return { id : event.Id, 
                        title : event.Name, 
                        start : event.Program_Date__c,
                        end : event.Program_End_Date__c
                       
                       };
            });
            console.log(events)
            this.events = JSON.parse(JSON.stringify(events));

            // this.events = JSON.parse(events)
            console.log('this.events',this.events);
           // this.events = JSON.parse(JSON.stringify(events));
            this.error = undefined;

            //load only on first wire call - 
            //if events are not rendered, try to remove this 'if' condition and add directly 
            // console.log(this.eventsRendered)
  let ele = this.template.querySelector("div.fullcalendarjs");
                // let ele = document.getElementById('calendar')
                // ele.clear()
               // $(ele).fullCalendar('renderEvents');
               $(ele).fullCalendar('refetchEvents');
                $(ele).fullCalendar('renderEvents',this.events,true);
                console.log(this.events.filter((e)=>e))


        //    if(this.eventsRendered){
        //         //Add events to calendar// ele.clear()
                
        //         let ele = this.template.querySelector("div.fullcalendarjs");
        //         // let ele = document.getElementById('calendar')
        //         // ele.clear()
        //        // $(ele).fullCalendar('renderEvents');
        //        $(ele).fullCalendar('refetchEvents');
        //         $(ele).fullCalendar('renderEvents',this.events,true);
        //         console.log(this.events.filter((e)=>e))
        //        this.eventsRendered = true;
        //    }
        
        }else if(error){
            this.events = [];
            this.error = 'No events are found';
                        console.log('error',error);

        }
   }
 

   /**
    * Load the fullcalendar.io in this lifecycle hook method
    */
   renderedCallback() {
      // Performs this operation only on first render
     if (this.fullCalendarJsInitialised) {
         return;
      }
      this.fullCalendarJsInitialised = true;

      // Executes all loadScript and loadStyle promises
      // and only resolves them once all promises are done
        Promise.all([
            loadScript(this, FullCalendarJS + "/FullCalendarJS/jquery.min.js"),
            loadScript(this, FullCalendarJS + "/FullCalendarJS/moment.min.js"),
            loadScript(this, FullCalendarJS + "/FullCalendarJS/fullcalendar.min.js"),
            loadStyle(this, FullCalendarJS + "/FullCalendarJS/fullcalendar.min.css"),
        ])
        .then(() => {
            //initialize the full calendar
        this.initialiseFullCalendarJs();
        })
        .catch((error) => {
        console.error({
            message: "Error occured on FullCalendarJS",
            error,
        });
        });
   }
//    document.addEventListener('DOMContentLoaded', function() {
//     var calendarEl = document.getElementById('calendar');
  
//     var calendar = new Calendar(calendarEl, {
//       plugins: [ dayGridPlugin ]
//     });
  
//     calendar.render();
//   });
  

    initialiseFullCalendarJs() {
        let ele = this.template.querySelector("div.fullcalendarjs");
        let modal = this.template.querySelector('div.modalclass');
        console.log('lll',FullCalendar);

        var self = this;

        //To open the form with predefined fields
        //TODO: to be moved outside this function
        function openActivityForm(startDate, endDate,){
            self.startDate = startDate;
            self.endDate = endDate;
           
            self.openModal = self.isFaculty;
           
           
            
        }
        //Actual fullcalendar renders here - https://fullcalendar.io/docs/v3/view-specific-options
        $(ele).fullCalendar({
            header: {
                left: "prev,next today",
                center: "title",
                right: "month,agendaWeek,agendaDay",
            },
            defaultDate: new Date(), // default day is today - to show the current date
            defaultView : 'month', //To display the default view - as of now it is set to week view
            navLinks: true, // can click day/week names to navigate views
            // editable: true, // To move the events on calendar - TODO 
            selectable: true, //To select the period of time

            //To select the time period : https://fullcalendar.io/docs/v3/select-method
            select: function (startDate, endDate) {
                let stDate = startDate.format();
                let edDate = endDate.format();
                
                openActivityForm(stDate, edDate);
            },
            eventLimit: true, // allow "more" link when too many events
            events: this.events, // all the events that are to be rendered - can be a duplicate statement here
        });
    }

    //TODO: add the logic to support multiple input texts
    handleKeyup(event) {
        this.title = event.target.value;
    }
    
    //To close the modal form
    handleCancel(event) {
        this.openModal = false;
    }

   //To save the event
    handleSave(event) {
        let events = this.events;
        this.openSpinner = true;

        //get all the field values - as of now they all are mandatory to create a standard event
        //TODO- you need to add your logic here.
        this.template.querySelectorAll('lightning-input').forEach(ele => {
           console.log('ele',ele)
        
           if(ele.name === 'ProgramDate'){
                this.startDate = ele.value.includes('.000Z') ? ele.value : ele.value + '.000Z';
            }
            if(ele.name === 'ProgramEndDate'){
                this.endDate = ele.value.includes('.000Z') ? ele.value : ele.value + '.000Z';
            }
            if(ele.name === 'Email'){
               this.Email = ele.value; 
               console.log(' this.Email',this.Email)
            }
            

        let course=this.template.querySelector('.course')
        console.log('course',course.value)
                this.CourseId =course.value; 

       
        });
       
        //format as per fullcalendar event object to create and render
        let newevent = { start : this.startDate, end: this.endDate,
        ProgramType:this.selectedProgramType,email:this.Email,course:this.CourseId};
        console.log(this.events);
        console.log('JSON.stringify(newevent)',JSON.stringify(newevent));
        //Close the modal
        this.openModal = false;
        //Server call to create the event
        createEvent({'event' : JSON.stringify(newevent)})
        .then( result => {
            let ele = this.template.querySelector("div.fullcalendarjs");

            //To populate the event on fullcalendar object
            //Id should be unique and useful to remove the event from UI - calendar
            newevent.id = result;
              console.log('  newevent.id',  newevent.id);
              console.log('result',result);
            
            //renderEvent is a fullcalendar method to add the event to calendar on UI
            //Documentation: https://fullcalendar.io/docs/v3/renderEvent
            $(ele).fullCalendar( 'renderEvent', newevent, true );
            
            //To display on UI with id from server
            this.events.push(newevent);

            //To close spinner and modal
            this.openSpinner = false;

            //show toast message
            this.showNotification('Success!!', 'Your Program has been logged', 'success');

        })
        .catch( error => {
            console.log(error);
            this.openSpinner = false;

            //show toast message - TODO 
            this.showNotification('Oops', 'Something went wrong, please review console', 'error');
        })
   }
   
   /**
    * @description: remove the event with id
    * @documentation: https://fullcalendar.io/docs/v3/removeEvents
    */
   removeEvent(event) {
        //open the spinner
        this.openSpinner = true;

        //delete the event from server and then remove from UI
        let eventid = event.target.value;
        deleteEvent({'eventid' : eventid})
        .then( result => {
            console.log(result);
            let ele = this.template.querySelector("div.fullcalendarjs");
            console.log(eventid);
            $(ele).fullCalendar( 'removeEvents', [eventid] );

            this.openSpinner = false;
            
            //refresh the grid
        return refreshApex(this.eventOriginalData);
           // this.fectPrograms()

        })
        .catch( error => {
            console.log(error);
            this.openSpinner = false;
        });
   }

   /**
    *  @description open the modal by nullifying the inputs
    */
    addEvent(event) {
        this.startDate = null;
        this.endDate = null;
        this.title = null;
        this.openModal=true
      
    }

    /**
     * @description method to show toast events
     */
    showNotification(title, message, variant) {
        console.log('enter');
        let evt = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(evt);
    }

    handleEventClick(event) {
        // Get the record Id from the event data
        const recordId = event.detail.event.extendedProps.recordId;

        // Navigate to the record page
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: recordId,
                objectApiName: 'Program__c', // Replace with your object API name
                actionName: 'view'
            }
        });
    }
}