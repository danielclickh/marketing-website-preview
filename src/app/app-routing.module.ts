import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FontsResolverService} from "./common/services/fonts-resolver.service";
import {HomepageLayoutComponent} from "./homepage-layout/homepage-layout.component";
import {HomepageComponent} from "./homepage/homepage.component";

const routes: Routes = [
  {
    path: '',
    resolve: {
      'fonts': FontsResolverService,
    },
    children: [
      {
        path: '',
        component: HomepageLayoutComponent,
        children: [
          {path: '', component: HomepageComponent}
        ]
      }
    ]
  },
  {path: '**', redirectTo: '/', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
