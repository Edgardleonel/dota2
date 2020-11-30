import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() dataTables;

  constructor(private routes: Router) { }

  ngOnInit(): void {
  }

  openDetail(teamId) {
    if (teamId) {
      this.routes.navigate(['detalhe', teamId]);
    }
  }
}
