import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './inventual/dashboard/header/header.component';
import { MenuComponent } from './inventual/dashboard/menu/menu.component';
import { DashboardComponent } from './inventual/dashboard/dashboard/dashboard.component';
import { QuickviewComponent } from './inventual/dashboard/quickview/quickview.component';
import { LinechartComponent } from './inventual/dashboard/charts/linechart/linechart.component';
import { BarchartComponent } from './inventual/dashboard/charts/barchart/barchart.component';
import { SupplierComponent } from './inventual/dashboard/supplier/supplier.component';
import { TransactionComponent } from './inventual/dashboard/transaction/transaction.component';
import { CopyrightComponent } from './inventual/dashboard/copyright/copyright.component';
import { PossaleComponent } from './inventual/trading/sale/possale/possale.component';
import { NewsaleComponent } from './inventual/trading/sale/newsale/newsale.component';
import { ManagesaleComponent } from './inventual/trading/sale/managesale/managesale.component';
import { OrderdiscountComponent } from './inventual/trading/sale/popup/orderdiscount/orderdiscount.component';
import { SalereturnsComponent } from './inventual/trading/sale/salereturns/salereturns.component';
import { AddpurchaseComponent } from './inventual/trading/purchase/addpurchase/addpurchase.component';
import { ManagepurchaseComponent } from './inventual/trading/purchase/managepurchase/managepurchase.component';
import { PurchasereturnsComponent } from './inventual/trading/purchase/purchasereturns/purchasereturns.component';
import { SaleinvoiceComponent } from './inventual/trading/invoice/saleinvoice/saleinvoice.component';
import { SalesinvoiceComponent } from './inventual/trading/invoice/salesinvoice/salesinvoice.component';
import { PurchaseinvoiceComponent } from './inventual/trading/invoice/purchaseinvoice/purchaseinvoice.component';
import { ProductlistComponent } from './inventual/products/productlist/productlist.component';
import { AddbrandComponent } from './inventual/products/addbrand/addbrand.component';
import { AdjustmentComponent } from './inventual/products/adjustment/adjustment.component';
import { AddadjustmentComponent } from './inventual/products/addadjustment/addadjustment.component';
import { UnitComponent } from './inventual/products/unit/unit.component';
import { AddproductComponent } from './inventual/products/addproduct/addproduct.component';
import { GeneratebarcodeComponent } from './inventual/products/generatebarcode/generatebarcode.component';
import { AddsuplierComponent } from './inventual/supplier/addsuplier/addsuplier.component';
import { AddcustomerComponent } from './inventual/supplier/addcustomer/addcustomer.component';
import { AddbillerComponent } from './inventual/supplier/addbiller/addbiller.component';
import { SupplierlistComponent } from './inventual/supplier/supplierlist/supplierlist.component';
import { CustomerlistComponent } from './inventual/supplier/customerlist/customerlist.component';
import { BillerlistComponent } from './inventual/supplier/billerlist/billerlist.component';
import { AddexpenseComponent } from './inventual/expense/addexpense/addexpense.component';
import { CreatepaymentComponent } from './inventual/expense/createpayment/createpayment.component';
import { CategoryComponent } from './inventual/expense/category/category.component';
import { ExpenselistComponent } from './inventual/expense/expenselist/expenselist.component';
import { AdduserComponent } from './inventual/usermanagement/adduser/adduser.component';
import { CreateroleComponent } from './inventual/usermanagement/createrole/createrole.component';
import { UserlistComponent } from './inventual/usermanagement/userlist/userlist.component';
import { WarehouselistComponent } from './inventual/warehouse/warehouselist/warehouselist.component';
import { ProductreportComponent } from './inventual/report/productreport/productreport.component';
import { StockreportComponent } from './inventual/report/stockreport/stockreport.component';
import { PaymentreportComponent } from './inventual/report/paymentreport/paymentreport.component';
import { SalereportComponent } from './inventual/report/salereport/salereport.component';
import { PurchasereportComponent } from './inventual/report/purchasereport/purchasereport.component';
import { ExpensereportComponent } from './inventual/report/expensereport/expensereport.component';
import { DiscountreportComponent } from './inventual/report/discountreport/discountreport.component';
import { TaxreportComponent } from './inventual/report/taxreport/taxreport.component';
import { SupplierreportComponent } from './inventual/report/supplierreport/supplierreport.component';
import { ShippingchargereportComponent } from './inventual/report/shippingchargereport/shippingchargereport.component';
import { ProductcategoryComponent } from './inventual/products/productcategory/productcategory.component';
import { RolepermissionComponent } from './inventual/settings/rolepermission/rolepermission.component';
import { PurchaselistinvoiveComponent } from './inventual/trading/invoice/purchaselistinvoive/purchaselistinvoive.component';
import { ExpenseinvoiceComponent } from './inventual/trading/invoice/expenseinvoice/expenseinvoice.component';
import { ExpenselistinvoiceComponent } from './inventual/trading/invoice/expenselistinvoice/expenselistinvoice.component';
import { LoginComponent } from './inventual/common/login/login.component';
import { RegisterComponent } from './inventual/common/register/register.component';
import { ForgotpasswordComponent } from './inventual/common/forgotpassword/forgotpassword.component';
import { ProfileComponent } from './inventual/common/profile/profile.component';
import { MessageinboxComponent } from './inventual/common/messageinbox/messageinbox.component';
import { NewmessageComponent } from './inventual/common/newmessage/newmessage.component';
import { AddtransferComponent } from './inventual/transfer/addtransfer/addtransfer.component';
import { TransferlistComponent } from './inventual/transfer/transferlist/transferlist.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [ 
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: '', component: LoginComponent, pathMatch: 'full' },

  {
    path:'',
    canActivateChild: [AuthGuard],
    children:[
      {
        path: 'header',
        component: HeaderComponent
      },
      {
        path: 'menu',
        component: MenuComponent,
    
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate:[AuthGuard]
      },
      {
        path: 'quickview',
        component: QuickviewComponent,
    
      },
      {
        path: 'linechart',
        component: LinechartComponent
      },
      {
        path: 'barchart',
        component: BarchartComponent
      },
      {
        path: 'supplier',
        component: SupplierComponent
      },
      {
        path: 'transaction',
        component: TransactionComponent
      },
      {
        path: 'copyright',
        component: CopyrightComponent
      },
      {
        path: 'possale',
        component: PossaleComponent
      },
      {
        path: 'newsale',
        component: NewsaleComponent
      },
      {
        path: 'managesale',
        component: ManagesaleComponent,
        canActivate:[AuthGuard]

      },
      {
        path: 'orderdiscount',
        component: OrderdiscountComponent
      },
      {
        path: 'salereturns',
        component: SalereturnsComponent
      },
      {
        path: 'addpurchase',
        component: AddpurchaseComponent
      },
      {
        path: 'managepurchase',
        component: ManagepurchaseComponent
      },
      {
        path: 'purchasereturns',
        component: PurchasereturnsComponent
      },
      {
        path: 'saleinvoice',
        component: SaleinvoiceComponent
      },
      {
        path: 'expenseinvoice',
        component: ExpenseinvoiceComponent
      },
      {
        path: 'salesinvoice',
        component: SalesinvoiceComponent
      },
      {
        path: 'expenselistinvoice',
        component: ExpenselistinvoiceComponent
      },
      {
        path: 'purchaselistinvoice',
        component: PurchaseinvoiceComponent
      },
      {
        path: 'purchaseinvoice',
        component: PurchaselistinvoiveComponent
      },
      {
        path: 'productlist',
        component: ProductlistComponent
      },
      {
        path: 'addbrand',
        component: AddbrandComponent,
        canActivate:[AuthGuard]

      },
      {
        path: 'adjustment',
        component: AdjustmentComponent
      },
      {
        path: 'addadjustment',
        component: AddadjustmentComponent
      },
      {
        path: 'unit',
        component: UnitComponent
      },
      {
        path: 'addproduct',
        component: AddproductComponent
      },
      {
        path: 'generatebarcode',
        component: GeneratebarcodeComponent
      },
      {
        path: 'addsupplier',
        component: AddsuplierComponent
      },
      {
        path: 'addcustomer',
        component: AddcustomerComponent
      },
      {
        path: 'addbiller',
        component: AddbillerComponent
      },
      {
        path: 'supplierlist',
        component: SupplierlistComponent
      },
      {
        path: 'customerlist',
        component: CustomerlistComponent
      },
      {
        path: 'billerlist',
        component: BillerlistComponent
      },
      {
        path: 'addexpense',
        component: AddexpenseComponent
      },
      {
        path: 'createpayment',
        component: CreatepaymentComponent
      },
      {
        path: 'expensecategory',
        component: CategoryComponent
      },
      {
        path: 'expenselist',
        component: ExpenselistComponent
      },
      {
        path: 'adduser',
        component: AdduserComponent
      },
      {
        path: 'createrole',
        component: CreateroleComponent
      },
      {
        path: 'userlist',
        component: UserlistComponent
      },
      {
        path: 'warehouselist',
        component: WarehouselistComponent
      },
      {
        path: 'productreport',
        component: ProductreportComponent
      },
      {
        path: 'stockreport',
        component: StockreportComponent
      },
      {
        path: 'paymentreport',
        component: PaymentreportComponent
      },
      {
        path: 'salereport',
        component: SalereportComponent
      },
      {
        path: 'purchasereport',
        component: PurchasereportComponent
      },
      {
        path: 'expensereport',
        component: ExpensereportComponent
      },
      {
        path: 'discountreport',
        component: DiscountreportComponent
      },
      {
        path: 'taxreport',
        component: TaxreportComponent
      },
      {
        path: 'supplierreport',
        component: SupplierreportComponent
      },
      {
        path: 'shippingchargereport',
        component: ShippingchargereportComponent
      },
      {
        path: 'productcategory',
        component: ProductcategoryComponent
      },
      {
        path: 'rolepermission',
        component: RolepermissionComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'forgotpassword',
        component: ForgotpasswordComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'message',
        component: MessageinboxComponent
      },
      {
        path: 'newmessage',
        component: NewmessageComponent
      },
      {
        path: 'addtransfer',
        component: AddtransferComponent
      },
      {
        path: 'transferlist',
        component: TransferlistComponent
      }
    ]
  },
  
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
