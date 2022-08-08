import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPurchasesThunk } from '../store/slices/purchases.slice';

const Purchases = () => {

    const dispatch = useDispatch();

    const purchases = useSelector((state) => state.purchases);

    useEffect(() => {
        dispatch(getPurchasesThunk())
    }, [])

    return (
        <div>
            <h1 className="purchasesTitle">Purchases</h1>
            <div className="purchases">
                {
                    purchases?.map((purchase) => (
                        <div className="purchase" key={purchase.id}>
                            <div className="datePurchase">{new Date(purchase.createdAt).toDateString()}</div>
                            {purchase.cart.products?.map((product) => (
                                <div className="purchaseProductInfo" key={product.id}>
                                    <p className="purchaseProductTitle">{product.title}</p>
                                    <span className="purchaseProductQuantity">{product.productsInCart.quantity}</span>
                                    <p className="purchaseProductPrice">${product.price}</p>
                                </div>
                            ))}
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Purchases;