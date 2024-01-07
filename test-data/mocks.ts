// emulating payload provided to function
export const data = {
    startDate: '2021-01-01', // done
    endDate: '2024-01-06', // done
    appRef: 11112222, // done
    staffNumber: '12434567', // done
    dtcCode: 54321, // done
    driverNumber: 'BELL991142', // done
    excludeAutoSavedTests: false, // done
    activityCode: '53', // done
    category: 'B+E', // done
    passCertNumber: 'C123456X', // done
    rekey: true,
};

export interface TestResultParams {
    startDate: string;
    endDate: string;
    appRef: number;
    staffNumber: string;
    dtcCode: number;
    driverNumber: string;
    excludeAutoSavedTests: boolean;
    activityCode: string;
    category: string;
    passCertNumber: string;
    rekey: boolean;
}

// stub of TR interface
export interface TestResult {
    hello: string;
}
