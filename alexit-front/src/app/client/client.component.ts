import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ClientHeaderComponent } from './components/client-header/client-header.component';
import { ClientFooterComponent } from './components/client-footer/client-footer.component';
import { RouterOutlet } from '@angular/router';
import { AlexitService } from '../services/alexit.service';
import { CrudService } from '../services/crud.service';
import { NgStyle } from '@angular/common';
import { ScrollHandleService } from './services/scroll-handle.service';

@Component({
  selector: 'client',
  standalone: true,
  imports: [ClientHeaderComponent, ClientFooterComponent, RouterOutlet, NgStyle],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent implements OnInit {

  pageViews: number = 0;

  @ViewChild('main') main!: ElementRef;

  constructor(private alexit: AlexitService, private crud: CrudService, private scrollHandle: ScrollHandleService) { }

  ngOnInit(): void {
    this.alexit.initCategories();
    this.alexit.initCouriers();
    this.alexit.initProducts();
    this.alexit.initUsers();
    this.alexit.pageViews$.subscribe({
      next: v => {
        this.pageViews = v;
        if (this.pageViews !== 0) {
          this.pageViews = this.pageViews + 1
          this.crud.pageViewsPut(this.pageViews).subscribe(() => console.log('posted'))
        }
      }
    });

    this.scrollHandle.headerHeight$.subscribe({ next: v => this.adjustScrollPosition(v) });
  }

  adjustScrollPosition(headerHeight: number) {
    const fragment = window.location.hash.substring(1);
    if (fragment) {
      const targetElement = document.getElementById(fragment);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - headerHeight,
          behavior: 'smooth'
        });
      }
    }
  }

}
