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

const BodyPartData = {
  trunkPartData: TrunkPartData,
  head_neckPartData: Head_NeckPartData,
};

export default BodyPartData;
