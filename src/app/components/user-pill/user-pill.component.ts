import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { jamUserCircle, jamCog, jamLogOut } from '@ng-icons/jam-icons';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-user-pill',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NgIconComponent,
  ],
  providers: [
    provideIcons({ jamUserCircle, jamCog, jamLogOut })
  ],
  templateUrl: './user-pill.component.html',
  styleUrl: './user-pill.component.scss'
})
export class UserPillComponent implements OnInit {
  @ViewChild('pill') pillRef!: ElementRef;

  user?: User;
  isActive: boolean = false;
  
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.userService.getMe().subscribe(user => {
      this.user = user;
    });
  }

  @HostListener('document:click', ['$event'])
  onMouseClick(event: MouseEvent) {
    if (this.isActive && !this.pillRef.nativeElement.contains(event.target)) {
      this.closeDropdown();
    }
  }

  signout() {
    this.authService.signout();
  }

  toggleDropdown() {
    if (this.isActive) {
      this.closeDropdown();
    } else {
      this.openDropdown();
    }
  }

  openDropdown() {
    this.isActive = true;
  }

  closeDropdown() {
    this.isActive = false;
  }
  
}
