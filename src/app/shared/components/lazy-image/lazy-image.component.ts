import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html',
  styleUrl: './lazy-image.component.css'
})
export class LazyImageComponent implements OnInit{

  @Input()
  public url!: string;

  @Input()
  public alt: string = '';

  protected hasLoaded: boolean = false;

  ngOnInit(): void {
    if(!this.url) {
      throw new Error('La propiedad "url" es obligatoria.');
    }
  }


  onLoad() {
    this.hasLoaded = true;
  }
}
