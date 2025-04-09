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
      {
        title: 'Resumo Financeiro',
        url: '/painel/resumo-financeiro',
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
        shortcut: ['f', 'f'],
        isActive: true,
      },
      {
        title: 'Funcionarios',
        url: '/gerenciar/funcionarios',
        shortcut: ['u', 'u'],
        isActive: true,
      },
      {
        title: 'Categorias',
        url: '/gerenciar/categorias',
        shortcut: ['g', 'c'],
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
        shortcut: ['r', 'p'],
        isActive: true,
      },
      {
        title: 'Financeiro',
        url: '/relatorio/financeiro',
        shortcut: ['r', 'f'],
        isActive: true,
      },
      {
        title: 'Vendas por Cliente',
        url: '/relatorio/vendas-cliente',
        shortcut: ['r', 'v'],
        isActive: true,
      },
      {
        title: 'Estoque Atual',
        url: '/relatorio/estoque',
        shortcut: ['r', 'e'],
        isActive: true,
      },
    ],
  },
  {
    title: 'Financeiro',
    url: '',
    icon: 'dollarSign',
    isActive: true,
    items: [
      {
        title: 'Contas a Pagar',
        url: '/financeiro/pagar',
        shortcut: ['f', 'p'],
        isActive: true,
      },
      {
        title: 'Contas a Receber',
        url: '/financeiro/receber',
        shortcut: ['f', 'r'],
        isActive: true,
      },
      {
        title: 'Lançamentos',
        url: '/financeiro/lancamentos',
        shortcut: ['f', 'l'],
        isActive: true,
      },
    ],
  },
];
