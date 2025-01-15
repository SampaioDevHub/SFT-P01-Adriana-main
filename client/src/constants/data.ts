/* eslint-disable import/no-unresolved */
import { NavItem } from 'types';

export type Product = {
  photo_url: string;
  name: string;
  description: string;
  created_at: string;
  price: number;
  id: number;
  category: string;
  updated_at: string;
};

//Info: The following data is used for the sidebar navigation and Cmd K bar.
export const navItems: NavItem[] = [
  {
    title: 'Inicio',
    url: '/dashboard/overview',
    icon: 'dashboard',
    isActive: false,
    shortcut: ['d', 'd'],
    items: [] // Empty array as there are no child items for Dashboard
  },
  {
    title: 'Financeiro',
    url: '',
    icon: 'billing',
    isActive: false,
    items: [
      {
        title: 'Tipos Despesas',
        url: '/dashboard/capture-revenues'
      },
      {
        title: 'Contas Bancarias',
        url: '/dashboard/bank-accounts'
      },
      {
        title: 'Laçar Receitas',
        url: ''
      },
      {
        title: 'Receitas',
        url: ''
      },
      {
        title: 'Relatório',
        url: ''
      },
      {
        title: 'Saldo Inicial',
        url: '/dashboard/initial-balance'
      }
    ]
  },
  {
    title: 'Caixa',
    url: '',
    icon: 'billing',
    isActive: false,
    items: [
      {
        title: 'Caixa Receitas',
        url: ''
      },
      {
        title: 'Caixa Despesas',
        url: ''
      },
      {
        title: 'Receita X Despesas',
        url: ''
      },
      {
        title: 'Receitas',
        url: ''
      },
      {
        title: 'Relatório',
        url: ''
      },
      {
        title: 'Saldo Inicial',
        url: ''
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
        title: 'Produto',
        url: '/dashboard/product',
        icon: 'product',
        shortcut: ['p', 'p'],
        isActive: false,
      },
      {
        title: 'Cliente',
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
    ]
  },
];
