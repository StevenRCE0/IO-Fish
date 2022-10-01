import type { CSSProperties } from 'react';

import React from 'react';

class SmallBalloon {
	constructor(public styles: CSSProperties) {}
}
interface BalloonProps {}
interface BalloonState {
	speed: number;
	decay: number;
	currentRotation: number;
	balloons: SmallBalloon[];
}

const balloonWrapperStyle: CSSProperties = {
	position: 'fixed',
	width: '100vw',
	height: '100vh',
};

class Balloon extends React.Component<BalloonProps, BalloonState> {
	constructor(props: BalloonProps) {
		super(props);
		this.state = {
			speed: 1,
			decay: 1,
			currentRotation: 0,
			balloons: [],
		};
	}

	onComponentDidMount() {
		this.balloonMachine();
	}

	balloonMachine() {
		setTimeout(() => {
			this.setState({
				currentRotation: this.state.currentRotation + 1,
				balloons: this.state.balloons.concat(
					new SmallBalloon(this.balloonStyleGenerator()),
				),
			});
		}, 1000 / this.state.speed);
		setTimeout(() => {
			this.setState({
				balloons: this.state.balloons.slice(1),
			});
		}, 1000 / this.state.speed + 1000 / this.state.decay);
	}

	balloonStyleGenerator(): React.CSSProperties {
		return {
			'--balloonDuration': `${1000 / this.state.speed}ms`,
			fill: `hsl(${255 / this.state.currentRotation}, 100%, 80%)`,
			stroke: 'rgb(60,88,150)',
			strokeWidth: '1.51px',
		} as React.CSSProperties;
	}

	render() {
		return (
			<div style={balloonWrapperStyle}>
				{this.state.balloons.map((balloon, index) => {
					return (
						<svg
							key={index}
							width="100%"
							height="100%"
							viewBox="0 0 2517 2656"
							version="1.1"
							xmlns="http://www.w3.org/2000/svg"
							xmlnsXlink="http://www.w3.org/1999/xlink"
							xmlSpace="preserve"
							style={{
								fillRule: 'evenodd',
								clipRule: 'evenodd',
								strokeLinecap: 'round',
								strokeLinejoin: 'round',
								strokeMiterlimit: 1.5,
							}}
						>
							<g transform="matrix(1,0,0,1,-1399,-1070)">
								<g transform="matrix(0.660946,0.00174429,-0.00174429,0.660946,1096.21,1015.85)">
									<path
										d="M3633.97,3916.4C3580.88,3954.48 3523.56,3988.15 3454.81,4014.04C2412.54,4406.38 -275.263,3294.88 658.551,1116.38C776.462,841.304 1067.86,528.523 1324.17,363.757C1595.57,189.282 1954.16,81.663 2273,77.74C2953.57,69.364 3505.57,320.97 3919.93,992.046C4538.2,1993.35 4275.83,3455.95 3633.97,3916.4Z"
										style={balloon.styles}
									/>
								</g>
							</g>
						</svg>
					);
				})}
			</div>
		);
	}
}

export default function BalloonWrapper(props: BalloonProps) {
	return <Balloon {...props} />;
}
