import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Role, UserProfile, UserService} from '../../services/user.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile: UserProfile = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    accountVerified: false,
    phoneNumber: '',
    username: '',
    password: '',
    role: Role.STUDENT,
    photoUrl: ''
  };
  isEditing: boolean = false;

  constructor(private userService: UserService, private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe(
        profile => {
          this.profile = profile;
        },
        error => {
          console.error('Error fetching profile:', error);
          this.router.navigate(['/login']);
        }
    );
  }

  editProfile(): void {
    this.isEditing = true;
  }

  saveProfile(): void {
    if (this.profile) {
      this.userService.updateUserProfile(this.profile).subscribe(
          () => {
            this.isEditing = false;
            alert('Profile updated successfully');
          },
          error => {
            console.error('Error updating profile:', error);
            alert('Failed to update profile');
          }
      );
    }
  }

  logout(): void {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

  fullName(): string {
    return this.profile?.lastName + ' ' + this.profile?.firstName;
  }
}
