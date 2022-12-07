import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NewsService } from './service/news.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnInit {
  title = 'News-Application';
  public sources: any = [];
  public articles: any = [];
  public selectedNewsChannel: string = 'Top 10 Trending News!';

  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  constructor(private observer: BreakpointObserver, private cdr: ChangeDetectorRef,
    private newsService: NewsService) { }


  ngOnInit(): void {
    this.newsService.initArticles().subscribe(
      (res: any) => {
        console.log(res);
        this.articles = res.articles;
      }
    );

    this.newsService.initSources().subscribe(
      (res: any) => {
        console.log(res);
        this.sources = res.sources;
      }
    );
  }

  ngAfterViewInit(): void {
    this.sidenav.opened = true;
    
    this.observer.observe(['(max-width:787px )']).subscribe((res) => {
      if (res?.matches) {
        this.sidenav.mode = "over";
        this.sidenav.close();
      } else {
        this.sidenav.mode = "side";
        this.sidenav.open();
      }
    });
    this.cdr.detectChanges();
  }

  getSource(source: any) {
    this.newsService.getArticlesByID(source.id).subscribe((res : any) => {
   console.log(res)
   this.articles = res.articles;
      this.selectedNewsChannel = source.name;
    })
  };

  
}
