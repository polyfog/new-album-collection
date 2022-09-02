import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Album } from './album';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const albums = [
      {id: 21, name: "Infinito Particular"},
      {id: 22, name: "Sobrevivendo no Inferno"},
      {id: 23, name: "Ungodly Hour"},
      {id: 24, name: "Blue"},
      {id: 25, name: "Alvvays"},
      {id: 26, name: "Back To Black"},
      {id: 27, name: "Twin Fantasy"},
      {id: 28, name: "The Bends"},
      {id: 29, name: "Carrie And Lowell"},
      {id: 30, name: "Half Way Home"},
      {id: 31, name: "Homogenic"}
    ];
    return {albums};
  }

  // Overrides the genId method to ensure that an album always has an id.
  // If the albums array is empty,
  // the method below returns the initial number (11).
  // if the albums array is not empty, the method below returns the highest
  // album id + 1.
  genId(albums: Album[]): number {
    return albums.length > 0 ? Math.max(...albums.map(album => album.id)) + 1 : 11;
  }
}