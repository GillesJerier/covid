import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';

@Injectable()
export class StatsService {
    readonly franceKey = 'france';

    constructor(private http: HttpClient) {
    }


    getFrenchStats() {
        const headers = {
            'x-rapidapi-host': environment.rapidApi.host,
            'x-rapidapi-key': environment.rapidApi.key
        };
        this.http.get(environment.rapidApi.url + '/countries', {headers: headers, params: {country: this.franceKey}})
            .subscribe(console.log);
    }
}
