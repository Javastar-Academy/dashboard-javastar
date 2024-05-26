import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-footer',
  templateUrl: './dashboard-footer.component.html',
  styleUrls: ['./dashboard-footer.component.css']
})
export class DashboardFooterComponent implements OnInit {

  email: string;
  selectedLanguage: any;
  languages = [
    { name: 'Romana', code: 'RO', icon:'ro.png' },
    { name: 'English', code: 'EN' }
];

  ngOnInit() {
    this.languages = [
        { name: 'Romana', code: 'RO', icon:'ro.png' },
        { name: 'English', code: 'EN' }
    ];
    this.selectedLanguage = this.languages[0];
}
}
