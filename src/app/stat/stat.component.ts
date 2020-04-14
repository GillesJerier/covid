import {Component, OnInit} from '@angular/core';
import {StatService} from '../stat.service';
import {map, share} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {StatModel, StatResponseModel} from './stat.model';

@Component({
    selector: 'app-stat',
    templateUrl: './stat.component.html',
    styleUrls: ['./stat.component.scss']
})
export class StatComponent implements OnInit {
    public dailyStats: Observable<StatModel>;

    constructor(private statService: StatService) {

    }

    ngOnInit(): void {
        this.dailyStats = this.statService
            .getFrenchStats()
            .pipe(
                share(),
                map((stats: StatResponseModel) => (stats && stats.results > 0 && stats.response) ? stats.response[0] : null)
            );
    }

}
