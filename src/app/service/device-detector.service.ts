import {Injectable} from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';

@Injectable({providedIn: 'root'})
export class DeviceDetectorService {
    private mobile = false;
    private tablet = false;
    private tabletLandscape = false;
    private desktop = false;

    constructor(private breakpointObserver: BreakpointObserver) {
        breakpointObserver.observe('(max-width: 767px)').subscribe((result) => {
            this.mobile = result.matches;
        });
        breakpointObserver.observe('(min-width: 768px) and (max-width: 1023px)').subscribe((result) => {
            this.tablet = result.matches;
        });
        breakpointObserver.observe('(min-width: 1024px)').subscribe((result) => {
            this.tabletLandscape = this.desktop = result.matches;
        });
    }

    public isMobile() {
        return this.mobile;
    }

    public isTablet() {
        return this.tablet;
    }

    public isTabletLandscape() {
        return this.tabletLandscape;
    }

    public isDesktop() {
        return this.desktop;
    }
}
