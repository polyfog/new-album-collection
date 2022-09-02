import { Component, OnInit, Input } from '@angular/core';
import { Album } from '../album';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AlbumService } from '../album.service';

@Component({
  selector: 'app-album-info',
  templateUrl: './album-info.component.html',
  styleUrls: ['./album-info.component.css']
})
export class AlbumInfoComponent implements OnInit {

  album: Album | undefined;

  constructor(private activatedRoute: ActivatedRoute, 
              private location: Location, 
              private albumService: AlbumService
  ) {}

  ngOnInit(): void {
    this.getAlbum();
  }

  getAlbum(): void {
    const id = parseInt(this.activatedRoute.snapshot.paramMap.get('id')!, 10);
    this.albumService.getAlbum(id)
      .subscribe(album => this.album = album);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.album) {
      this.albumService.updateAlbum(this.album)
        .subscribe(() => this.goBack());
    }
  }

}
