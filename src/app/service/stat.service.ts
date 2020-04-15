import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {AngularFirestore} from '@angular/fire/firestore';
import {StatModel} from '../stat/stat.model';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class StatService {
    readonly franceKey = 'France';

    constructor(private http: HttpClient, private db: AngularFirestore) {
    }


    getFrenchStats() {
        const headers = {
            'x-rapidapi-host': environment.rapidApi.host,
            'x-rapidapi-key': environment.rapidApi.key
        };
        return this.http
            .get(environment.rapidApi.url + '/statistics', {headers: headers, params: {country: this.franceKey}});
    }

    getStats(statistic: StatModel) {
        this.db
            .collection('stats', stat => stat.where('time', '==', statistic.time))
            .valueChanges()
            .pipe(map(stats => stats.length))
            .subscribe(count => {
                if (count <= 0) {
                    this.setStats(statistic);
                }
            });
    }

    setStats(stats: StatModel) {
        if (stats) {
            console.log('ADD to cloud firestore', stats);
            this.db.collection('stats').add(stats);
        }
    }
}
