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
        shortcut: ['c', 'c'],
        isActive: true,
      },
      {
        title: 'Vendas',
        url: '/gerenciar/vendas',
        shortcut: ['v', 'v'],
        isActive: true,
      },
      {
        title: 'Fornecedores',
        url: '/gerenciar/fornecedores',
        shortcut: ['v', 'v'],
        isActive: true,
      }
    ],
  },
  {
    title: 'Relatório',
    url: '',
    icon: 'clipboardList',
    isActive: true,
    items: [
      {
        title: 'Produtos',
        url: '/relatorio/produtos',
        shortcut: ['r', 'p'],
        isActive: true,
      },
      {
        title: 'Clientes',
        url: '/relatorio/clientes',
        shortcut: ['r', 'f'],
        isActive: true,
      },
      {
        title: 'Vendas',
        url: '/relatorio/vendas',
        shortcut: ['r', 'v'],
        isActive: true,
      }
    ]
  }
]  