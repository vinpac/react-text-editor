export const INLINE_STYLES = [
  {
    label: 'BOLD',
    icon: 'bold',
    description: 'bold',
    notOn: ['header-one', 'header-two'],
  },
  {
    label: 'ITALIC',
    icon: 'italic',
    description: 'italic',
  },
  {
    label: 'UNDERLINE',
    icon: 'underline',
    description: 'underline',
  },
  {
    label: 'STRIKETHROUGH',
    icon: 'strikethrough',
    description: 'strikethrough',
  },
];

export const BLOCKS = [
  {
    label: 'header-one',
    text: 'H1',
    description: 'Heading',
  },
  {
    label: 'header-two',
    text: 'H2',
    description: 'Heading',
  },
  {
    label: 'UL',
    text: 'UL',
    description: 'ul',
    notOn: ['header-one', 'header-two'],
  },
  {
    label: 'OL',
    text: 'OL',
    description: 'ol',
    notOn: ['header-one', 'header-two'],
  },
  {
    label: 'CODE',
    icon: 'code',
    description: 'code',
    notOn: ['header-one', 'header-two'],
  },
  {
    label: 'LINK',
    icon: 'link',
    description: 'link',
    notOn: ['header-one', 'header-two'],
  },
];
