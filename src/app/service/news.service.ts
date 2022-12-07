import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  api_Key = "f97ab830790140629172dfd5eaed6706";


  constructor(private http : HttpClient) { }

  initSources() {
    return this.http.get(`https://newsapi.org/v2/sources?language=en&apiKey=${this.api_Key}`)
  }


  initArticles() {
    return this.http.get(`https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${this.api_Key}`);
  }

  getArticlesByID(source: String) {
    return this.http.get(`https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${this.api_Key}`)
   
  }

}
