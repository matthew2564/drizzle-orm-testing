import {data, TestResultParams} from "../../../test-data/mocks";

const getStatement = (data: TestResultParams): string => {
    let query = `SELECT * FROM TEST_RESULT WHERE 1 = 1`;

    if (!!data.appRef) {
        if (data.appRef.toString().length === 8) {
            // Finds appRefs based on 8 digits
            // Uses range query to find appRefs between those numbers
            // Most performant way of implementing the 8 digit app ref
            query += ` AND application_reference BETWEEN '${data.appRef}000' AND '${data.appRef}999'`;
        } else {
            // Otherwise use exact match
            query += ` AND application_reference = '${data.appRef}'`;
        }
    }
    if (!!data.activityCode) query += ` AND activity_code = '${data.activityCode}'`;
    if (!!data.category) query += ` AND category = '${decodeURIComponent(data.category)}'`;
    if (!!data.driverNumber) query += ` AND driver_number = '${data.driverNumber}'`;
    if (!!data.dtcCode) query += ` AND tc_cc = '${data.dtcCode}'`;
    if (!!data.passCertNumber) query += ` AND pass_cert_number = '${decodeURIComponent(data.passCertNumber)}'`;
    if (!!data.staffNumber) query += ` AND staff_number = '${data.staffNumber}'`;
    if (data.excludeAutoSavedTests) query += ` AND autosave != 1`;

    // rekey is nested in the JSON, for this param we use the main query as a sub query and filter that list
    if (data.rekey) {
        query = `SELECT TR.test_result
                 FROM (${query}) AS TR
                 WHERE JSON_EXTRACT(TR.test_result, "$.rekey") = true
                 ORDER BY TR.test_date DESC
                 LIMIT 200;`;
    } else {
        query += `ORDER BY test_date DESC LIMIT 200;`
    }

    return query;
};

console.log(getStatement(data));
