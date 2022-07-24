import { Component, OnInit } from '@angular/core';
import { Album } from '../album';
import { AlbumService } from '../album.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  albums: Album[] = []

  constructor(private albumService: AlbumService) { }

  ngOnInit(): void {
    this.getAlbums();
  }

  getAlbums(): void {
    this.albumService.getAlbums().subscribe(albums => this.albums = albums.slice(1, 5));
  }

}
