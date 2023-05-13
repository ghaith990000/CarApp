import { Component } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})

export class Tab3Page {

  selectedCar: string;
  selectedDate: string;
  selectedTime: string;
  availableDates: any[] = [];
  availableSlots: any[] = [];
  showNoSlotsMessage = false;
  testDriveRequests: any[] = []; // Assume this is an array of test drive requests fetched from the backend

  constructor() {
    this.selectedCar="";
    this.selectedDate="";
    this.selectedTime="";
  }

  submitRequest() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();

    const selectedDateTime = new Date(this.selectedDate + ' ' + this.selectedTime);
    const selectedYear = selectedDateTime.getFullYear();
    const selectedMonth = selectedDateTime.getMonth();
    const selectedDay = selectedDateTime.getDate();

    if (selectedYear > currentYear || (selectedYear === currentYear && selectedMonth > currentMonth) || (selectedYear === currentYear && selectedMonth === currentMonth && selectedDay >= currentDay)) {
      const conflictingRequests = this.testDriveRequests.filter(request => {
        const requestDateTime = new Date(request.preferredDate + ' ' + request.preferredTime);
        return requestDateTime.getTime() === selectedDateTime.getTime();
      });

      if (conflictingRequests.length < 3) {
        const requestData = {
          carModel: this.selectedCar,
          preferredDate: this.selectedDate,
          preferredTime: this.selectedTime,
        };

        // TODO: Send the request data to the backend for approval by the showroom admin
      } else {
        console.log('You have exceeded the limit of 3 test drive requests with no time conflicts.');
      }
    } else {
      console.log('Please select a future date and time.');
    }
  }

  viewSlots(date: string) {
    const selectedDate = new Date(date);
    const selectedYear = selectedDate.getFullYear();
    const selectedMonth = selectedDate.getMonth();
    const selectedDay = selectedDate.getDate();

    const availableSlots = [];

    for (let i = 9; i <= 16; i++) {
      const slotDateTime = new Date(selectedYear, selectedMonth, selectedDay, i, 0, 0);
      const conflictingRequests = this.testDriveRequests.filter(request => {
        const requestDateTime = new Date(request.preferredDate + ' ' + request.preferredTime);
        return requestDateTime.getTime() === slotDateTime.getTime();
      });

      const availableSlotsCount = 3 - conflictingRequests.length;

      if (availableSlotsCount > 0) {
        availableSlots.push({
          time: slotDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          availableSlots: availableSlotsCount,
        });
      }
    }

    if (availableSlots.length > 0) {
      this.availableSlots = availableSlots;
      this.showNoSlotsMessage = false;
    } else {
      this.showNoSlotsMessage = true;
    }
  }
  
  reserveSlot(time: string) {
    const requestData = {
      carModel: this.selectedCar,
      preferredDate: this.selectedDate,
      preferredTime: time,
    };

    // TODO: Send the request data to the backend for approval by the showroom admin
  }
}