import { Component } from '@angular/core';
import { signal, computed } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-services',
  standalone: true,
  imports: [NgFor, FormsModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
})
export class ServicesComponent {
  ServicesList = signal<string[]>(['Web Development', 'Mobile Apps']);
  newService: string = '';

  addService() {
    if (this.newService.trim()) {
      this.ServicesList.set([...this.ServicesList(), this.newService.trim()]);
      this.newService = ''; // Clear the input
      console.log('Service added:', this.ServicesList());
    }
  }
}
