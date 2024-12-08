import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const ProductDetail = ({route}) => {
  const {product} = route.params;

  return (
    <View style={styles.container}>
      <Image source={{uri: product.image}} style={styles.image} testID="product-image"/>
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.description}>{product.description}</Text>
      <Text style={styles.price}>${product.price}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20},
  image: {width: '100%', height: 300, resizeMode: 'contain'},
  title: {fontSize: 24, fontWeight: 'bold', marginVertical: 10},
  description: {fontSize: 16, marginVertical: 10},
  price: {fontSize: 20, color: 'green', marginVertical: 10},
});

export default ProductDetail;
