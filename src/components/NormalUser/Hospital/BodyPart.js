import React from 'react';

import styled from 'styled-components';
import Icons from '../../../aseets/Hospital/Icons';

const BodyPart = props => {
  return (
    <BodyPartContainer>
      {/*머리 같은 경우 BodyPartScree에서 HeadPartModal을 띄워 눈, 코, 입, 귀, 머리를 선택하게끔  */}
      <HeadWrapper>
        {/*머리 부분*/}
        <BodyPartWrapper>
          <ButtonWrapper
            value="머리관련부위"
            onPress={() => props.onBodyPartSelect('머리관련부위')}>
            <Icons.head />
          </ButtonWrapper>
        </BodyPartWrapper>
      </HeadWrapper>
      <SecondFloorWrapper>
        {/*왼쪽 어꺠 부분*/}
        <BodyPartWrapper>
          <ButtonWrapper
            value="어깨"
            onPress={() => props.onBodyPartSelect('어깨')}>
            <Icons.leftShoulder />
          </ButtonWrapper>
        </BodyPartWrapper>
        {/*가슴 부분 (체간으로 묶어서 모달 전달)*/}
        <BodyPartWrapper>
          <ButtonWrapper
            value="체간관련부위"
            onPress={() => props.onBodyPartSelect('체간관련부위')}>
            <Icons.chest />
          </ButtonWrapper>
        </BodyPartWrapper>
        {/*오른쪽 어꺠 부분*/}
        <BodyPartWrapper>
          <ButtonWrapper
            value="어깨"
            onPress={() => props.onBodyPartSelect('어깨')}>
            <Icons.rightShoulder />
          </ButtonWrapper>
        </BodyPartWrapper>
      </SecondFloorWrapper>
      <ThirdFloorWrapper>
        {/*왼쪽 팔 부분*/}
        <BodyPartWrapper style={{marginRight: 25}}>
          <ButtonWrapper
            value="팔"
            onPress={() => props.onBodyPartSelect('팔')}>
            <Icons.leftArm />
          </ButtonWrapper>
        </BodyPartWrapper>
        {/*복부 부분 (체간으로 묶어서 모달 전달)*/}
        <BodyPartWrapper>
          <ButtonWrapper
            value="체간관련부위"
            onPress={() => props.onBodyPartSelect('체간관련부위')}>
            <Icons.stomach />
          </ButtonWrapper>
        </BodyPartWrapper>
        {/*오른쪽 팔 부분*/}
        <BodyPartWrapper style={{marginLeft: 25}}>
          <ButtonWrapper
            value="팔"
            onPress={() => props.onBodyPartSelect('팔')}>
            <Icons.rightArm />
          </ButtonWrapper>
        </BodyPartWrapper>
      </ThirdFloorWrapper>
      <FourthFloorWrapper>
        {/*왼쪽 손 부분*/}
        <BodyPartWrapper style={{marginRight: 5}}>
          <ButtonWrapper
            value="손"
            onPress={() => props.onBodyPartSelect('손')}>
            <Icons.leftHand />
          </ButtonWrapper>
        </BodyPartWrapper>
        {/*왼쪽 다리 부분*/}
        <BodyPartWrapper>
          <ButtonWrapper
            value="다리"
            onPress={() => props.onBodyPartSelect('다리')}>
            <Icons.leftLeg />
          </ButtonWrapper>
        </BodyPartWrapper>
        {/*오른쪽 다리 부분*/}
        <BodyPartWrapper>
          <ButtonWrapper
            value="다리"
            onPress={() => props.onBodyPartSelect('다리')}>
            <Icons.rightLeg />
          </ButtonWrapper>
        </BodyPartWrapper>
        {/*오른쪽 손 부분*/}
        <BodyPartWrapper style={{marginLeft: 5}}>
          <ButtonWrapper
            value="손"
            onPress={() => props.onBodyPartSelect('손')}>
            <Icons.rightHand />
          </ButtonWrapper>
        </BodyPartWrapper>
      </FourthFloorWrapper>
      <BottomFloorWrapper>
        {/*왼쪽 발 부분*/}
        <BodyPartWrapper>
          <ButtonWrapper
            value="발"
            onPress={() => props.onBodyPartSelect('발')}>
            <Icons.leftFoot />
          </ButtonWrapper>
        </BodyPartWrapper>
        {/*오른쪽 발 부분*/}
        <BodyPartWrapper>
          <ButtonWrapper
            value="발"
            onPress={() => props.onBodyPartSelect('발')}>
            <Icons.rightFoot />
          </ButtonWrapper>
        </BodyPartWrapper>
      </BottomFloorWrapper>
    </BodyPartContainer>
  );
};

const BodyPartContainer = styled.View`
  margin-left: 30px;
  margin-top: 10px;
  margin-right: 20px;
`;
const BodyPartWrapper = styled.View``;
const ButtonWrapper = styled.TouchableOpacity``;
const HeadWrapper = styled.View`
  align-items: center;
`;
const SecondFloorWrapper = styled.View`
  flex-direction: row;
  justify-content: center;
`;
const ThirdFloorWrapper = styled.View`
  flex-direction: row;
  justify-content: center;
`;
const FourthFloorWrapper = styled.View`
  flex-direction: row;
  justify-content: center;
`;
const BottomFloorWrapper = styled.View`
  flex-direction: row;
  justify-content: center;
`;

export default BodyPart;
