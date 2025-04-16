import { Component } from '@angular/core';
import { CrudService } from '../../crud.service';
import { log } from 'console';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  constructor(private crud: CrudService) {}
  getItems() {
    this.crud.get().subscribe((data) => {
      console.log(data);
    });
  }
  myobj = {
    name: 'aayus',
    location: 'kathmancu',
  };
  //   putItems() {
  //     this.crud.post(this.myobj).subscribe((resp) => {
  //       console.log(resp);
  //     });
  //   }
}
