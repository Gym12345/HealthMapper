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

export default Icons = {
  arrowBack: ArrowBack,
};
