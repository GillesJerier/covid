import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {map, share} from 'rxjs/operators';
import {StatModel, StatResponseModel} from './stat.model';
import {DeviceDetectorService} from '../service/device-detector.service';
import {StatService} from '../service/stat.service';
import {Subject, Subscription} from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

@Component({
    selector: 'app-stat',
    templateUrl: './stat.component.html',
    styleUrls: ['./stat.component.scss']
})
export class StatComponent implements OnInit, OnDestroy {
    @ViewChild(MatSort, {static: true}) sort: MatSort;
    public dailyStats: StatModel;
    dataSource = new MatTableDataSource<{ country: string, cases: number, deaths: number }>();
    loading = new Subject<boolean>();
    columnsToDisplay = ['country', 'cases', 'deaths'];
    stickyTable = true;
    private allStatsSubs: Subscription;

    constructor(public statService: StatService, public deviceDetector: DeviceDetectorService) {
        this.stickyTable = !this.deviceDetector.isDesktop();
    }

    ngOnInit(): void {
        this.dataSource.sort = this.sort;
        this.getAllStats();
        this.getAndSetCountryStats(this.statService.franceKey);
    }

    getAndSetCountryStats(countryName) {
        this.statService
            .getCountryStats(countryName)
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

    onCountrySelected(countryName) {
        this.getAndSetCountryStats(countryName);
    }

    getAllStats() {
        this.loading.next(true);
        this.allStatsSubs = this.statService.getAllCountriesStats()
            .pipe(
                map((stats: any) => {
                    return (stats && stats.results > 0 && stats.response) ? stats.response : null;
                })
            )
            .subscribe(
                (response: StatModel[]) => {
                    const stats = response.map((stat: StatModel) => {
                        return {country: stat.country, cases: stat.cases.total, deaths: stat.deaths.total};
                    });
                    this.dataSource.data = this.statService.sortStatData(stats);
                },
                (error) => {
                    console.log('Error fetching data for all countries: ', error);
                },
                () => {
                    this.loading.next(false);
                });
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    ngOnDestroy(): void {
        if (this.allStatsSubs) {
            this.allStatsSubs.unsubscribe();
        }
    }
}
