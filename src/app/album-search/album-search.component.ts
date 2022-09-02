import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Album } from '../album';
import  { AlbumService } from '../album.service';

@Component({
  selector: 'app-album-search',
  templateUrl: './album-search.component.html',
  styleUrls: ['./album-search.component.css']
})
export class AlbumSearchComponent implements OnInit {
  albums$!: Observable<Album[]>;
  private searchTerms = new Subject<string>();

  constructor(private albumService: AlbumService) {}

  ngOnInit(): void {
    this.albums$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.albumService.searchAlbums(term)),
    );
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

}
