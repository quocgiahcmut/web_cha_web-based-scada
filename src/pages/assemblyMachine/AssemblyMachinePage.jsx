import React from 'react';
import AssemblyCluster from '../../components/assemblyCluster/AssemblyCluster';

function AssemblyMachinePage() {
	return (
		<>
			<div className="row">
				{Array.from({ length: 24 }, (item, index) => (
					<AssemblyCluster key={index} index={index} />
				))}
			</div>
		</>
	);
}

export default AssemblyMachinePage;
