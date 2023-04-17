import React, {Component} from 'react';
import {Platform, StatusBar} from 'react-native';

import {RFValue} from 'react-native-responsive-fontsize';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import styled from 'styled-components';

const StatusBarHeight =
  Platform.OS === 'ios' ? getStatusBarHeight(true) : StatusBar.currentHeight;

class LeftRightCenter extends Component {
  render() {
    return (
      <HeaderContainer isPatient={this.props.isPatient}>
        <LeadingIcon onPress={this.props.leadingLeftAction}>
          {this.props.leadingLeftIcon}
        </LeadingIcon>

        <CenterTitle>{this.props.centerTitle}</CenterTitle>
        <LeadingIcon onPress={this.props.leadingRightAction}>
          {this.props.leadingRightIcon}
        </LeadingIcon>
      </HeaderContainer>
    );
  }
}

class centerRight extends Component {
  render() {
    return (
      <HeaderContainer isPatient={this.props.isPatient}>
        <EmptySizedBox />
        <CenterTitle>{this.props.centerTitle}</CenterTitle>
        <ActionIcon onPress={this.props.leadingAction}>
          {this.props.leadingIcon}
        </ActionIcon>
      </HeaderContainer>
    );
  }
}

class centerOnly extends Component {
  render() {
    return (
      <HeaderContainer isPatient={this.props.isPatient}>
        <EmptySizedBox />
        <CenterTitle>{this.props.centerTitle}</CenterTitle>
        <EmptySizedBox />
      </HeaderContainer>
    );
  }
}

/* Empty -- Empty -- ActionIcon(rightIcon) */
class ActionOnly extends Component {
  render() {
    return (
      <HeaderContainer isPatient={this.props.isPatient}>
        <EmptySizedBox />
        <EmptySizedBox />
        <LeadingIcon>{this.props.leadingIcon}</LeadingIcon>
      </HeaderContainer>
    );
  }
}

/* LeadingIcon -- Empty -- ActionIcon(rightIcon) */
class LeftRight extends Component {
  render() {
    return (
      <HeaderContainer isPatient={this.props.isPatient}>
        <LeadingIcon>{this.props.leadingIcon}</LeadingIcon>
        <CenterTitle>{this.props.centerTitle}</CenterTitle>
        <LeadingIcon onPress={this.props.leadingAction}>
          {this.props.leadingIcon}
        </LeadingIcon>
      </HeaderContainer>
    );
  }
}

/* LeadingIcon -- CenterTitle -- Empty */
class LeftCenter extends Component {
  render() {
    return (
      <HeaderContainer isPatient={this.props.isPatient}>
        <LeadingIcon onPress={this.props.leadingAction}>
          {this.props.leadingIcon}
        </LeadingIcon>
        <CenterTitle>{this.props.centerTitle}</CenterTitle>
        <EmptySizedBox />
      </HeaderContainer>
    );
  }
}

/* LeadingIcon -- Empty -- Empty */
class LeadingOnly extends Component {
  render() {
    return (
      <HeaderContainer isPatient={this.props.isPatient}>
        <LeadingIcon onPress={this.props.leadingAction}>
          {this.props.leadingIcon}
        </LeadingIcon>
        <EmptySizedBox />
        <EmptySizedBox />
      </HeaderContainer>
    );
  }
}

export default HeaderBar = {
  leftRightCenter: LeftRightCenter,
  leftRight: LeftRight,
  actionOnly: ActionOnly,
  leadingOnly: LeadingOnly,
  leftCenter: LeftCenter,
  centerRight: centerRight,
  centerOnly: centerOnly,
};

const HeaderContainer = styled.View`
  background-color: ${props => props.theme.colors.gray8};
  flex-direction: row;
  align-items: center;
  height: ${StatusBarHeight + 20}px;
  justify-content: space-between;
  padding-horizontal: 16px;
  elevation: 3;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 3px;
`;
const LeadingIcon = styled.TouchableOpacity`
  height: 24px;
  width: 24px;
`;

const EmptySizedBox = styled.View`
  height: 24px;
  width: 24px;
`;

const CenterTitle = styled.Text`
  font-size: ${RFValue(17)}px;
  color: ${props => props.theme.colors.gray1};
`;
const ActionIcon = styled.TouchableOpacity`
  height: 24px;
  width: 24px;
`;
