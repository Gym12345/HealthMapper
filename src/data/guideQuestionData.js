//머리관련부위질문 (눈, 코, 입, 귀, 머리, 목)
const Head_NeckGuideData = [
  {
    id: 1,
    data: '신경과',
    guide:
      '눈 앞이 캄캄해지거나 두통과 어지럼증이 있는 경우 \n 목이 뻐근하고 저린 경우',
  },
  {
    id: 2,
    data: '안과',
    guide:
      '눈이 건조하거나 시력이 흐려지는 경우 \n 눈이 따가워서 가렵거나 붉어진 경우',
  },
  {
    id: 3,
    data: '이비인후과',
    guide:
      '코가 자주 막히고 비염, 축농증의 증상이 있는 경우 \n 귀에 이상한 소리가 주기적으로 들리는 경우 \n목이 전체적으로 부은 것 같은 경우',
  },
  {
    id: 4,
    data: '내과',
    guide: '감기 증상 없이 열이 나는 경우',
  },
];

//체간관련부위질문 (가슴, 배, 등)
const TrunkGuideData = [
  {
    id: 1,
    data: '내과',
    guide:
      '속이 울렁거리고 구토를 하는 경우 \n 명치부근에 주기적 통증이 있는 경우 \n 소화가 잘 되지 않거나 헛배가 부른 경우 \n 변비가 심한 경우',
  },
  {
    id: 2,
    data: '신경과',
    guide: '갈비뼈 부근에 통증이 느껴지는 경우 \n 몸통의 특정 부분이 저린 경우',
  },
  {
    id: 3,
    data: '정형외과',
    guide: '척추에 전반적으로 디스크 증상이 있는 경우',
  },
  {
    id: 4,
    data: '외과',
    guide: '오른쪽 아랫배가 아픈 경우(맹장)',
  },
  {
    id: 5,
    data: '이비인후과',
    guide: '감기 증상 없이 몸살 기운이 있는 경우',
  },
];

//어꺠관련부위질문
const ShoulderGuideData = [
  {
    id: 1,
    data: '신경과',
    guide: '어깨와 목이 뻐근하고 저린 경우',
  },
  {
    id: 2,
    data: '정형외과',
    guide:
      '어깨를 결리거나 움직일 때 통증이 있는 경우 \n 팔을 움직일 때 통증이 있는 경우',
  },
];

//팔,손관련부위질문
const Arm_HandGuideData = [
  {
    id: 1,
    data: '정형외과',
    guide:
      '팔을 올리기가 힘들고 어깨 통증이 동반되는 경우 \n 손목을 움직일 때 통증이 잇는 경우 \n 팔꿈치 부위에 통증이 있는 경우 \n 손가락을 구부리거나 펴는 동작이 어려운 경우',
  },
  {
    id: 2,
    data: '외과',
    guide: '팔에 가시와 같은 날카로운 물건이 박힌 경우',
  },
  {
    id: 3,
    data: '신경과',
    guide: '팔이 이유없이 저린 경우 \n 손가락이 부어오르거나 통증이 있는 경우',
  },
];

//다리,발관련부위질문
const Leg_FootGuideData = [
  {
    id: 1,
    data: '정형외과',
    guide:
      '다리관절 부위가 붓고 찌릿한 통증이 있는 경우 \n 발꿈치 부위에 통증이 있는 경우 \n 발톱이 뒤틀리거나 감영이 생긴 경우',
  },
  {
    id: 2,
    data: '내과',
    guide: '다리가 전체적으로 자주 붓는 경우',
  },
  {
    id: 3,
    data: '신경과',
    guide: '쥐가 자주 나는 경우 \n 다리에 불쾌한 감각이 지속적으로 나는 경우',
  },
  {
    id: 4,
    data: '피부과',
    guide: '발가락에 무좀이 난 경우',
  },
];

const GuideQuestionData = {
  head_NeckGuideData: Head_NeckGuideData, //머리관련 가이드질문
  trunkGuideData: TrunkGuideData, //체간(몸통)관련 가이드질문
  shoulderGuideData: ShoulderGuideData, // 어깨관련 가이드질문
  arm_HandGuideData: Arm_HandGuideData, //팔,손관련 가이드질문
  leg_FootGuideData: Leg_FootGuideData, //다리,발관련 가이드질문
};

export default GuideQuestionData;
