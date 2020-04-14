import {Component} from '@angular/core';
import {StatsService} from './stats.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app';

    constructor(private statsService: StatsService) {
        this.statsService.getFrenchStats();
    }
}
