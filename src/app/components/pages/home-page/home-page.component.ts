import { Component, OnInit } from '@angular/core';

import { MainHeaderComponent } from '../../main-header/main-header.component';
import { LowProfileHeaderComponent } from '../../low-profile-header/low-profile-header.component';

import { Project } from '../../../interfaces/project';
import { PROJECTLIST } from '../../../project-list';

@Component({
  selector: 'app-home',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  projectList: Project[] = PROJECTLIST;

  ngOnInit(): void {}

}
