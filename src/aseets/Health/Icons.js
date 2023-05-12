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

/* MyHealthMemo(내 건강기록 조회 Icon) Icon */
class MyHealthMemo extends Component {
  render() {
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={30}
        height={30}
        style={{
          fillRule: 'evenodd',
          clipRule: 'evenodd',
          strokeLinejoin: 'round',
          strokeMiterlimit: 2,
        }}
        viewBox="0 0 32 32">
        <Path d="M25.994 9.026V4.988a3 3 0 0 0-3-3h-14a3.001 3.001 0 0 0-3 3V27a2.998 2.998 0 0 0 3 3h14a1 1 0 0 0 0-2h-14a1 1 0 0 1-1-1V4.988a1 1 0 0 1 1-1h14a.997.997 0 0 1 1 1v4.038a1 1 0 0 0 2 0Z" />
        <Path d="M14.996 8.026h-.989a1 1 0 0 0 0 2h.986l-.002.985a1 1 0 1 0 2 .003l.002-.988h.989a1 1 0 0 0 0-2h-.986l.002-.986a1 1 0 0 0-2-.003l-.002.989ZM28.003 22.013v-7.018a3 3 0 0 0-3-3h-4.001a3 3 0 0 0-3 3v7.018a1 1 0 0 0 .402.802l4.024 3a1 1 0 0 0 1.2-.003l3.978-3c.25-.189.397-.485.397-.799Zm-2-7.018v6.52l-2.981 2.248-3.02-2.252v-6.516a1 1 0 0 1 1-1h4.001a1 1 0 0 1 1 1ZM10.993 16.988l4.004.003a1 1 0 0 0 .002-2l-4.004-.003a1 1 0 0 0-.002 2ZM11.002 20.988l4.004.003a1 1 0 1 0 .001-2l-4.003-.003a1 1 0 1 0-.002 2ZM10.993 24.988l4.004.003a1 1 0 0 0 .002-2l-4.004-.003a1 1 0 0 0-.002 2Z" />
      </Svg>
    );
  }
}

/* MyReview(내 리뷰 조회 Icon) Icon */
class MyReview extends Component {
  render() {
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={30}
        height={30}
        viewBox="0 0 64 64">
        <Path d="M42.83 3.5H21.17a6 6 0 0 0-6 6v19.16a6 6 0 0 0 6 6h2.23l7.84 9.23a1 1 0 0 0 1.1.29.992.992 0 0 0 .66-.94v-8.58h9.83a6 6 0 0 0 6-6V9.5a6 6 0 0 0-6-6Zm4 25.16a4 4 0 0 1-4 4H32a1 1 0 0 0-1 1v6.86l-6.38-7.51a1.011 1.011 0 0 0-.76-.35h-2.69a4 4 0 0 1-4-4V9.5a4 4 0 0 1 4-4h21.66a4 4 0 0 1 4 4Z" />
        <Path d="M44.66 10.75a1 1 0 0 1-1 1H20.34a1 1 0 0 1 0-2h23.32a1 1 0 0 1 1 1ZM44.66 14.92a1 1 0 0 1-1 1H20.34a1 1 0 0 1 0-2h23.32a.99.99 0 0 1 1 1ZM44.66 19.08a1 1 0 0 1-1 1H20.34a1 1 0 0 1 0-2h23.32a1 1 0 0 1 1 1ZM44.66 23.25a1 1 0 0 1-1 1H28.67a1 1 0 0 1 0-2h14.99a.99.99 0 0 1 1 1ZM44.66 27.41a1 1 0 0 1-1 1H28.67a1 1 0 0 1 0-2h14.99a1 1 0 0 1 1 1ZM18.65 46.55a1.009 1.009 0 0 0-.95-.69h-4.13l-1.28-3.93a1 1 0 0 0-1.9 0l-1.28 3.93H4.98a1 1 0 0 0-.59 1.81l3.34 2.43-1.27 3.92a1 1 0 0 0 .95 1.31 1.01 1.01 0 0 0 .59-.19l3.34-2.43 3.34 2.43a1 1 0 0 0 1.54-1.11l-1.28-3.93 3.35-2.43a1.012 1.012 0 0 0 .36-1.12Zm-5.83 3.47.55 1.7-1.44-1.05a.99.99 0 0 0-1.18 0l-1.44 1.05.55-1.7a.992.992 0 0 0-.36-1.11l-1.44-1.05h1.78a1.009 1.009 0 0 0 .95-.69l.55-1.7.55 1.7a1 1 0 0 0 .95.69h1.78l-1.44 1.05a.977.977 0 0 0-.36 1.11ZM39.31 51.71a1 1 0 0 0-.95-.69h-4.13l-1.28-3.93a1 1 0 0 0-1.9 0l-1.28 3.93h-4.13a1 1 0 0 0-.59 1.81l3.35 2.43-1.28 3.93a1.012 1.012 0 0 0 .36 1.12 1.022 1.022 0 0 0 1.18 0L32 57.88l3.34 2.43a1.011 1.011 0 0 0 1.18 0 1.012 1.012 0 0 0 .36-1.12l-1.28-3.93 3.35-2.43a1 1 0 0 0 .36-1.12Zm-5.83 3.48.55 1.69-1.44-1.05a1.011 1.011 0 0 0-1.18 0l-1.44 1.05.55-1.69a.992.992 0 0 0-.36-1.12l-1.44-1.05h1.78a1 1 0 0 0 .95-.69l.55-1.69.55 1.69a1 1 0 0 0 .95.69h1.78l-1.44 1.05a.992.992 0 0 0-.36 1.12ZM59.97 46.55a.991.991 0 0 0-.95-.69h-4.13l-1.28-3.93a1 1 0 0 0-1.9 0l-1.28 3.93H46.3a1 1 0 0 0-.59 1.81l3.35 2.43-1.28 3.93a1 1 0 0 0 1.54 1.11l3.34-2.43L56 55.14a1.01 1.01 0 0 0 .59.19.967.967 0 0 0 .59-.19.987.987 0 0 0 .36-1.12l-1.27-3.92 3.34-2.43a1 1 0 0 0 .36-1.12Zm-5.83 3.47.55 1.7-1.44-1.05a.988.988 0 0 0-.59-.19 1.01 1.01 0 0 0-.59.19l-1.44 1.05.55-1.7a.977.977 0 0 0-.36-1.11l-1.44-1.05h1.78a1 1 0 0 0 .95-.69l.55-1.7.55 1.7a1.009 1.009 0 0 0 .95.69h1.78l-1.44 1.05a.992.992 0 0 0-.36 1.11Z" />
      </Svg>
    );
  }
}

export default Icons = {
  memo: Memo,
  medicine: Medicine,
  myReview: MyReview,
  myHealthMemo: MyHealthMemo,
};
