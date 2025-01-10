import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private _tagsHistory: string[] = [];
  private apikey: string = 'uH36n7Rv0qsdYHn9zvTfa2KV9iYp7e1C';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  public gifList: Gif[] = [];

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
  }
  
  get tagsHistory() {
    return [...this._tagsHistory];
  }
  
  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();
    
    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);
    }
    
    this._tagsHistory.unshift(tag);
    
    this._tagsHistory = this.tagsHistory.splice(0, 10);
    this.saveLocalStorage();
  }
  
  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }
  
  private loadLocalStorage(): void {
    let gifsLocal = localStorage.getItem('history');
    
    if(gifsLocal) {
      this._tagsHistory = JSON.parse(gifsLocal);
    }

    if(this.tagsHistory && this.tagsHistory.length > 0) {
      this.searchTag(this.tagsHistory[0]);
    }
  }

  public searchTag(tag: string): void {
    if (tag.length === 0) return;

    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apikey)
      .set('q', tag)
      .set('limit', 10);

    this.http
      .get<SearchResponse>(`${this.serviceUrl}/search`, { params })
      .subscribe((resp) => {
        this.gifList = resp.data;
        console.log(this.gifList);
      });
  }
}
