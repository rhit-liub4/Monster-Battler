import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEventType, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, throwError, firstValueFrom, Subject } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

const urlBase = 'https://localhost:5160/api/';
const httpOptions = {
  headers: new HttpHeaders({
  'Content-Type': 'application/json',
  'Cache-Control': 'no-cache',
  // 'Access-Control-Allow-Origin': '*',
  // 'Access-Control-Expose-Headers': '*',
  
  }),
  //withCredentials: true,
  observe: 'response' as 'response'
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {

   }
async post(url: string, body: any, errorMessage: string = url): Promise<MonsterBattlerHttpResponse> {
    console.log("Sending Post Request In HTTP Service");
    console.log(url);
    var response = await this.formatHttpResponse(this.http.post<MonsterBattlerHttpResponse>(urlBase+url,body, httpOptions));
    if(!response.success) {
      console.log(errorMessage);
    }
    return response;
  }

  async get(url: string, errorMessage: string = url):Promise<MonsterBattlerHttpResponse>
  {
    console.log("Entering getter");
    var response = await this.formatHttpResponse(this.http.get<MonsterBattlerHttpResponse>(urlBase+url,httpOptions));
    console.log("Created a response");
    if(!response.success){
      console.log("get not working");
      console.log(errorMessage);
    }
    return response;
  }
  

  async formatHttpResponse(responseAsObservable: Observable<HttpResponse<MonsterBattlerHttpResponse>>): Promise<MonsterBattlerHttpResponse> {
    const response = await firstValueFrom(responseAsObservable.pipe(catchError(this.handleError.bind(this))));
    return {
      results: response.body?.results,
        success: response.body?.success,
          status: response.body?.status
    } as MonsterBattlerHttpResponse;
  }

  private handleError(error: HttpErrorResponse) {
    switch (error.status) {
      case 400:
        break;
      case 401:
        break;
      case 404:
        break;
      case 500:
        break;
      default:
  }
  console.error(error);
  return new Observable<never>();

}
}
export interface MonsterBattlerHttpResponse {
  results: any;
  success: boolean;
  status: number;
}


