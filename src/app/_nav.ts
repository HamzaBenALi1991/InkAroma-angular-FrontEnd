interface NavAttributes {
  [propName: string]: any;
}
interface NavWrapper {
  attributes: NavAttributes;
  element: string;
}
interface NavBadge {
  text: string;
  variant: string;
}
interface NavLabel {
  class?: string;
  variant: string;
}

export interface NavData {
  name?: string;
  url?: string;
  icon?: string;
  badge?: NavBadge;
  title?: boolean;
  children?: NavData[];
  variant?: string;
  attributes?: NavAttributes;
  divider?: boolean;
  class?: string;
  label?: NavLabel;
  wrapper?: NavWrapper;
}

export const navItems: NavData[] = [
  {
    title: true,
    name: 'Account'
  },
  {
    name: 'Account',
    url: '/',
    icon: 'icon-cursor',
    children: [
      {
        name: 'Profile',
        url: '/profile',
        icon: 'icon-user'
      },
      {
        name: 'Edit-Profile',
        url: '/edit',
        icon: 'icon-puzzle'
      },
    ]
  },
  {
    name: 'Library',
    url: '/library',
    icon: 'icon-cursor',

  },
  {
    name: 'Categories',
    url: '/library',
    icon: 'fa fa-code',
    children: [
      {
        name: 'Romance',
        url: '/library/romance',
        icon: 'icon-note',
     
      },
      {
        name: 'Detective',
        url: '/library/detective',
        icon: 'fa fa-code',
     
      },
      {
        name: 'Fantasy',
        url: '/library/fantasy',
        icon: 'fa fa-code',
     
      },
      {
        name: 'Horror',
        url: '/library/Horror',
        icon: 'fa fa-code',
     
      },
      {
        name: 'Sc-Fi',
        url: '/library/sc-fi',
        icon: 'fa fa-code',
     
      },
      {
        name: 'Drama',
        url: '/library/Drama',
        icon: 'fa fa-code',
     
      },
      {
        name: 'Others',
        url: '/library/Others',
        icon: 'fa fa-code',
     
      }
    ]
  },
 
];
