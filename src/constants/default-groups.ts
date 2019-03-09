import { GroupType } from '../enums/group-type.enum';

// Consider: Better save it database
export const defaultGroups = [
  {
    type: GroupType.Mind,
    goals: [
      {
        title: 'Reading',
      },
      {
        title: 'Learning a foreign language',
      },
    ],
  },
  {
    type: GroupType.Body,
    goals: [
      {
        title: 'A balanced diet',
      },
      {
        title: 'Exercise',
      },
    ],
  },
  {
    type: GroupType.Soul,
    goals: [
      {
        title: 'Training willpower',
      },
      {
        title: 'Training concentration',
      },
    ],
  },
];
