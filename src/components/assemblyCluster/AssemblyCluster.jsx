import React from 'react';
import './assemblyCluster.css';
const mock = {
	name: 'Cụm máy 1',
	value: 69,
};
const order = [1, 8, 15, 22, 2, 9, 16, 23, 3, 10, 17, 24, 4, 11, 18, 25, 5, 12, 19, 26, 6, 13, 20, 27, 7, 14, 21, 28];
function AssemblyCluster({ index }) {
	return (
		<>
			<div className="col-3">
				<div className="card">
					<div className="assemblyCluster__container mb-20">
						<div className="card__body">{<span>{`Cụm máy ${order[index]}: ${mock.value}`}</span>}</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default AssemblyCluster;
