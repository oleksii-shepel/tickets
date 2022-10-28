import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Department, Status, DisplayListItem } from './common';

let displayList: DisplayListItem[] = [
  {
    id: 1,
    created: Date.now(),
    updated: Date.now(),
    department: Department.Sales,
    title: 'First ticket',
    status: Status.New,
    details: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  },
  {
    id: 2,
    created: Date.now(),
    updated: Date.now(),
    department: Department.Financial,
    title: 'Second ticket',
    status: Status.New,
    details: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  },
  {
    id: 3,
    created: Date.now(),
    updated: Date.now(),
    department: Department.Sales,
    title: 'Third ticket',
    status: Status.Edited,
    details: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  },
  {
    id: 4,
    created: Date.now(),
    updated: Date.now(),
    department: Department.Technical,
    title: 'Fourth ticket',
    status: Status.Edited,
    details: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  },
  {
    id: 5,
    created: Date.now(),
    updated: Date.now(),
    department: Department.Security,
    title: 'Fifth ticket',
    status: Status.New,
    details: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  },
];

@Injectable()
export class AppService implements OnDestroy {
  public subject$ = new BehaviorSubject<DisplayListItem[]>([]);
  public timeout1!: NodeJS.Timeout;
  public timeout2!: NodeJS.Timeout;
  public timeout3!: NodeJS.Timeout;

  constructor() {}

  loadData$(): Observable<DisplayListItem[]> {
    this.timeout1 = setTimeout(() => {
      this.subject$.next(displayList);
    }, 500);
    return this.subject$;
  }

  addData$(
    data: DisplayListItem[],
    payload: DisplayListItem
  ): Observable<DisplayListItem[]> {
    this.timeout2 = setTimeout(() => {
      let maxNumber = Math.max(...data.map((item) => item.id));
      let item = {...payload, id: maxNumber + 1};
      
      this.subject$.next([...data, item]);
    }, 500);
    return this.subject$;
  }

  updateData$(
    data: DisplayListItem[],
    payload: DisplayListItem
  ): Observable<DisplayListItem[]> {
    this.timeout3 = setTimeout(() => {
      let resultArray = [...data];

      let index = resultArray.findIndex(
        (value, index, object) => value.id === payload.id
      );

      if (index > -1) {
        resultArray[index] = payload;
      }
      this.subject$.next(resultArray);
    }, 500);
    return this.subject$;
  }

  ngOnDestroy() {
    this.subject$.complete();
    clearTimeout(this.timeout1);
    clearTimeout(this.timeout2);
    clearTimeout(this.timeout3);
  }
}
