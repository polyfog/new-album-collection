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

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.albumService.addAlbum({ name } as Album)
      .subscribe(album => {
        this.albums.push(album);
      });
  }

  delete(album: Album): void {
    this.albums = this.albums.filter(a => a !== album);
    this.albumService.deleteAlbum(album.id).subscribe();
  }

}
