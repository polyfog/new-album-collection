import { Injectable } from '@angular/core';
import { Album } from './album';
import { ALBUMS } from './mock-albums';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  constructor(private messageService: MessageService) { }

  getAlbums(): Observable<Album[]> {
    const albums = of(ALBUMS);
    this.messageService.add("AlbumService: fetched albums");
    return albums;
  }
}
