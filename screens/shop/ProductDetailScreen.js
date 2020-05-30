import React from 'react';
import { View, Text, ScrollView, Image, Button, StyleSheet } from 'react-native';
import { useSelector,useDispatch } from 'react-redux';
import * as cartActions from '../../store/actions/cartAction';

import Colors from '../../constants/Colors';
import MyButton from '../../components/UI/MyButton';
import BodyText from '../../components/UI/BodyText';

const ProductDetailScreen = props => {
    const productId = props.navigation.getParam('productId');
    const dispatch = useDispatch();
    const selectedProduct = useSelector(state =>
        state.products.availableProducts.find(prod => prod.id === productId))
    return (
        <ScrollView style={styles.view}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
            </View>
            <View style={styles.button}>
                <MyButton color={Colors.primary} onPress={() => {
                    dispatch(cartActions.addToCart(selectedProduct))
                 }}> Add to Cart </MyButton>
            </View>
            <BodyText style={styles.price}>Rs.{selectedProduct.price.toFixed(2)}</BodyText>
            <BodyText style={styles.description}>{selectedProduct.description}</BodyText>
        </ScrollView>
    );
};

ProductDetailScreen.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('productTitle')
    };
}

const styles = StyleSheet.create({
    imageContainer: {
        padding: 10,
        borderRadius: 10,
        overflow: 'hidden',

    },
    image: {
        height: 300,
        width: '100%',
        borderRadius: 10,
        borderColor: '#ccc',
        borderWidth: 2
    },
    price: {
        fontSize: 20,
        color: '#888',
        textAlign: 'center',
        marginVertical: 20
    },
    description: {
        fontSize: 18,
        textAlign: 'center',
        marginHorizontal: 15
    },
    button: {
        alignItems: 'center',
        paddingTop: 10
    }
});

export default ProductDetailScreen;