'use client';

import * as React from 'react';
import {Truck, UserPen, Store, CreditCard, Building2} from 'lucide-react';

import {NavMain} from './nav-main';
import {NavProjects} from './nav-projects';
import {NavUser} from './nav-user';

import {Sidebar, SidebarContent, SidebarFooter} from '../ui/sidebar';

// This is sample data.
const data = {
  user: {
    name: '김구름',
    email: 'molly@example.com',
    avatar: '/logo.webp',
  },
  teams: [
    {
      name: 'Molly Inc.',
      logo: Building2,
      plan: '기업',
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
          url: '',
        },
        {
          title: '상품 삭제',
          url: '#',
        },
        {
          title: '상품 조회',
          url: '#',
        },
        {
          title: '상품 수정',
          url: '#',
        },
      ],
    },
  ],
  projects: [
    {
      name: '프로필 관리',
      url: '/mypage',
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
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
