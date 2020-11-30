import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DetailComponent } from './detail/detail.component';
import { UserComponent } from './user/user.component';
import { GuardService } from './service/guard.service';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'painel', component: DashboardComponent, canActivate: [GuardService] },
  { path: 'detalhe/:id', component: DetailComponent, canActivate: [GuardService] },
  { path: 'usuario', component: UserComponent, canActivate: [GuardService] },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
