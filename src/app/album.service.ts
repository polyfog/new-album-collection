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

  getAlbum(id: number): Observable<Album> {

    const album = ALBUMS.find(a => a.id === id)!;
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(album);

  }

  getAlbums(): Observable<Album[]> {
    const albums = of(ALBUMS);
    this.messageService.add("AlbumService: fetched albums");
    return albums;
  }
}
