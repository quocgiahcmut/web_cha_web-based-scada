import React from 'react';
import AlarmTable from '../components/alarmTable/AlarmTable';
import alarm_mocking from '../assets/JsonData/alarm-mocking.json';
import { format } from 'date-fns';
import AlarmFilter from '../components/alarmFilter/AlarmFilter';
import CsvDownloadButton from '../components/csvDownloadButton/CsvDownloadButton';
import CustomizedBreadcrumbs from '../components/breadcrumbs/Breadcrumbs';

function Alarm() {
	const headers = React.useMemo(
		() => [
			{ label: 'Thời gian', key: 'date' },
			{ label: 'Mã lỗi', key: 'error_code' },
			{ label: 'Nội dung', key: 'error_msg' },
			{ label: 'Khu vực', key: 'error_sector' },
			{ label: 'Mức độ ưu tiên', key: 'priority' },
		],
		[]
	);
	const onSubmit = (value) => {
		value.dateStart = format(new Date(value.dateStart), 'yyyy-MM-dd');
		value.dateEnd = format(new Date(value.dateEnd), 'yyyy-MM-dd');
		console.log(value);
	};
	const [dataToDownload] = React.useState(alarm_mocking);
	return (
		<>
			<CustomizedBreadcrumbs id="CẢNH BÁO" />
			<div className="row">
				<div className="col-12">
					<div className="card">
						<div className="card__body">
							<div className="row">
								<div className="col-12 mb-40">
									<AlarmFilter onSubmit={onSubmit} />
								</div>
							</div>
							<div className="row">
								<div className="col-12">
									<CsvDownloadButton headers={headers} dataToDownload={dataToDownload} />
								</div>
							</div>
							<div className="row">
								<div className="col-12">
									<AlarmTable alarmData={alarm_mocking} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Alarm;
