import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EnvService} from './env.service';

@Injectable({
  providedIn: 'root',
})
export class PeptideReferencesService {
  API_URL = '';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'multipart/form-data',
      // 'Authorization': 'my-auth-token'
    }),
  };

  constructor(private httpClient: HttpClient,
              private env: EnvService) {
    this.API_URL = env.apiUrl;
  }

  getFirstPage(idpeptide = '29', search = '', page = 1) {
    if (search === '') {
      return this.httpClient.get(`${this.API_URL}/peptidereferences/?idpeptide=` + String(idpeptide));
    } else {
      return this.httpClient.get(`${this.API_URL}/peptidereferences/?search=` + String(search)
        + '&page=' + String(page));
    }
  }

  add(data): Observable<any> {
    return this.httpClient.post<any>(`${this.API_URL}/peptidereferences/`,
      data);
  }

  put(data, id: number): Observable<any> {
    return this.httpClient.put<any>(`${this.API_URL}/peptidereferences/` + id + '/',
      data);
  }

  addRef(data): Observable<any> {
    return this.httpClient.post<any>(`${this.API_URL}/references/`,
      data);
  }

  putRef(data, id: number): Observable<any> {
    return this.httpClient.post<any>(`${this.API_URL}/references/` + id + '/',
      data);
  }

  receive_all(search: string, idpept: string) {
    return this.httpClient.get(`${this.API_URL}/peptidereferences/save/?search=` + search
      + '&idpeptide=' + idpept);
  }

  send(data: object) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.httpClient.post<any>(`${this.API_URL}/save_peptidereferences_results/`, data, this.httpOptions);
  }
}
