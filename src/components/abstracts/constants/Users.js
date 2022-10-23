import Exit from "../../../assets/img/exit.png";
import Gafpri from "../../../assets/img/logo-llama-blanca.png";
import Ventas from "../../../assets/img/icon-ventas-2.png";
import Despacho from "../../../assets/img/icon-pedido.png";
import Budget from "../../../assets/img/icon-pedido.png";
import Payment from "../../../assets/img/icon-pagos.png";
import Bank from "../../../assets/img/bank.png";
import Purchase from "../../../assets/img/purchase.png";
import CashRegister from "../../../assets/img/icon-caja-2.png";
import Expenses from "../../../assets/img/expenses.png";



const users = {
    roles:{
        administrator:{
            menu: [
                {
                  imgSrc: 'https://tiendasgafpri.com/wp-content/themes/gafpristore/assets/img/logo-llama-blanca.png', 
                  title: 'admin',
                  src: '/',
                  exit: false
                },
                {
                  imgSrc: 'https://tiendasgafpri.com/wp-content/themes/gafpristore/assets/img/icon-control.png',
                  title: 'control',
                  src: '/control',
                  exit: false
                },
                {
                  imgSrc: 'https://tiendasgafpri.com/wp-content/themes/gafpristore/assets/img/icon-ventas-2.png', 
                  title: 'ventas',
                  src: '/ventas',
                  exit: false
                },
                {
                  imgSrc: 'https://tiendasgafpri.com/wp-content/themes/gafpristore/assets/img/icon-usuario.png', 
                  title: 'pedidos',
                  src: 'pedidos',
                  exit: false
                },
                {
                  imgSrc: 'https://tiendasgafpri.com/wp-content/themes/gafpristore/assets/img/exit.png', 
                  title: 'salir',
                  src: '',
                  exit: true
                }
            ],
            home: [
              [
                {
                  imgSrc: 'https://tiendasgafpri.com/wp-content/themes/gafpristore/assets/img/icon-control.png', 
                  title: 'control',
                  src: '/control'
                },
                {
                  imgSrc: 'https://tiendasgafpri.com/wp-content/themes/gafpristore/assets/img/icon-aprobar.png', 
                  title: 'aprobar',
                  src: '/aprobar'
                },
                {
                  imgSrc: 'https://tiendasgafpri.com/wp-content/themes/gafpristore/assets/img/icon-ventas-2.png', 
                  title: 'ventas',
                  src: '/ventas'
                },
                {
                  imgSrc: 'https://tiendasgafpri.com/wp-content/themes/gafpristore/assets/img/icon-pagos.png', 
                  title: 'pagos',
                  src: '/pagos'
                },
                {
                  imgSrc: 'https://tiendasgafpri.com/wp-content/themes/gafpristore/assets/img/icon-caja-2.png', 
                  title: 'caja',
                  src: '/caja'
                },
            
              ],
              [
                {
                  imgSrc: 'https://tiendasgafpri.com/wp-content/themes/gafpristore/assets/img/icon-pedido.png', 
                  title: 'despacho',
                  src: '/despacho'
                },
                {
                  imgSrc: 'https://tiendasgafpri.com/wp-content/themes/gafpristore/assets/img/icon-aprobar.png', 
                  title: 'pedidos',
                  src: '/pedidos'
                },
                {
                  imgSrc: 'https://tiendasgafpri.com/wp-content/themes/gafpristore/assets/img/icon-productos.png', 
                  title: 'producto',
                  src: '/producto'
                },
                {
                  imgSrc: 'https://tiendasgafpri.com/wp-content/themes/gafpristore/assets/img/icon-inventario.png', 
                  title: 'inventario',
                  src: '/inventario'
                },
                {
                  imgSrc: 'https://tiendasgafpri.com/wp-content/themes/gafpristore/assets/img/budget.png', 
                  title: 'Presupuesto',
                  src: '/presupuesto'
                },
              ],
              [
                {
                  imgSrc: 'https://tiendasgafpri.com/wp-content/themes/gafpristore/assets/img/purchase.png', 
                  title: 'compra',
                  src: '/compra'
                },
                {
                  imgSrc: 'https://tiendasgafpri.com/wp-content/themes/gafpristore/assets/img/expenses.png', 
                  title: 'egresos',
                  src: '/egresos'
                },
                {
                  imgSrc: 'https://tiendasgafpri.com/wp-content/themes/gafpristore/assets/img/icon-ventas.png', 
                  title: 'devolucion',
                  src: '/devolucion'
                },
                {
                  imgSrc: 'https://tiendasgafpri.com/wp-content/themes/gafpristore/assets/img/bank.png', 
                  title: 'banco',
                  src: '/banco'
                },
                {
                  imgSrc: 'https://tiendasgafpri.com/wp-content/themes/gafpristore/assets/img/accounting.png', 
                  title: 'contabilidad',
                  src: '/contabilidad'
                }
              ]
            ]
        },
        asesor:{
          menu: [
              {
                id: 'menu-1',
                imgSrc: Gafpri, 
                title: 'admin',
                src: '/',
                exit: false
              },
              {
                id: 'menu-2',
                imgSrc: Ventas, 
                title: 'ventas',
                src: '/ventas',
                exit: false
              },
              {
                id: 'menu-3',
                imgSrc: Despacho, 
                title: 'despacho',
                src: '/despacho',
                exit: false
              },
              {
                id: 'menu-4',
                imgSrc: Budget, 
                title: 'presupuesto',
                src: '/presupuesto',
                exit: false
              },
              {
                id: 'menu-5',
                imgSrc: Exit, 
                title: 'salir',
                src: '',
                exit: true
              }
          ],
          home: [
            [
              {
                id: 'home-1',
                imgSrc: Ventas,
                title: 'ventas',
                src: '/ventas'
              },
              {
                id: 'home-2',
                imgSrc: Despacho,
                title: 'despacho',
                src: '/despacho'
              },
              {
                id: 'home-3',
                imgSrc: Budget,
                title: 'Presupuesto',
                src: '/presupuesto'
              },
              {
                id: 'home-4',
                imgSrc: Payment,
                title: 'pagos',
                src: '/pagos'
              },
              {
                id: 'home-5',
                imgSrc: Bank,
                title: 'Bancos',
                src: '/bancos'
              },
            ],
            [
              {
                id: 'home-6',
                imgSrc: Purchase,
                title: 'compras',
                src: '/compras'
              },
              {
                id: 'home-7',
                imgSrc: CashRegister,
                title: 'caja',
                src: '/caja'
              },
              {
                id: 'home-8',
                imgSrc: Expenses,
                title: 'Egresos',
                src: '/expenses'
              },
              
            ],
            
          ]
      }
    }
}

export default users;
