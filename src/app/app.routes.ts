import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { ScanComponent } from './routes/scan';
import { NoScanComponent } from './routes/noscan';
import { CashComponent } from './routes/cash';

export const routes: Routes = [
    {path: '', component: ScanComponent},
    {path: 'noscan', component: NoScanComponent},
    {path: 'cash', component: CashComponent}
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
