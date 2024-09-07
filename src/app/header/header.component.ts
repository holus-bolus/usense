import { Component,OnInit } from '@angular/core';
import {CurrencyService} from "../currency.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  usdRate: number = 0;
  eurRate: number = 0;

  constructor(private currencyService: CurrencyService) { }

  ngOnInit(): void {
    this.currencyService.getRates().subscribe((rates: any) => {
      this.usdRate = rates.USD;
      this.eurRate = rates.EUR;
    });
  }

}
