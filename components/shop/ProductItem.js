import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Platform, TouchableNativeFeedback } from 'react-native';
import BodyText from '../UI/BodyText';

const ProductItem = props => {
    let TouchComp = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchComp = TouchableNativeFeedback;
    }
    return (

        <View style={styles.product}>
            <TouchComp onPress={props.onSelect} useForeground>
                <View>
                    <View style={styles.imageContainer}>
                        <Image style={styles.image} source={{ uri: props.imageUrl }} />
                    </View>
                    <View style={styles.details}>
                        <BodyText style={styles.title}>{props.title}</BodyText>
                        <BodyText style={styles.price}>Rs.{props.price.toFixed(2)}</BodyText>
                    </View>
                    <View style={styles.buttonContainer}>
                        {props.children}
                    </View>
                </View>
            </TouchComp>
        </View>

    );
};

const styles = StyleSheet.create({
    product: {
        elevation: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        height: 280,
        margin: 20,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    title: {
        fontSize: 18,
        marginTop: 4,
        fontFamily: 'open-sans-bold'
    },
    price: {
        fontSize: 16,
        color: 'rgba(60, 194, 167, 0.7)',
        marginBottom: 2,
        marginLeft: 4
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: '23%',
    },
    imageContainer: {
        width: '100%',
        height: '60%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden'
    },
    details: {
        alignItems: 'center',
        height: '17%',

    }
});

export default ProductItem;