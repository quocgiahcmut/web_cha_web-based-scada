import React from 'react';
import { ReactComponent as EmptyPlaceholderImg } from '../../assets/images/empty-placeholder.svg';
import { ReactComponent as ErrorPlaceHolderImage } from '../../assets/images/error-placeholder.svg';

function EmptyPlaceholder({ isError, msg }) {
	console.log('msg', msg);
	return (
		<>
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					flexDirection: 'column',
					height: '400px',
					width: '98vw',
					padding: '20px',
				}}
				className="report_placeholder"
			>
				{isError ? (
					<ErrorPlaceHolderImage width=" 100%" height="300px" />
				) : (
					<EmptyPlaceholderImg width="100%" height="300px" />
				)}
				<h4>
					{msg.includes('\n')
						? msg.split('\n').map((subTitle, index) => {
								return (
									<React.Fragment key={index}>
										{subTitle}
										{index !== msg.split('\n').length - 1 ? <br /> : null}
									</React.Fragment>
								);
						  })
						: msg}
				</h4>
			</div>
		</>
	);
}

export default React.memo(EmptyPlaceholder);
