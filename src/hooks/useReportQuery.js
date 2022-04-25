import { getTemporaryInjectionReport } from '../api/axios/injectionReport';
import { useQuery } from 'react-query';

const useInjectionReportQuery = (machineId, dateStart, dateEnd) => {
	return useQuery(['injection_report', machineId, dateStart, dateEnd], getTemporaryInjectionReport, {
		refetchOnWindowFocus: false,
		enabled: false,
		staleTime: Infinity,
	});
};

// const useQaQcReportQuery = (query, dateStart, dateEnd) => {
// 	let key = '';
// 	let fetchFn = null;
// 	switch (query) {
// 		case 'endurance':
// 			key = 'endurance_report';
// 			fetchFn = getEnduranceReport;
// 			break;
// 		case 'forced-endurance':
// 			key = 'forced_endurance_report';
// 			fetchFn = getEnduranceReport;
// 			break;
// 		case 'rock-test':
// 			key = 'rock_test_report';
// 			fetchFn = getEnduranceReport;
// 			break;
// 		case 'static-load':
// 			key = 'static_load_report';
// 			fetchFn = getEnduranceReport;
// 			break;
// 		case 'bending':
// 			key = 'bending_report';
// 			fetchFn = getEnduranceReport;
// 			break;
// 		case 'water-proof':
// 			key = 'water_proof_report';
// 			fetchFn = getEnduranceReport;
// 			break;
// 		default:
// 			break;
// 	}
// 	return useQuery(key, fetchFn, {
// 		refetchOnWindowFocus: false,
// 		enabled: false,
// 		staleTime: Infinity,
// 	});
// };

export { useInjectionReportQuery };
