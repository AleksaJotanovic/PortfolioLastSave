import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Output, ViewChild } from '@angular/core';
import { ScrollHandleService } from '../../services/scroll-handle.service';

@Component({
  selector: 'client-header',
  standalone: true,
  imports: [],
  templateUrl: './client-header.component.html',
  styleUrl: './client-header.component.css'
})
export class ClientHeaderComponent implements AfterViewInit {
  isNavbarFixed: boolean = false;

  @ViewChild('header') header!: ElementRef;
  @ViewChild('afternav') afternav!: ElementRef;



  constructor(private scrollHandle: ScrollHandleService) { }

  ngAfterViewInit(): void {
    const headerHeight = this.header.nativeElement.clientHeight;
    this.scrollHandle.setHeaderHeight(headerHeight);
  }



  @HostListener('window:scroll', [])
  OnScroll() {
    if (window.pageYOffset > this.header.nativeElement.clientHeight) {
      this.isNavbarFixed = true;
      this.header.nativeElement.style.position = 'sticky';
      this.afternav.nativeElement.style.display = 'none';
    } else {
      this.isNavbarFixed = false;
      this.header.nativeElement.style.position = 'static';
      this.afternav.nativeElement.style.display = 'flex';
    }
  }


}
