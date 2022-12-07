import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { categoriesData } from '../../interfaces/categoriesData.interface';
import { storeData } from '../../interfaces/storeData.interface';
import { CategoryService } from '../../services/category.service';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-category-report',
  templateUrl: './categoryreport.component.html',
  styleUrls: ['./categoryreport.component.scss'],
})
export class CategoryReportComponent implements OnInit {
  @Input() name: string|undefined = '';
  @Input() total: number = 0;
  
  categories : Map<string | undefined, string> = new Map()
  constructor() {
  }


 
  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
  }
}
