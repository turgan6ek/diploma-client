import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CustomLayoutComponent} from './custom-layout/custom-layout.component';
import {VexRoutes} from '../@vex/interfaces/vex-route.interface';
import {QuicklinkModule, QuicklinkStrategy} from 'ngx-quicklink';
import {AuthGuard} from './guards/auth.guard';
import {MainPageComponent} from "./pages/apps/main-page/main-page.component";

const routes: VexRoutes = [
    {
        path: 'login',
        loadChildren: () => import('./pages/pages/auth/login/login.module').then(m => m.LoginModule),
    },
    {
        path: 'register',
        loadChildren: () => import('./pages/pages/auth/register/register.module').then(m => m.RegisterModule),
    },
    {
        path: 'forgot-password',
        loadChildren: () => import('./pages/pages/auth/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule),
    },
    {
        path: 'coming-soon',
        loadChildren: () => import('./pages/pages/coming-soon/coming-soon.module').then(m => m.ComingSoonModule),
    },
    {
        path: 'coming-soon',
        loadChildren: () => import('./pages/pages/coming-soon/coming-soon.module').then(m => m.ComingSoonModule),
    },
    {
        path: '',
        component: MainPageComponent,
    },
    {
        path: 'main-page',
        component: MainPageComponent,
    },
    {
        path: 'cometchat',
        loadChildren: () => import('./pages/apps/cometchat/cometchat.module').then(m => m.CometchatModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'dashboards',
        loadChildren: () => import('./pages/apps/scrumboard/scrumboard.module').then(m => m.ScrumboardModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'report',
        loadChildren: () => import('./pages/apps/reports/reports.module').then(m => m.ReportsModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'apps',
        canActivate: [AuthGuard],
        children: [
            {
                path: 'calendar',
                loadChildren: () => import('./pages/apps/calendar/calendar.module').then(m => m.CalendarModule),
                data: {
                    toolbarShadowEnabled: true
                }
            },
            {
                path: 'social',
                loadChildren: () => import('./pages/apps/social/social.module').then(m => m.SocialModule)
            }
        ]
    },
    {
        path: 'pages',
        children: [
            {
                path: 'error-404',
                loadChildren: () => import('./pages/pages/errors/error-404/error-404.module').then(m => m.Error404Module)
            },
            {
                path: 'error-500',
                loadChildren: () => import('./pages/pages/errors/error-500/error-500.module').then(m => m.Error500Module)
            }
        ]
    },
    {
        path: '**',
        loadChildren: () => import('./pages/pages/errors/error-404/error-404.module').then(m => m.Error404Module)
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        preloadingStrategy: QuicklinkStrategy,
        scrollPositionRestoration: 'enabled',
        relativeLinkResolution: 'corrected',
        anchorScrolling: 'enabled'
    })],
    exports: [RouterModule, QuicklinkModule]
})
export class AppRoutingModule {
}
