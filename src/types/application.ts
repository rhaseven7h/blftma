const NavbarMenuItems = {
  HOME: 'home',
  ACCOUNTS: 'accounts',
  PROJECTS: 'projects'
} as const;

export type NavbarMenuItem = (typeof NavbarMenuItems)[keyof typeof NavbarMenuItems];

export default NavbarMenuItems;

export type ApiError = {
  code: string;
  name: string;
  message: string;
};
