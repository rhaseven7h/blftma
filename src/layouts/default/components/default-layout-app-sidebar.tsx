import { Sidebar } from 'flowbite-react';
import { TbAlignBoxLeftTopFilled, TbCategoryPlus, TbCube, TbListDetails } from 'react-icons/tb';

const DefaultLayoutAppSidebar = () => {
  return (
    <Sidebar
      className={'fixed left-0 w-[320px] border-r mt-[82px] pt-0'}
      aria-label='Sidebar with logo branding example'>
      <Sidebar.Logo
        href='#'
        img='/favicon.ico'
        imgAlt='Flowbite logo'>
        Flowbite
      </Sidebar.Logo>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Collapse
            open={true}
            icon={TbAlignBoxLeftTopFilled}
            label={'Accounts'}>
            <Sidebar.Item
              href={'/accounts/add'}
              icon={TbCategoryPlus}>
              Add Account
            </Sidebar.Item>
            <Sidebar.Item
              href={'/accounts/list'}
              icon={TbListDetails}>
              List Accounts
            </Sidebar.Item>
          </Sidebar.Collapse>
          <Sidebar.Item
            href={'/projects'}
            icon={TbCube}>
            Projects
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default DefaultLayoutAppSidebar;
