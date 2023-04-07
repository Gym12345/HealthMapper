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
        width={24}
        height={24}
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
        width={24}
        height={24}
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

/* Showeye(비밀번호 암호화 활성) Icon */
class Showeye extends Component {
  render() {
    return (
      <Svg
        fill="#000000"
        width={24}
        height={24}
        viewBox="0 0 1920 1920"
        xmlns="http://www.w3.org/2000/svg">
        <Path
          d="M960 1489.82c-348.474 0-668.545-202.323-841.298-529.918C291.455 632.306 611.526 429.984 960 429.984s668.545 202.322 841.298 529.918C1628.545 1287.497 1308.474 1489.82 960 1489.82Zm948.342-553.552C1720.645 558.648 1357.332 324 960 324c-397.333 0-760.645 234.648-948.342 612.268L0 959.902l11.658 23.634c187.697 377.62 551.01 612.268 948.342 612.268 397.333 0 760.645-234.648 948.342-612.268L1920 959.902l-11.658-23.634ZM960 1171.869c-116.9 0-211.967-95.067-211.967-211.967 0-116.9 95.067-211.967 211.967-211.967 116.9 0 211.967 95.067 211.967 211.967 0 116.9-95.067 211.967-211.967 211.967m0-529.918c-175.297 0-317.951 142.654-317.951 317.951 0 175.297 142.654 317.95 317.951 317.95 175.297 0 317.951-142.653 317.951-317.95S1135.297 641.951 960 641.951"
          fill-rule="evenodd"
        />
      </Svg>
    );
  }
}

/* Hideeye(비밀번호 암호화 비활성) Icon */
class Hideeye extends Component {
  render() {
    return (
      <Svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <Path
          d="M20 14.8335C21.3082 13.3317 22 12 22 12C22 12 18.3636 5 12 5C11.6588 5 11.3254 5.02013 11 5.05822C10.6578 5.09828 10.3244 5.15822 10 5.23552M12 9C12.3506 9 12.6872 9.06015 13 9.17071C13.8524 9.47199 14.528 10.1476 14.8293 11C14.9398 11.3128 15 11.6494 15 12M3 3L21 21M12 15C11.6494 15 11.3128 14.9398 11 14.8293C10.1476 14.528 9.47198 13.8524 9.1707 13C9.11386 12.8392 9.07034 12.6721 9.04147 12.5M4.14701 9C3.83877 9.34451 3.56234 9.68241 3.31864 10C2.45286 11.1282 2 12 2 12C2 12 5.63636 19 12 19C12.3412 19 12.6746 18.9799 13 18.9418"
          stroke="#000000"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
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
        <Path
          d="M2 22H22"
          stroke={this.props.color}
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M17 2H7C4 2 3 3.79 3 6V22H21V6C21 3.79 20 2 17 2Z"
          stroke={this.props.color}
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M14.06 15H9.92998C9.41998 15 8.98999 15.42 8.98999 15.94V22H14.99V15.94C15 15.42 14.58 15 14.06 15Z"
          stroke={this.props.color}
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M12 6V11"
          stroke={this.props.color}
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M9.5 8.5H14.5"
          stroke={this.props.color}
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
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
  arrowBack: ArrowBack,
  emptyCheckbox: EmptyCheckbox,
  checkbox: Checkbox,
  showeye: Showeye,
  hideeye: Hideeye,
  hospital: Hospital,
  health: Health,
  userInfo: UserInfo,
};
