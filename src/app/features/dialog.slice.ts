import { createAction, props, createReducer, on, createSelector, createFeatureSelector } from '@ngrx/store';
import { DisplayListItem, Status } from '../common';
import { AppState } from './app.slice';

export const setData = createAction(
  '[Dialog Page] Set data',
  props<{ payload: DialogState }>()
);

export const appendFiles = createAction(
  '[Dialog Page] Append files',
  props<{ payload: FileList }>()
);

export const removeFile = createAction(
  '[Dialog Page] Remove file',
  props<{ payload: File }>()
);

export const updateTimestamp = createAction(
  '[Dialog Page] Update timestamp',
  props<{ created: number; updated: number; status: Status }>()
);

export interface DialogState extends DisplayListItem {}

export const initialState: DialogState = {
  id: 0,
  created: Date.now(),
  updated: Date.now(),
  department: null,
  title: '',
  status: null,
  details: '',
  files: [],
};

export const dialogReducer = createReducer(
  initialState,
  on(setData, (_, { payload }) => {
    return { ...payload };
  }),
  on(appendFiles, (state, { payload }) => {
    let files: File[] = [];

    for (const key of Object.keys(payload)) {
      let file = payload[<any>key];
      if (!!file) {
        files.push(file);
      }
    }

    let availableFiles = state.files == null ? [] : [...state.files];
    let uniqueFiles: File[] = [];

    files.forEach((file) => {
      let duplicateFound = availableFiles.findIndex(
        (item) => file.name === item.name
      );
      if (duplicateFound === -1) {
        uniqueFiles.push(file);
      }
    });

    return { ...state, files: [...availableFiles, ...uniqueFiles] };
  }),
  on(removeFile, (state, { payload }) => {
    if (state.files != null && state.files.length > 0) {
      let files = state.files.filter(
        (file: File) => payload.name !== file.name
      );
      return { ...state, files };
    }
    return state;
  }),
  on(updateTimestamp, (state, { created, updated, status }) => {
    return { ...state, created, updated, status };
  })
);

export const selectDialog = (state: {dialog: DialogState}) => state.dialog;
export const selectDialogFiles = createSelector(selectDialog, (state: DialogState) => state.files);