import { NavItem } from '@/_Types/nav-item';

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    url: '',
    icon: 'dashboard',
    isActive: true,
    shortcut: ['d', 'd'],
    items: [
      {
        title: 'Insights',
        url: '/painel/insights',
      },
    ],
  },
  {
    title: 'Gerenciar',
    url: '',
    icon: 'folderCog',
    isActive: true,
    items: [
      {
        title: 'Produtos',
        url: '/gerenciar/produtos',
        shortcut: ['p', 'p'],
        isActive: true,
      },
      {
        title: 'Clientes',
        url: '/gerenciar/clientes',
        shortcut: ['p', 'p'],
        isActive: true,
      },
      {
        title: 'vendas',
        url: '/gerenciar/vendas',
        shortcut: ['p', 'p'],
        isActive: true,
      },
    ],
  },
  {
    title: 'Relatório',
    url: '',
    icon: 'clipboardList',
    isActive: true,
    items: [
      {
        title: 'Produto',
        url: '/relatorio/produto',
        shortcut: ['p', 'p'],
        isActive: true,
      },
      {
        title: 'Financeiro',
        url: '/relatorio/financeiro',
        shortcut: ['p', 'p'],
        isActive: true,
      },
    ],
  },
];
