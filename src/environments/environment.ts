// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    rapidApi: {
        host: 'covid-193.p.rapidapi.com',
        url: 'https://covid-193.p.rapidapi.com',
        key: 'aa031ca2f3mshb1031c09cdadc95p112729jsnef05ffd6bc4f'
    },
    firebase: {
        apiKey: 'AIzaSyBn54ZKCnwUkdEDa1NNiChJSicPfjGBR8I',
        authDomain: 'covid-19-7dc8c.firebaseapp.com',
        databaseURL: 'https://covid-19-7dc8c.firebaseio.com',
        projectId: 'covid-19-7dc8c',
        storageBucket: 'covid-19-7dc8c.appspot.com',
        messagingSenderId: '386412071023',
        appId: '1:386412071023:web:69ffb6278549da0f0b659a',
        measurementId: 'G-R7SP0WYKP2'
    }
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
