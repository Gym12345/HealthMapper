import React, {Component} from 'react';
import Svg, {Rect, Path, G, Circle, Use, Text, TSpan} from 'react-native-svg';

//건강기록 메모 아이콘
class Memo extends Component {
  render() {
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={40}
        height={40}
        fill={this.props.active ? '#885fff' : '#000'}
        viewBox="0 0 512 512">
        <Path
          d="m504.16 183.326-17.24-17.233c-10.453-10.461-27.415-10.452-37.868 0l-16.127 16.136 55.1 55.099 16.135-16.126c10.453-10.461 10.453-27.415 0-37.876zM18.474 178.378H64.86c10.199 0 18.474-8.274 18.474-18.49 0-10.208-8.275-18.482-18.474-18.482H18.474C8.274 141.406 0 149.68 0 159.888c0 10.216 8.274 18.49 18.474 18.49zM22.83 197.722h34.583v116.557H22.83zM83.334 352.113c0-10.208-8.275-18.491-18.474-18.491H18.474C8.274 333.622 0 341.905 0 352.113c0 10.207 8.274 18.482 18.474 18.482H64.86c10.199 0 18.474-8.275 18.474-18.482zM139.594 150.44h155.624v25.937H139.594zM139.594 245.543h155.624v25.938H139.594zM139.594 340.647h95.104v25.937h-95.104z"
          className="st0"
        />
        <Path
          d="M57.413 71.556c.008-3.977 3.242-7.211 7.215-7.219h263.645c8.82.008 16.638 3.52 22.434 9.287 5.767 5.8 9.283 13.619 9.292 22.434v132.194l34.583-34.583V96.058c-.013-36.627-29.682-66.296-66.309-66.304H64.628c-23.096.017-41.785 18.71-41.798 41.802v50.507h34.583V71.556zM359.998 415.943c-.009 8.814-3.525 16.633-9.292 22.424-5.796 5.775-13.614 9.288-22.434 9.296H64.628c-3.973-.008-7.206-3.242-7.215-7.218v-50.507H22.83v50.507c.013 23.092 18.702 41.785 41.798 41.801h263.645c36.627-.008 66.296-29.677 66.309-66.303v-58.274l-34.583 34.583v23.691z"
          className="st0"
        />
        <Path
          d="M281.81 333.344v55.099h55.101l136.086-136.086-55.1-55.1z"
          className="st0"
        />
      </Svg>
    );
  }
}

//건강기록 약 아이콘
class Medicine extends Component {
  render() {
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={40}
        height={40}
        fill={this.props.active ? '#885fff' : '#000'}
        viewBox="0 0 512 512">
        <Path
          d="m471.78 276.233.114.107-237.5-234.786.008.016C207.637 14.79 172.395 1.335 137.31 1.357c-35.088-.022-70.322 13.432-97.094 40.213C13.431 68.341-.024 103.584 0 138.673c-.024 35.081 13.431 70.323 40.216 97.095L277.655 470.5l-.065-.069c26.772 26.78 62.006 40.235 97.103 40.212 35.081.023 70.316-13.432 97.088-40.204 26.788-26.78 40.242-62.022 40.22-97.111.022-35.089-13.433-70.331-40.221-97.095zm-307.237 35.648c-.069.214-.119.413-.191.628L63.327 212.633l.008.016c-20.454-20.47-30.62-47.15-30.636-73.976.015-26.834 10.181-53.507 30.636-73.976 20.47-20.454 47.146-30.624 73.976-30.639 26.826.015 53.503 10.185 73.972 30.639l.108.108 104.753 103.55c-20.662 4.335-39.32 11.962-55.704 21.78-35.46 21.274-60.67 52.043-77.273 80.876-8.305 14.442-14.459 28.448-18.624 40.87zm284.117 135.43c-20.469 20.447-47.142 30.617-73.968 30.632-26.838-.015-53.514-10.177-73.984-30.639l-.061-.061-109.409-108.162c.326-2.105.808-4.58 1.508-7.321 2.531-10.132 7.628-23.786 15.316-38.221 11.525-21.695 28.886-45.204 51.829-63.339 22.84-18.02 50.857-30.892 85.582-32.845l103.142 101.958.045.038c20.462 20.47 30.624 47.15 30.64 73.976-.015 26.826-10.177 53.507-30.64 73.984z"
          className="st0"
        />
        <Path
          d="m81.477 170.66 35.747-85.456c-13.417 0-26.026 5.216-35.503 14.696-19.573 19.573-19.573 51.431-.244 70.76z"
          className="st0"
        />
      </Svg>
    );
  }
}

export default Icons = {
  memo: Memo,
  medicine: Medicine,
};
