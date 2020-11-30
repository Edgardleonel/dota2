import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { RenderGraphicService } from './../service/render-graphic.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public teams: any = [];
  public chart: any = [];
  public link = 'teams';
  public dataTables;
  public dataGraphs;

    constructor(private api: ApiService, private graphicService: RenderGraphicService) { }

    ngOnInit(): void {
      this.getApi(this.link);
    }


    getApi(link) {
      this.api.getTeams(link).subscribe((res) => {
        this.teams = res;
        this.teams = this.teams.filter((res, index) => index < 100);
        console.log(this.teams);
        this.dataTables = this.teams;
        this.dataGraphs = this.teams.filter((res, index) => index < 10);
        this.graphicService.renderGraphic(this.dataGraphs);
      });
    }
}
