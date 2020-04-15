import {Component, OnInit} from '@angular/core';
import {map, share} from 'rxjs/operators';
import {StatModel, StatResponseModel} from './stat.model';
import {DeviceDetectorService} from '../service/device-detector.service';
import {StatService} from '../service/stat.service';

@Component({
    selector: 'app-stat',
    templateUrl: './stat.component.html',
    styleUrls: ['./stat.component.scss']
})
export class StatComponent implements OnInit {
    public dailyStats: StatModel;

    constructor(private statService: StatService, public deviceDetector: DeviceDetectorService) {

    }

    ngOnInit(): void {
        // this.statService.getStats();
        this.statService
            .getFrenchStats()
            .pipe(
                share(),
                map((stats: StatResponseModel) => {
                    return (stats && stats.results > 0 && stats.response) ? stats.response[0] : null;
                }),
            )
            .subscribe((response: StatModel) => {
                this.dailyStats = response;
                this.statService.getStats(response);
            });
    }

}
