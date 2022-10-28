import { AppState } from "./app.slice";
import { DialogState } from "./dialog.slice";

export interface ApplicationState {
    app: AppState,
    dialog: DialogState
}