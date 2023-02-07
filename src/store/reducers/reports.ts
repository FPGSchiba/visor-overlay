import { ReportsActionTypes } from '../actions/reports';
import { GET_UPDATING_REPORT } from '../constants/reports';
import { IReportState } from '../format';

const initialState: IReportState = {
    updateState: {
        updating: false
    }
}


export default function auth(state = initialState, action: ReportsActionTypes): IReportState {
    switch(action.type) {
        case GET_UPDATING_REPORT:
            return { ...state, updateState: { updating: action.updating, report: action.report } }
        default: return state;
    }
}