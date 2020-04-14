import {Component} from '@angular/core';
import {StatService} from './stat.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'covid';

    constructor(private statService: StatService) {
        this.statService.getFrenchStats();
    }
}
