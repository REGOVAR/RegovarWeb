import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  hero: Hero = {
    id: 1,
    name: 'Olivier'
  };

  heroes: Hero[];

  selectedHero: Hero;

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  constructor(private searchService: SearchService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.searchService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }

}
