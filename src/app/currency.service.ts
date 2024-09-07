import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  private apiUrl = 'https://v6.exchangerate-api.com/v6/bc1328402c37d79dfdbaf376/latest/USD'

  constructor(private http: HttpClient) {}

  getRates(): Observable<any> {
    return this.http.get(this.apiUrl).pipe(
      map((data: any) => {
        const rates = {
          UAH: data.conversion_rates.UAH,
          USD: data.conversion_rates.USD,
          EUR: data.conversion_rates.EUR,
        }
        return rates
      })
    )
  }

  convertCurrency(
    amount: number,
    fromCurrency: string,
    toCurrency: string,
    rates: any
  ): number {
    return (amount / rates[fromCurrency]) * rates[toCurrency]
  }
}
