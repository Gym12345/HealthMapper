import React from 'react';

import styled from 'styled-components';
import Icons from '../../../aseets/Health/Icons';

const MemoIconWrapper = props => {
  return (
    <IconContainer>
      <IconWrapper onPress={props.onHomeIconClick}>
        <Icons.myHome active={props.homeIconActive} />
      </IconWrapper>
      <IconWrapper onPress={props.onMemoIconClick}>
        <Icons.memo active={props.memoIconActive} />
      </IconWrapper>
    </IconContainer>
  );
};

const IconContainer = styled.View`
  padding: 10px;
  flex-direction: row;
  justify-content: space-around;
`;
const IconWrapper = styled.TouchableOpacity``;

export default MemoIconWrapper;
