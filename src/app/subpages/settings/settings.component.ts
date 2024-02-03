import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
  ],
  providers: [
    UserService,
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  user?: User;
  
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getMe().subscribe(user => {
      this.user = user;
    });
  }
}
