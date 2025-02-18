import { NavItem } from '@/_Types/nav-item';

export const navItems: NavItem[] = [
  {
    title: 'Dashboards',
    url: '',
    icon: 'dashboard',
    isActive: false,
    shortcut: ['d', 'd'],
    items: [
      {
        title: 'Dashboard Finanças',
        url: '/dashboards/finance-dashboard',
      },
      {
        title: 'Dashboard Clientes',
        url: '/dashboards/customer-dashboard',
      },
    ],
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
        isActive: false,
      },
      {
        title: 'Cadastrar Clientes',
        url: '/manager/register-client',
        shortcut: ['p', 'p'],
        isActive: false,
      },
      {
        title: 'Cadastro de vendas',
        url: '/manager/register-sale',
        shortcut: ['p', 'p'],
        isActive: false,
      },
    ],
  },
  {
    title: 'Relatórios',
    url: '',
    icon: 'clipboardList',
    isActive: false,
    items: [
      {
        title: 'Relatorio de Produtos',
        url: '/report/product-report',
        shortcut: ['p', 'p'],
        isActive: false,
      },
      {
        title: 'Relatorio Financeiro',
        url: '/report/financial-report',
        shortcut: ['p', 'p'],
        isActive: false,
      },
    ],
  },
];
