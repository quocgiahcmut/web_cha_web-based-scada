import React from 'react';
import NotFound from '../components/notfound/NotFound';
// import NotFoundImage from '../assets/images/notFound.svg';
function Error({ component }) {
	return (
		<div>
			{/* <NotFoundImage width="100%" /> */}
			<NotFound component={component} />
		</div>
	);
}

export default Error;
