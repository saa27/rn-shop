import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BodyText from '../UI/BodyText';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const CartItem = props => {
    const text = props.title;
    let truncatedText;
    if(text.length>15){
        truncatedText = text.substring(0,Math.min(15,text.length)) + '...';
    }
    else{
    truncatedText = text;}
    return (
        <View style={styles.cartItem}>
            <View style={styles.itemData}>
                <BodyText style={styles.quantity}>{props.quantity} </BodyText>
                <Text style={styles.title}>{truncatedText} </Text>
            </View>
            <View style={styles.itemData}>
                <Text style={styles.amount}>Rs.{props.amount.toFixed(2)} </Text>
                {props.deletable && (<TouchableOpacity onPress={props.onDelete} style={styles.deleteIcon}>
                    <Ionicons
                        name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
                        size={23}
                        color="firebrick"
                    />
                </TouchableOpacity>)}
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    cartItem: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        marginHorizontal: 10
    },
    itemData: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    quantity: {
        color: '#888',
        fontSize: 16
    },
    title:{
        fontFamily: 'open-sans-bold',
        fontSize: 18,
    },
    amount: {
        fontFamily: 'open-sans-bold',
        fontSize: 18
    },
    deleteIcon: {

    }
});

export default CartItem;