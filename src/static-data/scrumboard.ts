import { ScrumboardUser } from '../app/pages/apps/scrumboard/interfaces/scrumboard-user.interface';
import { ScrumboardLabel } from '../app/pages/apps/scrumboard/interfaces/scrumboard-label.interface';
import { Scrumboard } from '../app/pages/apps/scrumboard/interfaces/scrumboard.interface';
import { DateTime } from 'luxon';
import { ScrumboardAttachment } from '../app/pages/apps/scrumboard/interfaces/scrumboard-attachment.interface';
import { ScrumboardComment } from '../app/pages/apps/scrumboard/interfaces/scrumboard-comment.interface';

export const scrumboardAttachments: ScrumboardAttachment[] = [
  {
    id: 1,
    name: 'business-case.jpg',
    extension: 'jpg',
    path: 'assets/img/demo/1.jpg',
    size: '55 KB'
  },
  {
    id: 2,
    name: 'laptop.jpg',
    extension: 'jpg',
    path: 'assets/img/demo/2.jpg',
    size: '62 KB'
  },
  {
    id: 3,
    name: 'how-to.jpg',
    extension: 'jpg',
    path: 'assets/img/demo/3.jpg',
    size: '35 KB'
  },
  {
    id: 4,
    name: 'workplace.jpg',
    extension: 'jpg',
    path: 'assets/img/demo/4.jpg',
    size: '51 KB'
  },
  {
    id: 5,
    name: 'issue-332.jpg',
    extension: 'jpg',
    path: 'assets/img/demo/5.jpg',
    size: '10 KB'
  },
  {
    id: 6,
    name: 'notebook-26.jpg',
    extension: 'jpg',
    path: 'assets/img/demo/6.jpg',
    size: '48 KB'
  },
  {
    id: 7,
    name: 'business-2.jpg',
    extension: 'jpg',
    path: 'assets/img/demo/7.jpg',
    size: '58 KB'
  },
  {
    id: 7,
    name: 'example-67.jpg',
    extension: 'jpg',
    path: 'assets/img/demo/8.jpg',
    size: '87 KB'
  }
];

export const scrumboardUsers: ScrumboardUser[] = [
];

export const scrumboardComments: ScrumboardComment[] = [
  {
    from: scrumboardUsers[0],
    date: DateTime.local().minus({ days: 2, minutes: 43 }),
    message: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.'
  },
  {
    from: scrumboardUsers[1],
    date: DateTime.local().minus({ days: 4, minutes: 43 }),
    message: 'A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.'
  },
  {
    from: scrumboardUsers[2],
    date: DateTime.local().minus({ days: 1, minutes: 43 }),
    message: 'Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.'
  },
  {
    from: scrumboardUsers[3],
    date: DateTime.local().minus({ days: 0, minutes: 27 }),
    message: 'The Big Oxmox advised her not to do so, because there were thousands of bad Commas, wild Question Marks and devious Semikoli, but the Little Blind Text didn’t listen.'
  },
  {
    from: scrumboardUsers[4],
    date: DateTime.local().minus({ hour: 2, minutes: 4 }),
    message: 'When she reached the first hills of the Italic Mountains, she had a last view back on the skyline of her hometown Bookmarksgrove, the headline of Alphabet Village and the subline of her own road, the Line Lane.'
  }
];

export const scrumboardLabels: ScrumboardLabel[] = [
  {
    label: 'High Priority',
    bgClass: 'bg-amber',
    textClass: 'text-amber-contrast',
  },
  {
    label: 'Blocked',
    bgClass: 'bg-red',
    textClass: 'text-red-contrast',
  },
  {
    label: 'Approved',
    bgClass: 'bg-green',
    textClass: 'text-green-contrast',
  },
  {
    label: 'Ready',
    bgClass: 'bg-cyan',
    textClass: 'text-cyan-contrast',
  },
  {
    label: 'Deployed',
    bgClass: 'bg-purple',
    textClass: 'text-purple-contrast',
  }
];

export const scrumboards: Scrumboard[] = [
  {
    id: 1,
    label: 'Backlog',
    children: [
      {
        id: 1,
        label: 'NEW',
        children: [
        ]
      },
      {
        id: 2,
        label: 'IN PROGRESS',
        children: [
        ]
      },
      {
        id: 3,
        label: 'TEST',
        children: [
        ]
      },
      {
        id: 4,
        label: 'DONE',
        children: [
        ]
      }
    ]
  }
];
