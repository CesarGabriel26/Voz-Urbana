import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';


export async function getUserLocation() {
    let location = null
    
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        return;
    }

    let userLocation = await Location.getCurrentPositionAsync({}) || null;
    location = userLocation ? userLocation.coords : null
    

    return location
}