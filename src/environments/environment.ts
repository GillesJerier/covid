// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    rapidApi: {
        url: 'https://covid-193.p.rapidapi.com',
        key: 'aa031ca2f3mshb1031c09cdadc95p112729jsnef05ffd6bc4f',
        host: 'covid-193.p.rapidapi.com'
    }
};
