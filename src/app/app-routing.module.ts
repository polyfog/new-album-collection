import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumsComponent } from './albums/albums.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AlbumInfoComponent } from './album-info/album-info.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'albums', component: AlbumsComponent },
  { path: 'dashboard', component: DashboardComponent},
  { path: 'info/:id', component: AlbumInfoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
