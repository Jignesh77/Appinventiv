import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import Swiper from 'react-native-swiper';

const DashboardScreen = ({ navigation }) => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('https://fakestoreapi.com/products');
            setFeaturedProducts(response.data.slice(0, 5)); // Top 5 as featured
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const renderProduct = ({ item }) => (
        <TouchableOpacity
            style={styles.productCard}
            onPress={() => navigation.navigate('Detail', { product: item })}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <Text style={styles.productTitle}>{item.title}</Text>
            <Text style={styles.productPrice}>${item.price}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/* Carousel */}
            {products ? <>
                <View style={styles.swiperContainer}>
                <Swiper
                    style={[styles.wrapper]}
                    autoplay={true}
                    autoplayTimeout={1}
                    loop={true}
                    scrollEnabled={true}
                    showsPagination={featuredProducts ? true : false}
                    paginationStyle={styles.pagination}
                    dot={<View style={styles.dot} />}
                    activeDot={<View style={styles.activeDot} />}
                >
                    {featuredProducts.map(item => (
                        <View style={styles.carouselItem} key={item.id.toString()}>
                            {/* <Text>{item.image}</Text> */}
                            <Image source={{ uri: item.image }} style={styles.carouselImage} />
                        </View>
                    ))}
                </Swiper>
            </View>

            {/* // Product List  */}
            <FlatList
                data={products}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderProduct}
                initialNumToRender={10}
                contentContainerStyle={styles.productList}
            />
            </> :
            <ActivityIndicator size={'large'} />
            }
        </View>
    );
};


const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    carouselContainer: { height: 200, width: '100%' }, // Restrict height
    carouselItem: {
        flex: 1,
        width: '100%',
        alignSelf: 'center',
        // backgroundColor:'green',
        marginTop: 8,
        marginBottom: 4,
    },
    carouselImage: { width: '100%', height: '100%', resizeMode: 'center' },
    productList: { padding: 10 },
    productCard: { marginBottom: 15, backgroundColor: '#f9f9f9', padding: 10, borderRadius: 8 },
    productImage: { width: '100%', height: 150, resizeMode: 'contain' },
    productTitle: { fontSize: 16, fontWeight: 'bold', marginVertical: 5 },
    productPrice: { fontSize: 14, color: 'green' },
    wrapper: {
        // width: HorizontalScale(336),
        height: '100%',

    },
    swiperContainer:{ height: '30%', paddingVertical: 4 },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    dot: {
        backgroundColor: 'grey',
        width: 9,
        height: 9,
        borderRadius: 10,
        margin: 3,

    },
    activeDot: {
        backgroundColor: 'red',
        width: 9,
        height: 9,
        borderRadius: 10,
        margin: 3,
    },
    pagination:{ bottom: 20 },
});
export default DashboardScreen;
