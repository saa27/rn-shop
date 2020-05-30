import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

import CartItem from './CartItem';
import Colors from '../../constants/Colors';
import MyButton from '../UI/MyButton';

const OrderItem = props => {
    const [viewDetails, setViewDetails] = useState(false);
    return (
        <View style={styles.orderItem}>
            <View style={styles.summary}>
                <Text style={styles.totalAmount}>Rs.{props.amount.toFixed(2)}</Text>
                <Text style={styles.date}>{props.date}</Text>
            </View>
            <MyButton onPress={() => { setViewDetails(prevState => !prevState) }}>{viewDetails ? 'Hide Details' : 'View Details'}</MyButton>
            {viewDetails &&
                (<View style={styles.details}>
                    {props.items.map(cartItem => (
                        <CartItem
                            key={cartItem.productId}
                            quantity={cartItem.quantity}
                            amount={cartItem.sum}
                            title={cartItem.productTitle}
                        />
                    ))}
                </View>
                )}
        </View>
    );
}

const styles = StyleSheet.create({
    orderItem: {
        elevation: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        margin: 20,
        padding: 10,
        alignItems: 'center'
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 10
    },
    totalAmount: {
        fontFamily: 'open-sans-bold',
        color: Colors.accent,
        fontSize: 16
    },
    date: {
        color: '#888',
        fontFamily: 'open-sans',
        fontSize: 16
    },
    details: {
        width: '100%'
    }
});

export default OrderItem;
