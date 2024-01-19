import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { ScrollHandleService } from '../../services/scroll-handle.service';

@Component({
  selector: 'client-main',
  standalone: true,
  imports: [FormsModule, NgxMaskDirective],
  templateUrl: './client-main.component.html',
  styleUrl: './client-main.component.css',
  providers: [provideNgxMask()]
})
export class ClientMainComponent {

  constructor(private scrollHandle: ScrollHandleService) { }

  navigateToSection(sectionId: string) {
    // Update the URL without triggering a navigation
    window.history.pushState({}, '', `#${sectionId}`);
    // Manually adjust the scroll position
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
