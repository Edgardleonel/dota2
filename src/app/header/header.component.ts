import { ModalComponent } from './../modal/modal.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(public matDialog: MatDialog) {}

  ngOnInit(): void {
  }

  openModal() {
    this.matDialog.open(ModalComponent);
  }

}
