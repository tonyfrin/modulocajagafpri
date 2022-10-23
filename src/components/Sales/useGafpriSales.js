import React from 'react';
import { Tienda } from '../abstracts/constants/Tienda';
import { gafpriFetch } from '../abstracts/Context/gafpriFetch';
import { validationHidden } from '../abstracts/Helpers/Validations';


function useGafpriSales(props) {
  const [state, dispatch] = React.useReducer(reducer, initialState());
  const {
    isFetching,
    isInit,
    isUserSelection,
    isUserForm,
    isSalesSection,
    isProductSelection,
    user,
    errorAddUsers,

    userSearch,

    name,
    lastName,
    nif,
    nifType,
    company,
    address,
    address2,
    city,
    stateCountry,
    country,
    postCode,
    email,
    phone,

    cartItems,
    cartTotal,
    cartTotalItems,

    productSearch,
  } = state;

  

/**
 * Path Actions
 *
 * 
 */
    const onFetching = () => dispatch({
        type: actionTypes.fetching,
    });

    const onInit = () => dispatch({
        type: actionTypes.init,
    });

    const onUserSelection = () => dispatch({
        type: actionTypes.userSelection,
    });

    const onUserForm = () => dispatch({
        type: actionTypes.userForm,
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

    const setErrorAddUsers = (newData) => dispatch({
        type: actionTypes.errorAddUsers,
        payload: newData,
    });

    const setUserSearch = (newData) => dispatch({
        type: actionTypes.userSearch,
        payload: newData,
    });

    const uploadUser = (newData) => {
        setUser(newData.data);
        onSalesSection();
    }

    function changeUserNif (event) {
        if (event.key === 'Enter') {
            var nif = event.target.value;
            var dataUser = props.users.users.data.users.filter(function(data){
                if(data.nif === nif){
                    return true;
                }else{
                    return false;
                }
            });
            if(dataUser.length > 0){
                setUser(dataUser[0]);
                onSalesSection();
            } else{
                setNif(event.target.value);
                onUserForm();
            }
        }
    }

    function changeUserName (event) {
        if (event.key === 'Enter') {
            const UserFilter = [];
            props.users.users.data.users.map(( user ) => {
                if(user.name.toLowerCase().search(event.target.value.toLowerCase()) > -1){
                    UserFilter.push(user);
                }
                return null;
            }
            );
            UserFilter.sort((a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0));
            
            setUserSearch(UserFilter);
            onUserSelection();
        }
    }
    
    function changeUserEmail(event) {
        if (event.key === 'Enter') {
            
            var email = event.target.value;
            var dataUser = props.users.users.data.users.filter(function(data){
                if(data.email === email){
                    return true;
                }else{
                    return false;
                }
            });
            if(dataUser.length > 0){
                setUser(dataUser[0]);
                onSalesSection();
            } else{
                setEmail(event.target.value);
                onUserForm();
            }
        }
    }
    
    function userSelect(user){
        setUser(user)
        onSalesSection();
    }

    function changeErrorAddUsers(newData){
        setErrorAddUsers(newData.data);
        onUserForm();
        setTimeout(() => {
            setErrorAddUsers(undefined);
        }, 5000);
    }

/**
 * Set Actions Form Add User
 *
 * 
 */

    const setName = (newData) => dispatch({
        type: actionTypes.name,
        payload: newData,
    });

    const setLastName = (newData) => dispatch({
        type: actionTypes.lastName,
        payload: newData,
    });

    const setCity = (newData) => dispatch({
        type: actionTypes.city,
        payload: newData,
    });

    const setStateCountry = (newData) => dispatch({
        type: actionTypes.state,
        payload: newData,
    });

    const setNifType = (newData) => dispatch({
        type: actionTypes.nifType,
        payload: newData,
    });

    const setNif = (newData) => dispatch({
        type: actionTypes.nif,
        payload: newData,
    });

    const setCompany = (newData) => dispatch({
        type: actionTypes.company,
        payload: newData,
    });

    const setAddress = (newData) => dispatch({
        type: actionTypes.address,
        payload: newData,
    });

    const setAddress2 = (newData) => dispatch({
        type: actionTypes.address2,
        payload: newData,
    });

    const setCountry = (newData) => dispatch({
        type: actionTypes.country,
        payload: newData,
    });

    const setPostCode = (newData) => dispatch({
        type: actionTypes.postCode,
        payload: newData,
    });

    const setEmail = (newData) => dispatch({
        type: actionTypes.email,
        payload: newData,
    });

    const setPhone = (newData) => dispatch({
        type: actionTypes.phone,
        payload: newData,
    });

    function addUser () {
        gafpriFetch({
            initMethod: 'POST', 
            initApi: props.source.api, 
            initRoute: 'gafpriadmin/v1/user/add', 
            initCredentials: {
                firstName: `${name}`,
                lastName: `${lastName}`,
                company: `${company}`,
                address1: `${address}`,
                address2: `${address2}`,
                city: `${city}`,
                state: `${stateCountry.value}`,
                country: `${country.value}`,
                email: `${email}`,
                phone: `${phone}`,
                nif: `${nif}`,
                nifType: `${nifType.value}`,
                postCode: `${postCode}` 
            },
            initToken: props.currentUser, 
            functionFetching: onFetching,
            functionSuccess: uploadUser,
            functionError: changeErrorAddUsers,
        });
    } 

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
        setCartItems(newCart);
    }

    function updateQuantityItemCart(index, event){
        const value = event.target.value;
        let newCartList = [];
        cartItems.map((product, i) => {
            if(index === i){
                const newValue = value === '' ? 0 : value;
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
                        totalCosto: totalCosto
                    });
                } else{
                    newCartList.push(product);
                }
            } else{
                newCartList.push(product);
            }
            setCartItems(newCartList);
            return null;
        })
    }

    function updatePriceItemCart(index, event){
        const value = event.target.value;
        let newCartList = [];
        cartItems.map((product, i) => {
            if(index === i){
                const newValue = value === '' ? 0 : value;
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
                        totalCosto: product.totalCosto
                    });
                } else{
                    newCartList.push(product);
                }
            } else{
                newCartList.push(product);
            }
            setCartItems(newCartList);
            return null;
        })
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
                        total: parseFloat(product.price)
                    })
                ));
                setCartItems(newCart);
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
                        totalCosto: parseFloat(product.costo)
                    })
                ));
                setCartItems(newCart);
                onSalesSection();
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


    function addOrder () {
        gafpriFetch({
            initMethod: 'POST', 
            initApi: props.source.api, 
            initRoute: props.apiRoute, 
            initCredentials: {
                userId: `${user.id}`,
                products: cartItems,
            },
            initToken: props.currentUser, 
            functionFetching: onFetching,
            functionSuccess: onInit,
        });
        resetCart();
    } 


