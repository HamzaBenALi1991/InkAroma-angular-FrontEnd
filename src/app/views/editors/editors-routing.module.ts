import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Editors'
    },
    children: [
      {
        path: 'text-editors',
        loadChildren: () => import('./text-editors/text-editors.module').then(m => m.TextEditorsModule)
      },
      {
        path: 'code-editors',
        loadChildren: () => import('./code-editors/code-editors.module').then(m => m.CodeEditorsModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditorsRoutingModule {}
