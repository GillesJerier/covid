import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {AngularFirestore} from '@angular/fire/firestore';
import {FormattedCountryStats, StatModel} from '../stat/stat.model';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class StatService {
    readonly franceKey = 'France';
    public availableCountries = [
        'Afghanistan',
        'Albania',
        'Algeria',
        'Andorra',
        'Angola',
        'Antigua-and-Barbuda',
        'Argentina',
        'Armenia',
        'Aruba',
        'Australia',
        'Austria',
        'Azerbaijan',
        'Bahamas',
        'Bahrain',
        'Bangladesh',
        'Barbados',
        'Belarus',
        'Belgium',
        'Benin',
        'Bermuda',
        'Bhutan',
        'Bolivia',
        'Bosnia-and-Herzegovina',
        'Brazil',
        'Brunei-',
        'Bulgaria',
        'Burkina-Faso',
        'Cabo-Verde',
        'Cambodia',
        'Cameroon',
        'Canada',
        'CAR',
        'Cayman-Islands',
        'Chad',
        'Channel-Islands',
        'Chile',
        'China',
        'Colombia',
        'Congo',
        'Costa-Rica',
        'Croatia',
        'Cuba',
        'Cura&ccedil;ao',
        'Cyprus',
        'Czechia',
        'Denmark',
        'Diamond-Princess-',
        'Djibouti',
        'Dominican-Republic',
        'DRC',
        'Ecuador',
        'Egypt',
        'El-Salvador',
        'Equatorial-Guinea',
        'Eritrea',
        'Estonia',
        'Eswatini',
        'Ethiopia',
        'Faeroe-Islands',
        'Fiji',
        'Finland',
        'France',
        'French-Guiana',
        'French-Polynesia',
        'Gabon',
        'Gambia',
        'Georgia',
        'Germany',
        'Ghana',
        'Gibraltar',
        'Greece',
        'Greenland',
        'Guadeloupe',
        'Guam',
        'Guatemala',
        'Guinea',
        'Guyana',
        'Haiti',
        'Honduras',
        'Hong-Kong',
        'Hungary',
        'Iceland',
        'India',
        'Indonesia',
        'Iran',
        'Iraq',
        'Ireland',
        'Isle-of-Man',
        'Israel',
        'Italy',
        'Ivory-Coast',
        'Jamaica',
        'Japan',
        'Jordan',
        'Kazakhstan',
        'Kenya',
        'Kuwait',
        'Kyrgyzstan',
        'Latvia',
        'Lebanon',
        'Liberia',
        'Liechtenstein',
        'Lithuania',
        'Luxembourg',
        'Macao',
        'Madagascar',
        'Malaysia',
        'Maldives',
        'Malta',
        'Martinique',
        'Mauritania',
        'Mauritius',
        'Mayotte',
        'Mexico',
        'Moldova',
        'Monaco',
        'Mongolia',
        'Montenegro',
        'Montserrat',
        'Morocco',
        'Namibia',
        'Nepal',
        'Netherlands',
        'New-Caledonia',
        'New-Zealand',
        'Nicaragua',
        'Niger',
        'Nigeria',
        'North-Macedonia',
        'Norway',
        'Oman',
        'Pakistan',
        'Palestine',
        'Panama',
        'Papua-New-Guinea',
        'Paraguay',
        'Peru',
        'Philippines',
        'Poland',
        'Portugal',
        'Puerto-Rico',
        'Qatar',
        'R&eacute;union',
        'Romania',
        'Russia',
        'Rwanda',
        'S.-Korea',
        'Saint-Lucia',
        'Saint-Martin',
        'San-Marino',
        'Saudi-Arabia',
        'Senegal',
        'Serbia',
        'Seychelles',
        'Singapore',
        'Sint-Maarten',
        'Slovakia',
        'Slovenia',
        'Somalia',
        'South-Africa',
        'Spain',
        'Sri-Lanka',
        'St.-Barth',
        'St.-Vincent-Grenadines',
        'Sudan',
        'Suriname',
        'Sweden',
        'Switzerland',
        'Taiwan',
        'Tanzania',
        'Thailand',
        'Timor-Leste',
        'Togo',
        'Trinidad-and-Tobago',
        'Tunisia',
        'Turkey',
        'U.S.-Virgin-Islands',
        'UAE',
        'Uganda',
        'UK',
        'Ukraine',
        'Uruguay',
        'USA',
        'Uzbekistan',
        'Vatican-City',
        'Venezuela',
        'Vietnam',
        'Zambia',
        'Zimbabwe'
    ];

    constructor(private http: HttpClient, private db: AngularFirestore) {
    }


    getAllCountriesStats() {
        const headers = {
            'x-rapidapi-host': environment.rapidApi.host,
            'x-rapidapi-key': environment.rapidApi.key
        };
        return this.http
            .get(environment.rapidApi.url + '/statistics', {headers: headers});
    }


    getCountryStats(country: string = this.franceKey) {
        const headers = {
            'x-rapidapi-host': environment.rapidApi.host,
            'x-rapidapi-key': environment.rapidApi.key
        };
        return this.http
            .get(environment.rapidApi.url + '/statistics', {headers: headers, params: {country: country}});
    }

    getStats(statistic: StatModel) {
        this.db
            .collection(
                'stats',
                stat =>
                    stat
                        .where('time', '==', statistic.time)
                        .where('country', '==', statistic.country)
            )
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
            console.log('Added to store', stats);
            this.db.collection('stats').add(stats);
        }
    }

    sortStatData(data: FormattedCountryStats[]) {
        return data.sort((statA: FormattedCountryStats, statB: FormattedCountryStats) => {
            return statB.deaths - statA.deaths;
        });
    }
}
