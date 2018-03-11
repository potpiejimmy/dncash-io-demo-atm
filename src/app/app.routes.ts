import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { ScanComponent } from './routes/scan';

export const routes: Routes = [
    {path: '', component: ScanComponent}
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
