import React from 'react';
import AssemblyCluster from '../../components/assemblyCluster/AssemblyCluster';

function AssemblyMachinePage() {
	return (
		<>
			<div className="row">
				{Array.from({ length: 5 }, (item, index) => (
					<AssemblyCluster isRunning={false} key={index} index={index} />
				))}
			</div>
		</>
	);
}

export default AssemblyMachinePage;
