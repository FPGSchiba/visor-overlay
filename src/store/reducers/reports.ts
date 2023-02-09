import { ReportsActionTypes } from '../actions/reports';
import { GET_UPDATING_REPORT, GET_VIEW_HELPER_OPEN, GET_VIEW_HELPER_UPDATING } from '../constants/reports';
import { IReportState } from '../format';

const initialState: IReportState = {
    updateState: {
        updating: false,
        open: false,
    }
}


export default function report(state = initialState, action: ReportsActionTypes): IReportState {
    switch(action.type) {
        case GET_UPDATING_REPORT:
            return { ...state, updateState: { updating: action.updating, report: action.report, open: action.open } }
        default: return state;
    }
}