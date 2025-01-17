/* eslint-disable import/no-unresolved */
import { NavItem } from 'types';


export const navItems: NavItem[] = [
  {
    title: 'Resumo',
    url: '/dashboard/overview',
    icon: 'dashboard',
    isActive: false,
    shortcut: ['d', 'd'],
    items: [] 
  },
  {
    title: 'Caixa',
    url: '',
    icon: 'billing',
    isActive: false,
    items: [
      {
        title: 'Saldo Inicial',
        url: '/dashboard/initial-balance'
      },
      {
        title: 'Tipos Receita',
        url: '#'
      },
      {
        title: 'Tipos Despesas',
        url: '/dashboard/capture-revenues'
      },
      {
        title: 'Relatorio Financeiro',
        url: '/dashboard/reports'
      }
    ]
  },
  {
    title: 'Gerenciar',
    url: '',
    icon: 'billing',
    isActive: false,
    items: [
      {
        title: 'Cadastrar Produtos',
        url: '/dashboard/product',
        icon: 'product',
        shortcut: ['p', 'p'],
        isActive: false,
      },
      {
        title: 'Cadastrar Clientes',
        url: '/dashboard/client',
        icon: 'product',
        shortcut: ['p', 'p'],
        isActive: false,
      },
      {
        title: 'Historico de Vendas',
        url: '#',
        icon: 'product',
        shortcut: ['p', 'p'],
        isActive: false,
      },
      {
        title: 'Relatorio de Produtos',
        url: '#',
        icon: 'product',
        shortcut: ['p', 'p'],
        isActive: false,
      },
    ]
  },
];
