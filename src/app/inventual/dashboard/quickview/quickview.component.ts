import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { categoriesData } from '../../interfaces/categoriesData.interface';
import { storeData } from '../../interfaces/storeData.interface';
import { CategoryService } from '../../services/category.service';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-quickview',
  templateUrl: './quickview.component.html',
  styleUrls: ['./quickview.component.scss'],
})
export class QuickviewComponent implements OnInit {
  @Input() idStore: string|undefined = '';
  @Input() dateRange: string = '';
  storeData: storeData = {
    _sum: {
      total: 0,
      payed: 0,
      debt: 0
    }
  };
  
  constructor(private dashboardService: DashboardService, private categoryService: CategoryService) {
    
  }


  getDataFromDB(){
    
    this.dashboardService.getStoreData(this.idStore!, this.dateRange).subscribe(resp => {
      this.storeData = resp
    })
  }

  

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    this.getDataFromDB()
  }
}
