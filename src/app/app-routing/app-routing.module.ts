import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouterModule , Routes} from '@angular/router';
import { routes } from './routes';

const routes: Routes = [];

@NgModule({
  imports: [
  RouterModule.forRoot(routes),
  CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
