import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { ScanComponent } from './routes/scan';
import { CashComponent } from './routes/cash';
import { LegacyComponent } from './routes/legacy';
import { NFCComponent } from './routes/nfc';

export const routes: Routes = [
    {path: '', component: ScanComponent},
    {path: 'legacy', component: LegacyComponent},
    {path: 'nfc', component: NFCComponent},
    {path: 'cash', component: CashComponent}
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
