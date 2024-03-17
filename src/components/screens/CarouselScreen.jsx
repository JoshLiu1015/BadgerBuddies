import React from 'react';
import Carousel from 'react-native-reanimated-carousel';
import { View, Image, Dimensions } from 'react-native';

const width = Dimensions.get('window').width;

const CarouselScreen = ({ data }) => {
    // if the after after filtering out null is empty, return the default image
    if (data.filter((item) => item != null).length === 0) {
        return <Image
            source={require('../../../assets/swan.webp')}
            style={{ width: width, height: 200 }}
            resizeMode="contain"
        />
    }

    // if the first eleemnt of data isn't null
    return (
    // <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <Carousel
        loop
        width={width}
        height={width/2}
        // data is the array of {uri: image.uri}
        data={data.filter((item) => item != null)} 
        // how fast to swipe to next pic
        scrollAnimationDuration={1000}
        // item here is each object in the array
        renderItem={({ item, index }) => {
            // Check if element is null, and if so, render the default image
            if (item === null) {
                // return nothing
                return
            }

            // Otherwise, render the image from `data`
            return (
            <Image
                source={{ uri: item.uri }}
                style={{ width: width, height: 200 }}
                resizeMode="contain"
            />
            );
        }}
        />
    // </View>
    );
};

  
export default CarouselScreen;