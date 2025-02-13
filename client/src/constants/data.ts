/* eslint-disable import/no-unresolved */
import { NavItem } from "@/@Types/nav-item";

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: 'dashboard',
    isActive: false,
    shortcut: ['d', 'd'],
    items: []
  },
  {
    title: 'Caixa',
    url: '',
    icon: 'dollarSign',
    isActive: false,
    items: [
      {
        title: 'Saldo Inicial',
        url: '/cashier/initial-balance'
      },
      {
        title: 'Tipos Receita',
        url: '/cashier/types-recipe'
      },
      {
        title: 'Tipos Despesas',
        url: '/cashier/types-expenses'
      }
    ]
  },
  {
    title: 'Gerenciar',
    url: '',
    icon: 'folderCog',
    isActive: false,
    items: [
      {
        title: 'Cadastrar Produtos',
        url: '/manager/register-product',
        shortcut: ['p', 'p'],
        isActive: false
      },
      {
        title: 'Cadastrar Clientes',
        url: '/manager/register-client',
        shortcut: ['p', 'p'],
        isActive: false
      },
      {
        title: 'Cadastro de vendas',
        url: '/manager/register-sale',
        shortcut: ['p', 'p'],
        isActive: false
      }
    ]
  },
  {
    title: 'Relatórios',
    url: '',
    icon: 'clipboardList',
    isActive: false,
    items: [
      {
        title: 'Relatorio de Produtos',
        url: '/manager/product-report',
        shortcut: ['p', 'p'],
        isActive: false
      },
      {
        title: 'Relatorio Financeiro',
        url: '/cashier/financial-report',
        shortcut: ['p', 'p'],
        isActive: false
      }
    ]
  }
  
];
