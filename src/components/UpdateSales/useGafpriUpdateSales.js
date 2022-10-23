import React from 'react';
import { gafpriFetch } from '../abstracts/Context/gafpriFetch';
import { validationHidden } from '../abstracts/Helpers/Validations';


function useGafpriUpdateSales(props) {
  const [state, dispatch] = React.useReducer(reducer, initialState());
  const {
    isFetching,
    isSalesSection,
    isProductSelection,

    user,


    cartItems,
    cartTotal,
    cartTotalItems,

    productSearch,
  } = state;

  
  React.useEffect(() => {
    setUser(props.users.getUserById(props.userId));
    if(props.purchase){
        setCartItems(props.orders.getPurchaseProductsById(props.orderId));
    }else{
        setCartItems(props.orders.getOrderProductsById(props.orderId));
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  

/**
 * Path Actions
 *
 * 
 */
    const onFetching = () => dispatch({
        type: actionTypes.fetching,
    });

    const onSalesSection = () => dispatch({
        type: actionTypes.salesSection,
    });

    const onProductSelection = () => dispatch({
        type: actionTypes.productSelection,
    });

/**
 * Init Actions
 *
 * 
 */

    const setUser = (newData) => dispatch({
        type: actionTypes.user,
        payload: newData,
    });

/**
 * Set Actions Form Cart
 *
 * 
 */

    const setCartTotalItems = (newData) => dispatch({
        type: actionTypes.cartTotalItems,
        payload: newData,
    });

    const setCartItems = (newData) => {
        dispatch({
            type: actionTypes.cartItems,
            payload: newData,
        });
        let total = 0;
        let totalItems = 0;
        newData.map((product, i) => {
            total = total + product.total;
            totalItems = totalItems + product.quantity;
            return null;
        })
        setCartTotal(total);
        setCartTotalItems(totalItems);
    };

    const setCartTotal = (newData) => dispatch({
        type: actionTypes.cartTotal,
        payload: newData,
    });

    function removeItemCart(index){
        const newCart = cartItems.filter(function(item, arr) {
            return arr !== index
        });
        let total = 0;
        newCart.map((product, i) => {
            total = total + product.total;
            return null;
        })
        setCartItems(newCart);
    }

    function updateQuantityItemCart(index, event){
        let newCartList = [];
        cartItems.map((product, i) => {
            if(index === i){
                const newValue = event.target.value === '' ? 0 : event.target.value;
                if(newValue >= 0){
                    const total = parseFloat(newValue) * product.price;
                    const totalCosto = parseFloat(product.costo) * parseFloat(newValue);
                    newCartList.push({
                        id: product.id,
                        sku: product.sku,
                        productName: product.productName,
                        costo: product.costo,
                        quantity: parseFloat(newValue),
                        price: product.price,
                        total: parseFloat(total),
                        totalCosto: totalCosto,
                    });
                } else{
                    newCartList.push(product);
                }
            } else{
                newCartList.push(product);
            }
            return null;
        })
        setCartItems(newCartList);
    }

    function updatePriceItemCart(index, event){
        let newCartList = [];
        cartItems.map((product, i) => {
            if(index === i){
                const newValue = event.target.value === '' ? 0 : event.target.value;
                if(newValue >= 0){
                    const total = parseFloat(newValue) * product.quantity;
                    newCartList.push({
                        id: product.id,
                        sku: product.sku,
                        productName: product.productName,
                        costo: product.costo,
                        quantity: product.quantity,
                        price:  parseFloat(newValue),
                        total: parseFloat(total),
                        totalCosto: product.totalCosto,
                    });
                } else{
                    newCartList.push(product);
                }
            } else{
                newCartList.push(product);
            }
            return null;
        })
        setCartItems(newCartList);
    }

    function addCombo(Combo){
        Combo.map((item) => {
            var dataProducts =  props.products.data.products.filter(function(dato){
                if(dato.sku === item.sku){
                    return true;
                }else{
                    return false;
                }
            });
            if(dataProducts.length > 0){
                let newCart = cartItems;
                dataProducts.map((product, index) => (
                    newCart.push({
                        id: product.id,
                        productName: product.productName,
                        sku: product.sku,
                        costo: parseFloat(product.costo),
                        price: parseFloat(0),
                        quantity: parseFloat(item.quantity),
                        total: parseFloat(0),
                        totalCosto: parseFloat(product.costo)
                    })
                ));
                setCartItems(newCart);
            }
            return null;
        })
    }

    function resetCart(){
        setCartItems([]);
        setCartTotal(0);
    }

/**
 * Set Actions Form Products
 *
 * 
 */

    const setProductSearch = (newData) => dispatch({
        type: actionTypes.productSearch,
        payload: newData,
    });

    function changeProductSku (event) {
        if (event.key === 'Enter') {
            
            const sku = event.target.value;
            var dataProducts = props.products.data.products.filter(function(data){
                if(data.sku === sku){
                    return true;
                }else{
                    return false;
                }
            });
            if(dataProducts.length > 0){
                let newCart = cartItems;
                dataProducts.map((product, index) => (
                    newCart.push({
                        id: product.id,
                        productName: product.productName,
                        sku: product.sku,
                        costo: parseFloat(product.costo),
                        price: parseFloat(product.price),
                        quantity: parseFloat(1),
                        total: parseFloat(product.price),
                    })
                ));
                setCartItems(newCart);
                return null;
            } else{
                const ProductsFilter = [];
                props.products.data.products.map(( product ) => {
                    const validate = new RegExp(`^${sku}`);
                    const valid = validationHidden(product.sku, validate);
                    if(valid){
                        ProductsFilter.push(product);
                    }
                    return null;
                });
                ProductsFilter.sort((a, b) => (a.sku > b.sku ? 1 : a.sku < b.sku ? -1 : 0));
                setProductSearch(ProductsFilter);
                onProductSelection();
            }
        }
    }

    function selectProduct(skuValue){
        const sku = skuValue;
            var dataProducts = props.products.data.products.filter(function(data){
                if(data.sku === sku){
                    return true;
                }else{
                    return false;
                }
            });
            if(dataProducts.length > 0){
                let newCart = cartItems;
                dataProducts.map((product, index) => (
                    newCart.push({
                        id: product.id,
                        productName: product.productName,
                        sku: product.sku,
                        costo: parseFloat(product.costo),
                        price: parseFloat(product.price),
                        quantity: parseFloat(1),
                        total: parseFloat(product.price),
                        totalCosto: parseFloat(product.costo),
                    })
                ));
                setCartItems(newCart);
                onSalesSection();
                return null;
            }
    }

    function changeProductName (event) {
        if (event.key === 'Enter') {
            const ProductsFilter = [];
            props.products.data.products.map(( product ) => {
                if(product.productName.toLowerCase().search(event.target.value.toLowerCase()) > -1){
                    ProductsFilter.push(product);
                }
                return null;
            });
            ProductsFilter.sort((a, b) => (a.productName > b.productName ? 1 : a.productName < b.productName ? -1 : 0));
            setProductSearch(ProductsFilter);
            onProductSelection();
        }
    }

/**
 * Set Actions Form Orders
 *
 * 
 */

    function updateOrderDb(){
        if(props.purchase){
            gafpriFetch({
                initMethod: 'POST', 
                initApi: props.source.api, 
                initRoute: 'gafpriadmin/v1/purchases/update-items', 
                initCredentials: {
                    orderId: props.orderId,
                    products: cartItems,
                },
                initToken: props.currentUser, 
                functionFetching: onFetching,
                functionSuccess: updatePurchase,
            });
        }else{
            gafpriFetch({
                initMethod: 'POST', 
                initApi: props.source.api, 
                initRoute: 'gafpriadmin/v1/orders/update-items', 
                initCredentials: {
                    orderId: props.orderId,
                    products: cartItems,
                },
                initToken: props.currentUser, 
                functionFetching: onFetching,
                functionSuccess: updateOrder,
            });
        }
        
    }

    

    function updateOrder(newData){
        let total = 0;
        newData.products.map((product, i) => {
            total = total + product.total;
            return null;
        })
        props.orders.updateItemsOrder(props.orderId, newData.products, total);
        props.functionReturn();
    }

    function updatePurchase(newData){
        let total = 0;
        newData.products.map((product, i) => {
            total = total + product.total;
            return null;
        })
        props.orders.updateItemsPurchase(props.orderId, newData.products, total);
        props.functionReturn();
    }

    




    



/**
 * Export Status and Actions
 *
 * 
 */

    const states = {
        isFetching,
        isSalesSection,
        isProductSelection,

        user,

        cartItems,
        cartTotal,
        cartTotalItems,

        productSearch,
    }

    const actions = {
        onFetching,
        onSalesSection,
        onProductSelection,
      

        removeItemCart,
        updateQuantityItemCart,
        updatePriceItemCart,
        addCombo,
        resetCart,

        changeProductSku,
        selectProduct,
        changeProductName,
        updateOrderDb,
    }

    return {
        states,
        actions,
    };

}

const initialState = () => ({
    isFetching: false,
    isSalesSection: true,
    isProductSelection: false,
    user: [],
    cartItems: [],
    cartTotal: 0,
    cartTotalItems: 0,
    productSearch: [],
});

const actionTypes = {
    fetching: 'FETCHING',
    salesSection: 'SALES_SECTION',
    productSelection: 'PRODUCT_SELECTION',
    user: 'USER',
    cartItems: 'CART_ITEMS',
    cartTotal: 'CART_TOTAL',
    cartTotalItems: 'CART_TOTAL_ITEMS',
    productSearch: 'PRODUCT_SEARCH',
};

const reducerObject = (state, payload) => ({
    [actionTypes.fetching]: {
        ...state,
        isFetching: true,
        isSalesSection: false,
        isProductSelection: false,
    },
    [actionTypes.salesSection]: {
        ...state,
        isFetching: false,
        isSalesSection: true,
        isProductSelection: false,
    },
    [actionTypes.productSelection]: {
        ...state,
        isFetching: false,
        isSalesSection: false,
        isProductSelection: true,
    },
    [actionTypes.user]: {
        ...state,
        user: payload,
    },
    [actionTypes.cartItems]: {
        ...state,
        cartItems: payload,
    },
    [actionTypes.cartTotal]: {
        ...state,
        cartTotal: payload,
    },
    [actionTypes.cartTotalItems]: {
        ...state,
        cartTotalItems: payload,
    },
    [actionTypes.productSearch]: {
        ...state,
        productSearch: payload,
    },
});

const reducer = (state, action) => {
    return reducerObject(state, action.payload)[action.type] || state;
};

export { useGafpriUpdateSales };