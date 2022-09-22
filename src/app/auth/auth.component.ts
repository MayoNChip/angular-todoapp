import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  constructor(public authService: AuthService, public router: Router) {}

  ngOnInit(): void {
    this.authService.getIsLoggedIn().subscribe((value) => {
      if (value) {
        console.log(value, 'from auth comp');
        this.router.navigate(['/todos']);
      }
    });
  }
}
