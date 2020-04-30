import {Component} from '@angular/core';
import {StatService} from './service/stat.service';
import {AuthService} from './service/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    loading = true;

    constructor(private statService: StatService, private authService: AuthService) {
        this.authService
            .signIn()
            .then(() => {
                this.loading = false;
            })
            .catch(console.log);
    }
}
