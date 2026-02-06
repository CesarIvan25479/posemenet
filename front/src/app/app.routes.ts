import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './components/pages/home/home.component';
import { SoftwareComponent } from './components/pages/software/software.component';
import { FacturacionComponent } from './components/pages/facturacion/facturacion.component';
import { NubeComponent } from './components/pages/nube/nube.component';
import { ModificacionesComponent } from './components/pages/modificaciones/modificaciones.component';
import { ContactoComponent } from './components/pages/contacto/contacto.component';

export const routes: Routes = [{
  path: "", component: LayoutComponent,
  children: [
    {path: "", component: HomeComponent},
    {path: "software", component: SoftwareComponent,},
    {path: "facturacion", component: FacturacionComponent,},
    {path: "tiempo-aire", component: SoftwareComponent,},
    {path: "servicios-nube", component: NubeComponent,},
    {path: "modificaciones", component: ModificacionesComponent,},
    {path: "contacto", component: ContactoComponent},
  ]
}];
