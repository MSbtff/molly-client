'use client';

import {ChevronRight, type LucideIcon} from 'lucide-react';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '../ui/sidebar';
import {Popover, PopoverTrigger, PopoverContent} from '../components/popover';

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>상품관리</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      {subItem.title === '상품 등록' ? (
                        <Popover>
                          <PopoverTrigger asChild>
                            <SidebarMenuSubButton>
                              <span>{subItem.title}</span>
                            </SidebarMenuSubButton>
                          </PopoverTrigger>
                          <PopoverContent className="w-80">
                            <div className="grid gap-4">
                              <h4 className="font-medium leading-none">
                                상품 추가
                              </h4>
                              <form className="grid gap-2">
                                <input
                                  type="text"
                                  placeholder="상품명"
                                  className="w-full px-3 py-2 border rounded"
                                />
                                <input
                                  type="number"
                                  placeholder="가격"
                                  className="w-full px-3 py-2 border rounded"
                                />
                                <button
                                  type="submit"
                                  className="w-full px-4 py-2 text-white bg-black rounded"
                                >
                                  등록
                                </button>
                              </form>
                            </div>
                          </PopoverContent>
                        </Popover>
                      ) : (
                        <SidebarMenuSubButton asChild>
                          <a href={subItem.url}>
                            <span>{subItem.title}</span>
                          </a>
                        </SidebarMenuSubButton>
                      )}
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
