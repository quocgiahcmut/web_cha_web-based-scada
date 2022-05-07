// import ThemeReducer from './ThemeReducer';
// import { combineReducers } from 'redux';
// import SideBarReducer from './SideBarReducer';
// const rootReducer = combineReducers({ ThemeReducer, SideBarReducer });

// export default rootReducer;

import ThemeReducer from './ThemeSlice';
import SideBarReducer from './SideBarSlice';
import QaQcReportReducer from './QaQcReportSlice';
import InjectionReportReducer from './InjectionReportSlice';
import QaQcMonitorReducer from './QaQcMonitorSlice';
import OeeReportReducer from './OeeReportSlice';
import WarehouseReducer from './WarehouseSlice';
import PlanTrackingReducer from './PlanTrackingSlice';
const rootReducer = {
	theme: ThemeReducer,
	sidebar: SideBarReducer,
	qaQcReportData: QaQcReportReducer,
	injectionReportData: InjectionReportReducer,
	qaQcMonitorData: QaQcMonitorReducer,
	oeeReportData: OeeReportReducer,
	warehouse: WarehouseReducer,
	planTracking: PlanTrackingReducer,
};

export default rootReducer;
