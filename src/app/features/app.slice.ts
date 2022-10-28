import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { createAction, props, Action, createReducer, on, createSelector } from '@ngrx/store';
import { AppService } from '../app.service';
import { DisplayListItem } from '../common';
import { of } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';

export const loadData = createAction('[Main Page] Loading data');
export const loadDataSuccess = createAction(
  '[Main Page] Loading data succeeded',
  props<{ payload: DisplayListItem[] }>()
);
export const loadDataFailure = createAction(
  '[Main Page] Loading data failed',
  props<{ error: string }>()
);

export const addData = createAction(
  '[Main Page] Add data',
  props<{ data: DisplayListItem[]; payload: DisplayListItem }>()
);
export const addDataSuccess = createAction(
  '[Main Page] Add data succeeded',
  props<{ payload: DisplayListItem[] }>()
);
export const addDataFailure = createAction(
  '[Main Page] Add data failed',
  props<{ error: string }>()
);

export const updateData = createAction(
  '[Main Page] Update data',
  props<{ data: DisplayListItem[]; payload: DisplayListItem }>()
);
export const updateDataSuccess = createAction(
  '[Main Page] Update data succeeded',
  props<{ payload: DisplayListItem[] }>()
);
export const updateDataFailure = createAction(
  '[Main Page] Update data failed',
  props<{ error: string }>()
);

export interface AppState {
  items: DisplayListItem[];
  loading: boolean;
  error: string | null;
}

export const initialState: AppState = {
  items: [],
  loading: false,
  error: null,
};

export const appReducer = createReducer(
  initialState,
  on(loadData, (state) => {
    return { ...state, loading: true, error: null, items: [] };
  }),
  on(loadDataSuccess, (state, { payload }) => {
    return { ...state, loading: false, error: null, items: payload };
  }),
  on(loadDataFailure, (state, { error }) => {
    return { ...state, loading: false, error: error, items: [] };
  }),
  on(addData, (state, { data, payload }) => {
    return { ...state, loading: true, error: null };
  }),
  on(addDataSuccess, (state, { payload }) => {
    return {
      ...state,
      loading: false,
      error: null,
      items: payload,
    };
  }),
  on(addDataFailure, (state, { error }) => {
    return { ...state, loading: false, error: error, items: [] };
  }),
  on(updateData, (state, { data, payload }) => {
    return { ...state, loading: true, error: null };
  }),
  on(updateDataSuccess, (state, { payload }) => {
    return {
      ...state,
      loading: false,
      error: null,
      items: payload,
    };
  }),
  on(updateDataFailure, (state, { error }) => {
    return { ...state, loading: false, error: error, items: [] };
  })
);

@Injectable()
export class AppEffects {
  loadData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadData.type),
      switchMap(() =>
        this.appService.loadData$().pipe(
          map((data: DisplayListItem[]) => ({
            type: loadDataSuccess.type,
            payload: data,
          })),
          catchError((error: Error) =>
            of({ type: loadDataFailure.type, error: error.message })
          )
        )
      )
    )
  );

  addData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addData.type),
      switchMap(({ data, payload }) =>
        this.appService.addData$(data, payload).pipe(
          map((data: DisplayListItem[]) => ({
            type: addDataSuccess.type,
            payload: data,
          })),
          catchError((error: Error) =>
            of({ type: addDataFailure.type, error: error.message })
          )
        )
      )
    )
  );

  updateData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateData.type),
      switchMap(({ data, payload }) =>
        this.appService.updateData$(data, payload).pipe(
          map((data: DisplayListItem[]) => ({
            type: updateDataSuccess.type,
            payload: data,
          })),
          catchError((error: Error) =>
            of({ type: updateDataFailure.type, error: error.message })
          )
        )
      )
    )
  );

  constructor(private actions$: Actions, private appService: AppService) {}
}

export const selectApp = (state: {app: AppState}) => state.app;
export const selectAppItems = createSelector(selectApp, (state: AppState) => state.items);