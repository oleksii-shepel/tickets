export enum Department {
  Sales = 'Sales department',
  Financial = 'Financial department',
  Technical = 'Technical department',
  Security = 'Security department',
}

export enum Status {
  New = 'new',
  Edited = 'edited',
}

export interface DisplayListItem {
  id: number;
  created: number;
  updated: number;
  department: Department | null;
  title: string;
  status: Status | null;
  details: string;
  files?: File[] | null;
}
