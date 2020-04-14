export interface StatResponseModel {
    get: string;
    parameter: any;
    errors: [any];
    results: number;
    response: StatModel;
}

export interface StatModel {
    country: string;
    cases: {
        new: string
        active: number;
        critical: number;
        recovered: number;
        total: number
    };
    deaths: {
        new: string;
        total: number
    };
    tests: {
        total: number
    };
    day: string;
    time: string;
}
