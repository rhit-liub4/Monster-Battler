import { Routes } from '@angular/router';
import { BattleScreenComponent } from './screens/battle-screen/battle-screen.component';
import { HeroScreenComponent } from './screens/hero-screen/hero-screen.component';
import { CampScreenComponent } from './screens/camp-screen/camp-screen.component';
import { MerchentScreenComponent } from './screens/merchant-screen/merchent-screen.component';

export const routes: Routes = [
    {path: "battlescreen", component: BattleScreenComponent},
    {path: "heroscreen", component: HeroScreenComponent},
    {path: "campscreen", component: CampScreenComponent},
    {path: "merchentscreen", component: MerchentScreenComponent},
    {path: "**", component: CampScreenComponent}

];
