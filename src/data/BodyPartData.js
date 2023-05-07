import Icons from '../aseets/Hospital/Icons';

//머리관련부위 (눈, 코, 입, 귀, 머리, 목)
const Head_NeckPartData = [
  {
    id: 1,
    data: '눈',
    icon: <Icons.eye />,
  },
  {
    id: 2,
    data: '코',
    icon: <Icons.nose />,
  },
  {
    id: 3,
    data: '입',
    icon: <Icons.mouth />,
  },
  {
    id: 4,
    data: '귀',
    icon: <Icons.ear />,
  },

  {
    id: 5,
    data: '목',
    icon: <Icons.neck />,
  },
  {
    id: 6,
    data: '머리',
    icon: <Icons.head_modal />,
  },
];

//체간관련부위 (가슴, 등, 배)
const TrunkPartData = [
  {
    id: 1,
    data: '가슴',
    icon: <Icons.chest_modal />,
  },
  {
    id: 2,
    data: '배',
    icon: <Icons.stomach_modal />,
  },
  {
    id: 3,
    data: '등',
    icon: <Icons.humanBack />,
  },
];

//전체 신체부위 (병원등록할때 쓰이는 data)
const TotalBodyPartData = [
  {
    id: 1,
    data: '눈',
    icon: <Icons.eye />,
    totalValue: '신체부위',
  },
  {
    id: 2,
    data: '코',
    icon: <Icons.nose />,
    totalValue: '신체부위',
  },
  {
    id: 3,
    data: '입',
    icon: <Icons.mouth />,
    totalValue: '신체부위',
  },
  {
    id: 4,
    data: '귀',
    icon: <Icons.ear />,
    totalValue: '신체부위',
  },

  {
    id: 5,
    data: '목',
    icon: <Icons.neck />,
    totalValue: '신체부위',
  },
  {
    id: 6,
    data: '머리',
    icon: <Icons.head_modal />,
    totalValue: '신체부위',
  },
  {
    id: 7,
    data: '가슴',
    icon: <Icons.chest_modal />,
    totalValue: '신체부위',
  },
  {
    id: 8,
    data: '배',
    icon: <Icons.stomach_modal />,
    totalValue: '신체부위',
  },
  {
    id: 9,
    data: '등',
    icon: <Icons.humanBack />,
    totalValue: '신체부위',
  },
  {
    id: 10,
    data: '어깨',
    icon: <Icons.humanBack />,
    totalValue: '신체부위',
  },
  {
    id: 11,
    data: '팔',
    icon: <Icons.humanBack />,
    totalValue: '신체부위',
  },
  {
    id: 12,
    data: '손',
    icon: <Icons.humanBack />,
    totalValue: '신체부위',
  },

  {
    id: 13,
    data: '다리',
    icon: <Icons.humanBack />,
    totalValue: '신체부위',
  },

  {
    id: 14,
    data: '발',
    icon: <Icons.humanBack />,
    totalValue: '신체부위',
  },
];

const BodyPartData = {
  trunkPartData: TrunkPartData,
  head_neckPartData: Head_NeckPartData,
  totalBodyPartData: TotalBodyPartData,
};

export default BodyPartData;
