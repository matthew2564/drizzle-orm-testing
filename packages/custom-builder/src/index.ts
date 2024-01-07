import {data} from "../../../test-data/mocks";

const getAppRef = (appRef: unknown) => {
    return ((appRef as string).toString().length === 8)
        // Finds appRefs based on 8 digits
        // Uses range query to find appRefs between those numbers
        // Most performant way of implementing the 8 digit app ref search
        ? `BETWEEN '${appRef}000' AND '${appRef}999'`

        // if appRef is not 8 digits, use exact match
        : `${appRef}`;
};

class BuildStatement<T> {
    private query: string;

    constructor(baseQuery: string) {
        this.query = baseQuery;
    }

    complexCondition<K extends keyof T>(
        columnName: string,
        value: T[K],
        transform?: (data: T[K]) => unknown,
    ) {
        // if value exist, we will add it to the query
        if (!!value) {
            const transformed = (!!transform)
                ? (transform(value) as T[K])
                : (typeof value === 'string') ? `'${value}'` : value;

            this.query += ` AND ${columnName} = ${transformed}`;
        }
        return this;
    }

    andEquals<K extends keyof T>(columnName: string, value: T[K], transform?: (data: T[K]) => unknown) {
        // if value exist, we will add it to the query
        if (!!value) {
            // if a transform function is provided, use that to transform the value
            const transformed = (!!transform)
                ? (transform(value) as T[K])
                // otherwise detect the value type, and wrap in quotes if string
                : (typeof value === 'string') ? `'${value}'` : value;

            this.query += ` AND ${columnName} = ${transformed}`;
        }

        return this;
    }

    andNotEquals<K extends keyof T>(columnName: string, value: T[K], comparator: T[K]) {
        if (!!value) {
            this.query += ` AND ${columnName} != '${comparator}'`;
        }
        return this;
    }

    toSQL(): string {
        return this.query;
    }
}

console.log(
    new BuildStatement('SELECT * FROM TEST_RESULT WHERE 1 = 1')
        .complexCondition(
            'application_reference',
            data.appRef,
            getAppRef,
        )
        .andEquals('application_reference', data.appRef, getAppRef)
        .andEquals('activity_code', data.activityCode)
        .andEquals('category', decodeURIComponent(data.category))
        .andEquals('tc_cc', data.dtcCode)
        .andEquals('pass_cert_number', decodeURIComponent(data.passCertNumber))
        .andEquals('staff_number', data.staffNumber)
        .andNotEquals('autosave', data.excludeAutoSavedTests, 1)
        .toSQL()
)
