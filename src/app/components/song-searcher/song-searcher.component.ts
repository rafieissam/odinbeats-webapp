import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { jamSearch } from '@ng-icons/jam-icons';

@Component({
  selector: 'app-song-searcher',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgIconComponent,
  ],
  providers: [
    provideIcons({ jamSearch }),
  ],
  templateUrl: './song-searcher.component.html',
  styleUrl: './song-searcher.component.scss'
})
export class SongSearcherComponent {
  @Input('searchText') searchText: string = '';

  constructor(
    private router: Router,
  ) { }
  
  onSearch() {
    if (!this.searchText.trim().length) return;
    this.router.navigate(['/search'], { queryParams: { text: this.searchText }});
  }

}
