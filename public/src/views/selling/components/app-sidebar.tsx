'use client';

import * as React from 'react';
import {
  AudioWaveform,
  Truck,
  Command,
  GalleryVerticalEnd,
  UserPen,
  Settings2,
  Store,
  CreditCard,
} from 'lucide-react';

import {NavMain} from './nav-main';
import {NavProjects} from './nav-projects';
import {NavUser} from './nav-user';
import {TeamSwitcher} from './team-switcher';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '../ui/sidebar';

// This is sample data.
const data = {
  user: {
    name: '김름',
    email: 'molly@example.com',
    avatar: '/src/assets/logo.webp',
  },
  teams: [
    {
      name: '김름 Inc.',
      logo: GalleryVerticalEnd,
      plan: '기업',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
    {
      name: 'Evil Corp.',
      logo: Command,
      plan: 'Free',
    },
  ],
  navMain: [
    {
      title: '상품 관리',
      url: '#',
      icon: Store,
      isActive: false,
      items: [
        {
          title: '상품 등록',
          url: '#',
        },
        {
          title: '상품 삭제',
          url: '#',
        },
        {
          title: '상품 조회',
          url: '#',
        },
      ],
    },

    {
      title: '설정',
      url: '#',
      icon: Settings2,
      items: [
        {
          title: 'General',
          url: '#',
        },
        {
          title: 'Team',
          url: '#',
        },
        {
          title: 'Billing',
          url: '#',
        },
        {
          title: 'Limits',
          url: '#',
        },
      ],
    },
  ],
  projects: [
    {
      name: '프로필 관리',
      url: '#',
      icon: UserPen,
    },
    {
      name: '배송지 관리',
      url: '#',
      icon: Truck,
    },
    {
      name: '결제 정보',
      url: '#',
      icon: CreditCard,
    },
  ],
};

export function AppSidebar({...props}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
