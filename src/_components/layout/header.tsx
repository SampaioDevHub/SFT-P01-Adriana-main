/* eslint-disable no-console */
'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/_components/ui/dropdown-menu';
import { Bell } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/_components/ui/button';
import { Skeleton } from '@/_components/ui/skeleton';

import { SearchInput } from '../kbar/search-input';
import { Separator } from '../ui/separator';
import { SidebarTrigger } from '../ui/sidebar';
import { Breadcrumbs } from '../breadcrumbs';
import { ModeToggle } from './ModeToggle';

type Notification = {
  id: string;
  title: string;
  description: string;
  date: string;
};

export function Header() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   async function fetchNotifications() {
  //     try {
  //       const res = await fetch(
  //         'http://localhost:8080/manage_store/v1/notifications'
  //       );
  //       if (!res.ok) throw new Error('Erro ao buscar notificações');
  //       const data = await res.json();
  //       setNotifications(data);
  //     } catch (err) {
  //       console.error(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   fetchNotifications();
  // }, []);

  return (
    <header className="sticky top-0 z-50 flex h-20 md:h-24 items-center justify-between px-4 border-b border-border bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl shadow-md transition-all duration-300">
      {/* Esquerda: Navegação */}
      <div className="flex items-center gap-4">
        <SidebarTrigger className="hidden md:inline-flex" />
        <Separator
          orientation="vertical"
          className="h-6 bg-muted-foreground/30"
        />
        <Breadcrumbs />
      </div>

      {/* Direita: Ações */}
      <div className="flex items-center gap-3 md:gap-4">
        {/* Campo de Busca */}
        <div className="hidden md:block">
          <SearchInput />
        </div>

        {/* Botão de Notificações */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative transition-all hover:scale-[1.05] hover:bg-white/40 dark:hover:bg-zinc-800/40 backdrop-blur-md rounded-xl shadow-sm"
            >
              <Bell className="size-5 text-muted-foreground" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-white text-[10px] font-bold shadow ring-1 ring-white animate-pulse">
                  {notifications.length}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-80 max-h-96 overflow-y-auto rounded-2xl border bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl shadow-2xl ring-1 ring-border p-2"
          >
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="p-2">
                  <Skeleton className="h-4 w-3/4 mb-1" />
                  <Skeleton className="h-3 w-full" />
                </div>
              ))
            ) : notifications.length === 0 ? (
              <div className="px-3 py-2 text-sm text-muted-foreground">
                Sem notificações novas.
              </div>
            ) : (
              <>
                <div className="text-sm text-muted-foreground px-3 py-2">
                  Você tem{' '}
                  <strong className="text-foreground">
                    {notifications.length} novas notificações
                  </strong>
                  .
                </div>
                <div className="divide-y divide-muted-foreground/20">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className="px-3 py-2 hover:bg-muted/20 rounded-xl transition-all"
                    >
                      <div className="font-semibold text-foreground">
                        {n.title}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {n.description}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(n.date).toLocaleString('pt-BR')}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Dark Mode */}
        <ModeToggle />
      </div>
    </header>
  );
}
