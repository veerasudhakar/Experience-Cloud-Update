import { LightningElement, wire } from 'lwc';
import { loadScript, loadStyle } from 'lightning/platformResourceLoader';
import fullcalandar from '@salesforce/resourceUrl/fullcalandar';
import getprograms from '@salesforce/apex/newcalendar.getprograms';


export default class calendar extends LightningElement {
  
  @wire(getprograms) programs;

  renderedCallback() {
    Promise.all([
      loadScript(this, fullcalandar + '/fullcalandar.min.js'),
      loadStyle(this, fullcalandar + '/fullcalandar.min.css'),
    ]).then(() => {
      this.initCalendar();
    });
  }

  initCalendar() {
    const calendarEl = this.template.querySelector('.calendar');
    const calendar = new fullcalandar.Calendar(calendarEl, {
      plugins: ['dayGrid'],
      programs: this.programs.data.map(program => {
        return {
          Name: program.Name,
          FacultyName : program.Faculty_Name__c,
          Time: program.Program_Time__c,
          type: program.Program_Type__c,
          Date: program.Program_Date__c
        };
      }),
      eventClick: function(info) {
        alert(info.program.extendedProps.FacultyName);
      }
    });
    calendar.render();
  }
}