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
    icon: 'billing',
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
      },
      {
        title: 'Relatorio Financeiro',
        url: '/cashier/financial-report'
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
        url: '/manager/register-product',
        icon: 'product',
        shortcut: ['p', 'p'],
        isActive: false
      },
      {
        title: 'Cadastrar Clientes',
        url: '/manager/register-client',
        icon: 'product',
        shortcut: ['p', 'p'],
        isActive: false
      },
      {
        title: 'Cadastro de vendas',
        url: '/manager/register-sale',
        icon: 'product',
        shortcut: ['p', 'p'],
        isActive: false
      },
      {
        title: 'Relatorio de Produtos',
        url: '/manager/product-report',
        icon: 'product',
        shortcut: ['p', 'p'],
        isActive: false
      }
    ]
  },
  {
    title: 'Configuração',
    url: '',
    icon: 'billing',
    isActive: false,
    items: [
      {
        title: 'Cadastrar Produtos',
        url: '/manager/register-product',
        icon: 'product',
        shortcut: ['p', 'p'],
        isActive: false
      },
      {
        title: 'Cadastrar Clientes',
        url: '/manager/register-client',
        icon: 'product',
        shortcut: ['p', 'p'],
        isActive: false
      },
      {
        title: 'Cadastro de vendas',
        url: '/manager/register-sale',
        icon: 'product',
        shortcut: ['p', 'p'],
        isActive: false
      },
      {
        title: 'Relatorio de Produtos',
        url: '/manager/product-report',
        icon: 'product',
        shortcut: ['p', 'p'],
        isActive: false
      }
    ]
  },
  {
    title: 'Suporte',
    url: '',
    icon: 'billing',
    isActive: false,
    items: [
      {
        title: 'Cadastrar Produtos',
        url: '/manager/register-product',
        icon: 'product',
        shortcut: ['p', 'p'],
        isActive: false
      },
      {
        title: 'Cadastrar Clientes',
        url: '/manager/register-client',
        icon: 'product',
        shortcut: ['p', 'p'],
        isActive: false
      },
      {
        title: 'Cadastro de vendas',
        url: '/manager/register-sale',
        icon: 'product',
        shortcut: ['p', 'p'],
        isActive: false
      },
      {
        title: 'Relatorio de Produtos',
        url: '/manager/product-report',
        icon: 'product',
        shortcut: ['p', 'p'],
        isActive: false
      }
    ]
  },
  {
    title: 'Relatórios',
    url: '',
    icon: 'billing',
    isActive: false,
    items: [
      {
        title: 'Cadastrar Produtos',
        url: '/manager/register-product',
        icon: 'product',
        shortcut: ['p', 'p'],
        isActive: false
      },
      {
        title: 'Cadastrar Clientes',
        url: '/manager/register-client',
        icon: 'product',
        shortcut: ['p', 'p'],
        isActive: false
      },
      {
        title: 'Cadastro de vendas',
        url: '/manager/register-sale',
        icon: 'product',
        shortcut: ['p', 'p'],
        isActive: false
      },
      {
        title: 'Relatorio de Produtos',
        url: '/manager/product-report',
        icon: 'product',
        shortcut: ['p', 'p'],
        isActive: false
      }
    ]
  }
  
];
