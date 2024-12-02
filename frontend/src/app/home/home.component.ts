import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    CardModule, 
    ButtonModule, 
    RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  // Component logic here
  features = [
    {
      title: 'Začíname',
      subtitle: 'Sprievodca pre začiatočníkov',
      description: 'Naučte sa základy lezenia. Potrebné znalosti pri výbere výbavy, typy a rada ako začať a ako sa zlepšovať.',
      link: '/getting-started'
    },
    {
      title: 'Základná výbava',
      subtitle: 'S čím začať',
      description: 'Pozrite si naše odporúčania pre lezeckú výbavu, aby ste mohli bezpečne začať. Ak máte svoje overené vybavenie, odporúčte ho.',
      link: '/gear'
    },
    {
      title: 'Miesta na lezenie',
      subtitle: 'Interiérové a exteriérové lokality',
      description: 'Objavte naše obľúbené miesta na lezenie, pridajte tie vaše a prečítajte si hodnotenia od ďalších lezcov.',
      link: '/spots'
    }
  ];
  
}
