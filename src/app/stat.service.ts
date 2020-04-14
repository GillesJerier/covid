import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';

@Injectable({providedIn: 'root'})
export class StatService {
    readonly franceKey = 'France';

    constructor(private http: HttpClient) {
    }


    getFrenchStats() {
        const headers = {
            'x-rapidapi-host': environment.rapidApi.host,
            'x-rapidapi-key': environment.rapidApi.key
        };
        return this.http
            .get(environment.rapidApi.url + '/statistics', {headers: headers, params: {country: this.franceKey}});
    }
}
