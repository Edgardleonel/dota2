import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) { }

  readonly url = environment.api;

  getTeams(link): Observable<any[]> {
    return this.http.get<any[]>(this.url + link);
  }

  getDetailTeams(teamsId): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}teams/${teamsId}`);
  }

  getTeamsByPlayer(teamsId): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}teams/${teamsId}/players`);
  }

  getTeamsByHeroes(teamsId): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}teams/${teamsId}/heroes`);
  }

}
