import { Injectable } from '@angular/core';
import { Album } from './album';
import { ALBUMS } from './mock-albums';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClientModule, HttpClient, HttpHeaders} from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  constructor(private messageService: MessageService, private http: HttpClient) { }

  private albumsUrl = 'api/albums';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getAlbum(id: number): Observable<Album> {
    const url = `${this.albumsUrl}/${id}`;
    return this.http.get<Album>(url).pipe(
      tap(_ => this.log(`fetched album id=${id}`)),
      catchError(this.handleError<Album>(`getAlbum id=${id}`))
    );

  }

  getAlbums(): Observable<Album[]> {
    this.messageService.add("AlbumService: fetched albums");
    return this.http.get<Album[]>(this.albumsUrl)
      .pipe(
        tap(_ => this.log('fetched albums')),
        catchError(this.handleError<Album[]>('getAlbums', []))
      );
  }

// SAVE METHODS

updateAlbum(album: Album): Observable<any> {
  return this.http.put(this.albumsUrl, album, this.httpOptions).pipe(
    tap(_ => this.log(`updated album id=${album.id}`)),
    catchError(this.handleError<any>('updateAlbum'))
  );
}

addAlbum(album: Album): Observable<Album> {
  return this.http.post<Album>(this.albumsUrl, album, this.httpOptions).pipe(
    tap((newAlbum: Album) => this.log(`added album w/ id=${newAlbum.id}`)),
    catchError(this.handleError<Album>('addAlbum'))
  );
}

deleteAlbum(id: number): Observable<Album> {

  const url = `${this.albumsUrl}/${id}`;

  return this.http.delete<Album>(url, this.httpOptions).pipe(
    tap(_ => this.log(`deleted album id=${id}`)),
    catchError(this.handleError<Album>('deleteAlbum'))
  );
}

searchAlbums(term: string): Observable<Album[]> {
  if (!term.trim()) {
    return of([]);
  }

  return this.http.get<Album[]>(`${this.albumsUrl}/?name=${term}`).pipe(
    tap(x => x.length ?
        this.log(`found albums matching "${term}"`) :
        this.log(`no albums matching "${term}"`)),
      catchError(this.handleError<Album[]>('searchAlbums', []))
      )
}

/**
 * Handle Http operation that failed.
 * Let the app continue.
 *
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
 private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
    console.error(error);
    this.log(`${operation} failed: ${error.message}`);
    return of(result as T);
  };
}

/** Log */
private log(message: string) {
  this.messageService.add(`AlbumService: ${message}`);
}

}
