'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from '@/_components/ui/sidebar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/_components/ui/collapsible';
import { navItems } from '@/_constants/data';
import { ChevronRight, GalleryVerticalEnd } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';
import { Icons } from '../icons';
import { UserButton, useUser } from '@clerk/nextjs';

export const company = {
  name: 'Adriana ShowRoom',
  logo: GalleryVerticalEnd,
};

export default function AppSidebar() {
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <Sidebar
      collapsible="offcanvas"
      variant="sidebar"
      className="pt-2 bg-gradient-to-br from-white/80 to-zinc-100/60 dark:from-zinc-900/80 dark:to-zinc-800/60 border-r border-zinc-200 dark:border-zinc-800 backdrop-blur-2xl shadow-xl ring-1 ring-zinc-200/30 dark:ring-zinc-700/40 transition-all duration-500"
    >
      {/* Cabeçalho */}
      <SidebarHeader className="rounded-2xl bg-white/70 dark:bg-zinc-800/60 backdrop-blur-lg ring-1 ring-zinc-200/30 dark:ring-zinc-700/30 mb-4 mx-3 px-4 py-3 shadow-lg">
        <div className="flex gap-3 items-center">
          <div className="flex aspect-square size-10 items-center justify-center rounded-2xl bg-pink-500 text-white shadow-2xl border border-white/20">
            <company.logo className="size-5" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold text-zinc-900 dark:text-white">
              {company.name}
            </span>
          </div>
        </div>
      </SidebarHeader>

      {/* Conteúdo */}
      <SidebarContent className="overflow-x-hidden flex-col px-2 space-y-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-[11px] font-semibold text-zinc-400 uppercase tracking-widest px-2">
            Painel de Navegação
          </SidebarGroupLabel>
          <SidebarMenu className="rounded-2xl space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon ? Icons[item.icon] : Icons.logo;
              return item?.items && item?.items?.length > 0 ? (
                <Collapsible
                  key={item.title}
                  asChild
                  defaultOpen={item.isActive}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        tooltip={item.title}
                        isActive={pathname === item.url}
                        className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-zinc-800 dark:text-white bg-white/40 dark:bg-zinc-800/30 hover:bg-white/70 dark:hover:bg-zinc-700/60 backdrop-blur-lg transition-all duration-300 rounded-xl shadow-md hover:shadow-xl border border-white/10"
                      >
                        {item.icon && <Icon className="size-4" />}
                        <span className="flex-1">{item.title}</span>
                        <ChevronRight className="ml-auto size-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub className="ml-6 border-l border-zinc-300 dark:border-zinc-700 pl-4 space-y-1 mt-1">
                        {item.items?.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={pathname === subItem.url}
                              className="text-sm text-zinc-600 dark:text-zinc-300 hover:text-pink-800 dark:hover:text-white hover:bg-white/30 dark:hover:bg-zinc-700/30 rounded-md px-2 py-1 transition-all duration-300"
                            >
                              <Link href={subItem.url}>{subItem.title}</Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ) : (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    isActive={pathname === item.url}
                    className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-zinc-800 dark:text-white bg-white/40 dark:bg-zinc-800/30 hover:bg-white/70 dark:hover:bg-zinc-700/60 backdrop-blur-lg transition-all duration-300 rounded-xl shadow-md hover:shadow-xl border border-white/10"
                  >
                    <Link href={item.url}>
                      <Icon className="size-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="border-t border-zinc-200 dark:border-zinc-800 px-4 py-4 bg-white/40 dark:bg-zinc-900/30 backdrop-blur-md shadow-inner rounded-t-xl">
        <div className="flex items-center gap-3 text-sm">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-pink-600 text-white shadow-lg border border-white/10">
            <company.logo className="size-4" />
          </div>
          <div className="flex flex-row items-center mr-4 leading-tight">
            <UserButton />
          </div>
        </div>
      </SidebarFooter>

      {/* Rail */}
      <SidebarRail />
    </Sidebar>
  );
}
