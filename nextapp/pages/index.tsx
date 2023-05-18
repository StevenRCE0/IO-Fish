import Head from 'next/head'
import Image from 'next/image'
import type { CSSProperties } from 'react';
import type { ParagraphLink } from '../documents';
import React, { createRef } from 'react';
import { Helmet } from 'react-helmet'
import styles from '../styles/balloon.module.css'

class SmallBalloon {
  constructor(public styles: CSSProperties, public randomBias: number) { }
}
interface BalloonProps { }
interface BalloonState {
  timer?: NodeJS.Timer;
  decay: number;
  maxBalloons: number;
  currentRotation: number;
  rotationStep: number;
  foldingNav: boolean;
  balloons: JSX.Element[];
}

const navigations: ParagraphLink[] = [
  {
    name: 'UI/UX Course',
    source: '/uix',
  },
  {
    name: 'C Course',
    source: 'https://github.com/io-club/2022-c',
    blank: true,
  },
  {
    name: 'Linux Course',
    source: 'https://github.com/io-club/2022-linux',
    blank: true,
  },
  {
    name: 'Node.js Course',
    source: 'https://github.com/io-club/2022-Node.js-ver.-Noob-',
    blank: true,
  },
  {
    name: 'GitHub',
    source: 'https://github.com/io-club',
    blank: true,
  },
];

class Balloon extends React.Component<BalloonProps, BalloonState> {
  balloonMachineRef: React.RefObject<any>;
  constructor(props: BalloonProps) {
    super(props);
    this.state = {
      decay: 1200,
      maxBalloons: 3,
      currentRotation: 0,
      rotationStep: 15,
      foldingNav: true,
      balloons: [],
    };
    this.balloonMachineRef = createRef();
  }

  componentDidMount() {
    this.balloonMachine();
  }

  componentWillUnmount(): void {
    if (this.state.timer) {
      clearInterval(this.state.timer);
    }
  }

  reversedArrayCopy<T>(array: T[]): T[] {
    const copy = [...array];
    copy.reverse();
    return copy;
  }

  balloonMachine() {
    setInterval(() => {
      let newBalloons = this.state.balloons;
      if (newBalloons.length > this.state.maxBalloons) {
        newBalloons = this.state.balloons.slice(1);
      }
      newBalloons.push(
        this.balloonSVG(
          this.state.currentRotation + 1,
          new SmallBalloon(this.balloonStyleGenerator(), 1),
        ),
      );
      this.setState({
        currentRotation: this.state.currentRotation + 1,
        balloons: newBalloons,
      });
    }, this.state.decay);
  }

  balloonStyleGenerator(): CSSProperties {
    return {
      '--hue': `${this.state.rotationStep * this.state.currentRotation}`,
      fillRule: 'evenodd',
      clipRule: 'evenodd',
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeMiterlimit: 1.5,
    } as CSSProperties;
  }

  balloonWrapperStyleGenerator(): CSSProperties {
    return {
      '--balloonDuration': `${this.state.decay * this.state.maxBalloons
        }ms`,
    } as CSSProperties;
  }

  balloonSVG(index: number, balloon: SmallBalloon): JSX.Element {
    return (
      <svg
        key={
          index + this.state.currentRotation * this.state.maxBalloons
        }
        className={styles.Balloon}
        width="100%"
        height="100%"
        viewBox="0 0 2517 2656"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        xmlSpace="preserve"
        style={balloon.styles}
      >
        <g transform="matrix(1,0,0,1,-1399,-1070)">
          <g transform="matrix(0.660946,0.00174429,-0.00174429,0.660946,1096.21,1015.85)">
            <path
              d="M3633.97,3916.4C3580.88,3954.48 3523.56,3988.15 3454.81,4014.04C2412.54,4406.38 -275.263,3294.88 658.551,1116.38C776.462,841.304 1067.86,528.523 1324.17,363.757C1595.57,189.282 1954.16,81.663 2273,77.74C2953.57,69.364 3505.57,320.97 3919.93,992.046C4538.2,1993.35 4275.83,3455.95 3633.97,3916.4Z"
              style={{
                stroke: 'rgb(60,88,150)',
                strokeWidth: '1.51px',
              }}
            />
          </g>
        </g>
      </svg>
    );
  }

  navigationStyleGenerator(): CSSProperties {
    return {
      '--lines': navigations.length,
    } as CSSProperties;
  }

  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>I/O Lab</title>
        </Helmet>
        <div
          className={styles.BalloonWrapper}
          style={this.balloonWrapperStyleGenerator()}
          ref={this.balloonMachineRef}
        >
          {this.state.balloons}
        </div>
        <div
          className={styles.Block}
          onMouseEnter={() => {
            this.setState({ foldingNav: false });
          }}
          onMouseLeave={() => {
            this.setState({ foldingNav: true });
          }}
        >
          <div
            className={ `${styles.Navigations} ${this.state.foldingNav ? styles.Fold : ''}`}
            style={this.navigationStyleGenerator()}
          >
            {navigations.map((navigation, index) => (
              <a
                key={index}
                href={navigation.source}
                target={navigation.blank ? '_blank' : '_self'}
              >
                {navigation.name}
                {
                  navigation.blank &&
                  <img className={styles.External} src='/assets/external.svg' />
                }

              </a>
            ))}
          </div>
          <div className={styles.Header}>
            I/O La
            <span style={{ marginLeft: '-.055em' }}>b</span>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default function BalloonWrapper(props: BalloonProps) {
  return (
      <>
        <Balloon {...props} />
      </>
  );
}


