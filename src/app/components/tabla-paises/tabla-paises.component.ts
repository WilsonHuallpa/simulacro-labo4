import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { BanderasService } from 'src/app/services/banderas.service';

@Component({
  selector: 'app-tabla-paises',
  templateUrl: './tabla-paises.component.html',
  styleUrls: ['./tabla-paises.component.scss'],
})
export class TablaPaisesComponent implements OnInit {
  botonSeleccionado: string | null = null;
  misBanderas: any[] | undefined;
  misPaises: Observable<any> | undefined;
  bandera: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  selectedCountry: any = null;
  @Input() pais: any;

  @Output() seleccionar = new EventEmitter<string>()
  constructor(private servBandea: BanderasService) {}

  ngOnInit(): void {
    this.servBandea.todos().subscribe((banderas) => {
      this.misBanderas = banderas;
    });
    this.misPaises = this.servBandea.todos();
  }

  getDisplayedCountries(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.misBanderas?.slice(startIndex, endIndex) || [];
  }
  selectCountry(country: string) {
    this.seleccionar.emit(country)
    this.selectedCountry = country;
  }

  isSelected(country: string) {
    return this.selectedCountry === country;

  }

  // buscarPais(nombre: string) {
  //   this.servBandea
  //     .pais(nombre)
  //     .subscribe((t) => (this.bandera = t[0].flags.png));
  // }
}
