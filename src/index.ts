import {QueryBuilder} from 'drizzle-orm/mysql-core';
import {TEST_RESULT} from "./schema";
import {and, between, desc, eq, ne} from "drizzle-orm";
import type {SQLWrapper} from "drizzle-orm/sql/sql";
import {data} from "./mocks";

const qb = new QueryBuilder();

const getAppRefCondition = () => {
    if (data.appRef) {
        return (data.appRef.toString().length === 8)
            // Finds appRefs based on 8 digits
            // Uses range query to find appRefs between those numbers
            // Most performant way of implementing the 8 digit app ref search
            ? between(TEST_RESULT.appRef, `${data.appRef}000`, `${data.appRef}999`)

            // if appRef is not 8 digits, use exact match
            : eq(TEST_RESULT.appRef, data.appRef.toString());
    }
    return undefined;
};

// emulating conditions
const conditions: (SQLWrapper | undefined)[] = [
    // check if app ref provided - can be abstracted out if a lot of logic is required
    getAppRefCondition(),

    // when dates provided, check the testDate is between the start & end
    (!!data.startDate && !!data.endDate) ? between(TEST_RESULT.testDate, data.startDate, data.endDate) : undefined,

    // when excludeAutoSavedTests provided, check the excludeAutoSavedTests is not equal to payload
    (data.excludeAutoSavedTests) ? ne(TEST_RESULT.excludeAutoSavedTests, data.excludeAutoSavedTests) : undefined,

    // when the following are provided, check each is equal to payload when defined
    !!(data.activityCode) ? eq(TEST_RESULT.activityCode, data.activityCode) : undefined,
    !!(data.category) ? eq(TEST_RESULT.category, decodeURIComponent(data.category)) : undefined,
    !!(data.driverNumber) ? eq(TEST_RESULT.driverNumber, data.driverNumber) : undefined,
    !!(data.dtcCode) ? eq(TEST_RESULT.dtcCode, data.dtcCode) : undefined,
    !!(data.staffNumber) ? eq(TEST_RESULT.staffNumber, data.staffNumber) : undefined,
    !!(data.passCertNumber) ? eq(TEST_RESULT.passCertNumber, decodeURIComponent(data.passCertNumber)) : undefined,
];

const query = qb
    .select()
    .from(TEST_RESULT)
    .where(and(...conditions))
    .orderBy(desc(TEST_RESULT.testDate))
    .limit(200)
    .toSQL();

console.log(query);
