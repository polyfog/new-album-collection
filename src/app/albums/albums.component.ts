import { Component, OnInit } from '@angular/core';
import { Album } from '../album';
import { AlbumService } from '../album.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {

  constructor(private albumService: AlbumService, private messageService: MessageService) { }

  albums: Album[] = [];

  ngOnInit(): void {
    this.getAlbums();
  }

  getAlbums() {
    this.albumService.getAlbums().subscribe(albums => this.albums = albums);
  }

}
