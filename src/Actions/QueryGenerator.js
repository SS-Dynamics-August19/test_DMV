export default class QueryGenerator {
    /** Generates an HTTP query string for the team shared MS Dynamics, based on the input parameters.
     * Will return every record in the table.
     * 
     * @param {string} tableName Which table to query, without the publisher prefix.
     *                               For example, "madmv_ma_user".
     * @param {...string} columnsNames The name of each field to include in the result set.
     *                            For example, ...[ "madmv_name", "madmv_password", "madmv_securityroles" ].
     */
    static generateDynamicsQueryMultiRecord(tableName, ...columnsNames) {
        return QueryGenerator.generateDynamicsQuery(undefined, tableName, ...columnsNames);
    }
    
    /** Generates an HTTP query string for the team shared MS Dynamics, based on the input parameters.
     * Will return one record, specified by GUID.
     * 
     * @param {string?} GUID The GUID of the record to retrieve, in the format "12345678-1234-1234-1234-123456789012".
     * @param {string} tableName Which table to query, WITH the publisher prefix.
     *                               For example, "madmv_ma_user".
     * @param {...string} columnsNames The name of each field to include in the result set.
     *                            For example, ...[ "madmv_name", "madmv_password", "madmv_securityroles" ].
     */
    static generateDynamicsQuery(GUID, tableName, ...columnsNames) {
        let query = "https://sstack.crm.dynamics.com/api/data/v9.1/" + tableName + "s";

        if(GUID !== undefined) query += "(" + GUID + ")";

        query += "?$select=";

        let isSecondOrLaterColumnSoUseComma = false;
        for(let column of columnsNames) {
            if (isSecondOrLaterColumnSoUseComma) query += ",";
            isSecondOrLaterColumnSoUseComma = true;
            query += column;
        }

        return query;
    }
}