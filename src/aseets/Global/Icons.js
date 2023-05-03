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

/* Cancel(스크린 취소_뒤로가기) Icon */
class Cancel extends Component {
  render() {
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        stroke="#000000"
        strokeWidth={5}
        viewBox="0 0 64 64">
        <Path d="m8.06 8.06 47.35 47.88M55.94 8.06 8.59 55.94" />
      </Svg>
    );
  }
}

/* Hospital(바텀탭바 병원추천받기Icon) Icon */
class Hospital extends Component {
  render() {
    return (
      <Svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <Path d="M2 22H22" stroke={this.props.color} stroke-width="1.5" />
        <Path
          d="M17 2H7C4 2 3 3.79 3 6V22H21V6C21 3.79 20 2 17 2Z"
          stroke={this.props.color}
          stroke-width="1.5"
        />
        <Path
          d="M14.06 15H9.92998C9.41998 15 8.98999 15.42 8.98999 15.94V22H14.99V15.94C15 15.42 14.58 15 14.06 15Z"
          stroke={this.props.color}
          stroke-width="1.5"
        />
        <Path d="M12 6V11" stroke={this.props.color} stroke-width="1.5" />
        <Path d="M9.5 8.5H14.5" stroke={this.props.color} stroke-width="1.5" />
      </Svg>
    );
  }
}

/* Health(바텀탭바 건강기록Icon) Icon */
class Health extends Component {
  render() {
    return (
      <Svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <Path
          d="M4 11.9998H8L9.5 8.99976L11.5 13.9998L13 11.9998H15M12 6.42958C12.4844 5.46436 13.4683 4.72543 14.2187 4.35927C16.1094 3.43671 17.9832 3.91202 19.5355 5.46436C21.4881 7.41698 21.4881 10.5828 19.5355 12.5354L12.7071 19.3639C12.3166 19.7544 11.6834 19.7544 11.2929 19.3639L4.46447 12.5354C2.51184 10.5828 2.51184 7.41698 4.46447 5.46436C6.0168 3.91202 7.89056 3.43671 9.78125 4.35927C10.5317 4.72543 11.5156 5.46436 12 6.42958Z"
          stroke={this.props.color}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </Svg>
    );
  }
}

/* UserInfo(바텀탭바 내정보Icon) Icon */
class UserInfo extends Component {
  render() {
    return (
      <Svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <G id="User / User_01">
          <Path
            d="M19 21C19 17.134 15.866 14 12 14C8.13401 14 5 17.134 5 21M12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7C16 9.20914 14.2091 11 12 11Z"
            stroke={this.props.color}
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
  //Icon _ Global
  arrowBack: ArrowBack,
  cancel: Cancel,
  hospital: Hospital,
  health: Health,
  userInfo: UserInfo,
};
