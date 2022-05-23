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
import LoginReducer from './LoginSlice';
import PackingReducer from './PackingReportSlice';
import InjectionMonitorReducer from './InjectionMonitorSlice';
const rootReducer = {
	theme: ThemeReducer,
	sidebar: SideBarReducer,
	qaQcReportData: QaQcReportReducer,
	injectionReportData: InjectionReportReducer,
	qaQcMonitorData: QaQcMonitorReducer,
	oeeReportData: OeeReportReducer,
	warehouse: WarehouseReducer,
	planTracking: PlanTrackingReducer,
	login: LoginReducer,
	packingReportData: PackingReducer,
	injectionMonitor: InjectionMonitorReducer,
};

export default rootReducer;
