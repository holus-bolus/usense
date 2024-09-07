import { Component, OnInit } from '@angular/core'
import { CurrencyService } from '../currency.service'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-currency-converter',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './currency-converter.component.html',
  styleUrl: './currency-converter.component.css',
})
export class CurrencyConverterComponent implements OnInit {
  fromCurrency: string = 'UAH'
  toCurrency: string = 'USD'
  fromAmount: number = 1
  toAmount: number = 0
  rates: any = {}


  fromCurrencySymbol: string = '₴'
  toCurrencySymbol: string = '$'

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.currencyService.getRates().subscribe((rates: any) => {
      this.rates = rates
      this.convertFrom()
    })
  }

  convertFrom(): void {
    this.toAmount = this.currencyService.convertCurrency(
      this.fromAmount,
      this.fromCurrency,
      this.toCurrency,
      this.rates
    )
  }


  convertTo(): void {
    this.fromAmount = this.currencyService.convertCurrency(
      this.toAmount,
      this.toCurrency,
      this.fromCurrency,
      this.rates
    )
  }

  onFromCurrencyChange(): void {
    this.updateCurrencySymbols()
    this.convertFrom()
  }

  onToCurrencyChange(): void {
    this.updateCurrencySymbols()
    this.convertFrom()
  }

  swapCurrencies(): void {
    const tempCurrency = this.fromCurrency
    this.fromCurrency = this.toCurrency
    this.toCurrency = tempCurrency
    this.updateCurrencySymbols()
    this.convertFrom()
  }

  updateCurrencySymbols(): void {
    this.fromCurrencySymbol = this.getCurrencySymbol(this.fromCurrency)
    this.toCurrencySymbol = this.getCurrencySymbol(this.toCurrency)
  }

  getCurrencySymbol(currency: string): string {
    switch (currency) {
      case 'USD':
        return '$'
      case 'EUR':
        return '€'
      case 'UAH':
        return '₴'
      default:
        return ''
    }
  }
}