/**
 * Export Status and Actions
 *
 * 
 */

    const states = {
        isFetching,
        isInit,
        isUserSelection,
        isUserForm,
        isSalesSection,
        isProductSelection,
        user,
        errorAddUsers,

        userSearch,

        name,
        lastName,
        nif,
        nifType,
        company,
        address,
        address2,
        city,
        stateCountry,
        country,
        postCode,
        email,
        phone,

        cartItems,
        cartTotal,
        cartTotalItems,

        productSearch,
    }

    const actions = {
        onFetching,
        onInit,
        onUserSelection,
        onUserForm,
        onSalesSection,
        onProductSelection,
        changeUserNif,
        uploadUser,
        changeErrorAddUsers,

        changeUserName,
        changeUserEmail,
        userSelect,

        setName,
        setLastName,
        setCity,
        setStateCountry,
        setNifType,
        setNif,
        setCompany,
        setAddress,
        setAddress2,
        setCountry,
        setPostCode,
        setEmail,
        setPhone,
        addUser,

        removeItemCart,
        updateQuantityItemCart,
        updatePriceItemCart,
        addCombo,
        resetCart,

        changeProductSku,
        selectProduct,
        changeProductName,

        addOrder,
    }

    return {
        states,
        actions,
    };

}

const initialState = () => ({
    isFetching: false,
    isInit: true,
    isUserSelection: false,
    isUserForm: false,
    isSalesSection: false,
    isProductSelection: false,
    user: [],
    errorAddUsers: undefined,
    name: '',
    lastName: '',
    nif: '',
    nifType: '',
    company: '',
    address: '',
    address2: '',
    city: Tienda.city,
    stateCountry: {value: Tienda.state[0], label: Tienda.state[1]},
    country: {value: Tienda.country[0], label: Tienda.country[1]},
    postCode: '',
    email: '',
    phone: '',
    userSearch: [],
    cartItems: [],
    cartTotal: 0,
    cartTotalItems: 0,
    productSearch: [],
});

