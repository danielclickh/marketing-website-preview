export interface QueryResponse {
  query?: string,
  status: number,
  query_id?: string,
  error?: any,
  response?: QueryResults
  warning?: string | undefined
}

export interface QueryResults {
  meta: Column[];
  data: Record<string, any>[];
  rows: number;
  exception?: string;
  statistics: QueryStatistics,
}

export interface QueryStatistics {
  elapsed: number,
  rows_read: number,
  bytes_read: number
}

export interface Column {
  database?: string;
  table?: string;
  name: string;
  type: string;
}

export interface QueryParameter {
  name: string;
  type?: string;
  textStartPos?: number;
  textEndPos?: number;
  value: string;
}
