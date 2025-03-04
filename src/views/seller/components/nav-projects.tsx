'use client';

import {type LucideIcon} from 'lucide-react';
import {useRouter} from 'next/navigation';

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '../ui/sidebar';

export function NavProjects({
  projects,
}: {
  projects: {
    name: string;
    url: string;
    icon: LucideIcon;
  }[];
}) {
  const router = useRouter();

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>판매 관리</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((item) => (
          <SidebarMenuItem key={item.name}>
            <div
              onClick={() =>
                item.url && item.url !== '#' && router.push(item.url)
              }
              className="w-full cursor-pointer"
            >
              <SidebarMenuButton>
                <item.icon />
                <span>{item.name}</span>
              </SidebarMenuButton>
            </div>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
