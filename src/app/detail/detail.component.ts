import { Component, OnInit } from '@angular/core';
import { RenderGraphicService } from './../service/render-graphic.service';
import { ApiService } from '../service/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  public id;
  public teamsId;
  public player;
  public heroes;
  public team;
  public chart: any = [];
  public dataTablesPlayer;
  public dataTablesHeroes;

  constructor(private api: ApiService, private graphicService: RenderGraphicService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.getPlayer();
    this.getDetailTeam();
  }

  getPlayer() {
    this.api.getTeamsByPlayer(this.id).subscribe((res) => {
    this.player = res;
    this.player = this.player.filter(res => res.is_current_team_member === true);
    console.log('player', this.player);
    if (this.player.length > 0) {
      this.graphicService.renderGraphic(this.player);
      this.dataTablesPlayer = this.player;
    }
    });
  }

  getDetailTeam() {
    this.api.getDetailTeams(this.id).subscribe((res) => {
      this.team = res;
      console.log('team', this.team);
    });
  }

  getHeroes() {
    this.api.getTeamsByHeroes(this.id).subscribe((res) => {
      this.heroes = res;
      this.heroes = this.heroes.filter((res, index) => index < 10);
      console.log('heroes', this.heroes);
      this.dataTablesHeroes = this.heroes;
      this.heroes = this.heroes.map(res => ({...res, name: res.localized_name}));
      this.graphicService.renderGraphic(this.heroes);
    });
  }

  tabEvent(event) {
    console.log(event);
    if (event.index === 1) {
      setTimeout(() => this.getHeroes(), 500);
    }
    if (event.index === 0) {
      setTimeout(() => this.getPlayer(), 500);
    }
  }
}