const actionTypes = {
    fetching: 'FETCHING',
    init: 'INIT',
    userSelection: 'USER_SELECTION',
    userForm: 'USER_FORM',
    salesSection: 'SALES_SECTION',
    productSelection: 'PRODUCT_SELECTION',
    user: 'USER',
    errorAddUsers: 'ERROR_ADD_USERS',
    name: 'NAME',
    lastName: 'LAST_NAME',
    company: 'COMPANY',
    nifType: 'NIF_TYPE',
    nif: 'NIF',
    address: 'ADDRESS',
    address2: 'ADDRESS_2',
    city: 'CITY',
    state: 'STATE',
    country: 'COUNTRY',
    postCode: 'POST_CODE',
    email: 'EMAIL',
    phone: 'PHONE',
    userSearch: 'USER_SEARCH',
    cartItems: 'CART_ITEMS',
    cartTotal: 'CART_TOTAL',
    cartTotalItems: 'CART_TOTAL_ITEMS',
    productSearch: 'PRODUCT_SEARCH',
};

const reducerObject = (state, payload) => ({
    [actionTypes.fetching]: {
        ...state,
        isFetching: true,
        isInit: false,
        isUserSelection: false,
        isUserForm: false,
        isSalesSection: false,
        isProductSelection: false,
    },
    [actionTypes.init]: {
        ...state,
        isFetching: false,
        isInit: true,
        isUserSelection: false,
        isUserForm: false,
        isSalesSection: false,
        isProductSelection: false,
    },
    [actionTypes.userSelection]: {
        ...state,
        isFetching: false,
        isInit: false,
        isUserSelection: true,
        isUserForm: false,
        isSalesSection: false,
        isProductSelection: false,
    },
    [actionTypes.userForm]: {
        ...state,
        isFetching: false,
        isInit: false,
        isUserSelection: false,
        isUserForm: true,
        isSalesSection: false,
        isProductSelection: false,
    },
    [actionTypes.salesSection]: {
        ...state,
        isFetching: false,
        isInit: false,
        isUserSelection: false,
        isUserForm: false,
        isSalesSection: true,
        isProductSelection: false,
    },
    [actionTypes.productSelection]: {
        ...state,
        isFetching: false,
        isInit: false,
        isUserSelection: false,
        isUserForm: false,
        isSalesSection: false,
        isProductSelection: true,
    },
    [actionTypes.user]: {
        ...state,
        user: payload,
    },
    [actionTypes.errorAddUsers]: {
        ...state,
        errorAddUsers: payload,
    },
    [actionTypes.name]: {
        ...state,
        name: payload,
    },
    [actionTypes.lastName]: {
        ...state,
        lastName: payload,
    },
    [actionTypes.company]: {
        ...state,
        company: payload,
    },
    [actionTypes.nifType]: {
        ...state,
        nifType: payload,
    },
    [actionTypes.nif]: {
        ...state,
        nif: payload,
    },
    [actionTypes.address]: {
        ...state,
        address: payload,
    },
    [actionTypes.address2]: {
        ...state,
        address2: payload,
    },
    [actionTypes.city]: {
        ...state,
        city: payload,
    },
    [actionTypes.state]: {
        ...state,
        stateCountry: payload,
    },
    [actionTypes.country]: {
        ...state,
        country: payload,
    },
    [actionTypes.postCode]: {
        ...state,
        postCode: payload,
    },
    [actionTypes.email]: {
        ...state,
        email: payload,
    },
    [actionTypes.phone]: {
        ...state,
        phone: payload,
    },
    [actionTypes.userSearch]: {
        ...state,
        userSearch: payload,
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

export { useGafpriSales };