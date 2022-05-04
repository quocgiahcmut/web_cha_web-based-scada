import React from 'react';
import { PropagateLoader } from 'react-spinners';
import { css } from '@emotion/react';

function LoadingComponent({ className }) {
	return (
		<>
			<div className={`row full-width flex-center ${className}`}>
				<div className="col-3">
					<div
						style={{
							width: '250px',
							height: '80px',
						}}
						className="card"
					>
						<div className="card__body">
							<PropagateLoader
								css={css`
									display: block;
									margin-left: 45%;
								`}
								color="var(--main-color)"
								size={20}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default LoadingComponent;
