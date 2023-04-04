import React, {Component} from 'react';
import Svg, {Defs, Path, G, Mask, Use, Text, TSpan} from 'react-native-svg';

/* ArrowBack(뒤로가기) 실행 Icon */
class ArrowBack extends Component {
  render() {
    return (
      <Svg width={24} height={24} xmlns="http://www.w3.org/2000/svg">
        <G fill="none" fillRule="evenodd">
          <Path d="M0 24h24V0H0z" />
          <Path
            stroke="#151516"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.125 6L5 12l6.125 6m-5.25-6H19"
          />
        </G>
      </Svg>
    );
  }
}

/* Empty Checkbox(비어있는 체크 상자) Icon */
class EmptyCheckbox extends Component {
  render() {
    return (
      <Svg
        width={16}
        height={16}
        viewBox="0 0 21 21"
        xmlns="http://www.w3.org/2000/svg">
        <Path
          d="m2.5.5h10c1.1045695 0 2 .8954305 2 2v10c0 1.1045695-.8954305 2-2 2h-10c-1.1045695 0-2-.8954305-2-2v-10c0-1.1045695.8954305-2 2-2z"
          fill="none"
          stroke="#000000"
          stroke-linecap="round"
          stroke-linejoin="round"
          transform="translate(3 3)"
        />
      </Svg>
    );
  }
}

/* Checkbox(체크 상자) Icon */
class Checkbox extends Component {
  render() {
    return (
      <Svg
        width={16}
        height={16}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <G id="Interface / Checkbox_Check">
          <Path
            id="Vector"
            d="M8 12L11 15L16 9M4 16.8002V7.2002C4 6.08009 4 5.51962 4.21799 5.0918C4.40973 4.71547 4.71547 4.40973 5.0918 4.21799C5.51962 4 6.08009 4 7.2002 4H16.8002C17.9203 4 18.4796 4 18.9074 4.21799C19.2837 4.40973 19.5905 4.71547 19.7822 5.0918C20 5.5192 20 6.07899 20 7.19691V16.8036C20 17.9215 20 18.4805 19.7822 18.9079C19.5905 19.2842 19.2837 19.5905 18.9074 19.7822C18.48 20 17.921 20 16.8031 20H7.19691C6.07899 20 5.5192 20 5.0918 19.7822C4.71547 19.5905 4.40973 19.2842 4.21799 18.9079C4 18.4801 4 17.9203 4 16.8002Z"
            stroke="#885FFF"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </G>
      </Svg>
    );
  }
}

export default Icons = {
  arrowBack: ArrowBack,
  emptyCheckbox: EmptyCheckbox,
  checkbox: Checkbox,
};
