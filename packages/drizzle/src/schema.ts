// manage your schema
import {bigint, boolean, date, json, mysqlTable, tinyint, varchar} from "drizzle-orm/mysql-core";
import {TestResult} from "../../../test-data/mocks";

export const TEST_RESULT = mysqlTable('TEST_RESULT', {
    appRef: varchar('application_reference', { length: 15 }).primaryKey(),
    staffNumber: varchar('staff_number', { length: 10 }),
    testResult: json('test_result').$type<TestResult>(),
    testDate: date('test_date', { mode: 'string' }),
    dtcCode: bigint('tc_id', { mode: 'number' }),
    testCentreName: varchar('tc_cc', { length: 6 }),
    driverNumber: varchar('driver_number', { length: 24 }),
    driverSurname: varchar('driver_surname', { length: 50 }),
    resultStatus: tinyint('result_status'),
    excludeAutoSavedTests: boolean('autosave'),
    activityCode: varchar('activity_code', { length: 2 }),
    category: varchar('category', { length: 10 }),
    passCertNumber: varchar('pass_certificate_number', { length: 10 }),
    version: varchar('version', { length: 20 }),
    app_version: varchar('app_version', { length: 10 }),
});
