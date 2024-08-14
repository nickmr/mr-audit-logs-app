import AUDIT_LOGS from "./fixtures/audit-logs";
import { isEmpty, isNil } from "lodash";
import { useEffect, useState } from "react";

export default function useQueryAuditLogs({ searchText, dateRange }) {
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    asyncFetchAuditLogs({ searchString: searchText, setResponse, setLoading, dateRange });
  }, [searchText, dateRange])

  return { loading, response };
}

function asyncFetchAuditLogs({ searchString, setResponse, setLoading, dateRange }) {
  setLoading(true);
  setTimeout(() => {
    let auditLogs = AUDIT_LOGS;
    if (!isEmpty(searchString)) {
      auditLogs = auditLogs.filter(auditLog => auditLog.readableAction.toLowerCase().includes(searchString.toLowerCase()));
    }
    if (!isNil(dateRange) && !isEmpty(dateRange)) {
      const [startDate, endDate] = dateRange;
      auditLogs = auditLogs.filter(auditLog => {
        const timestamp = new Date(auditLog.timestamp);
        return (!startDate || timestamp >= startDate) && (!endDate || timestamp <= endDate);
      });
    }

    setResponse(auditLogs);
    setLoading(false);
  }, 800)
}
