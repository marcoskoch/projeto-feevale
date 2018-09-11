import React from 'react';
import { AsyncStorage, Alert } from 'react-native';

export const modificaName = (texto) => {
    return {
        type: 'modifica_name',
        payload: texto
    }
}

export const modificaEmail = (texto) => {
    return {
        type: 'modifica_email',
        payload: texto
    }
}

export const modificaMinYear = (texto) => {
    return {
        type: 'modifica_minyear',
        payload: texto
    }
}

export const modificaMaxYear = (texto) => {
    return {
        type: 'modifica_maxyear',
        payload: texto
    }
}

export const modificaGender = (texto) => {
    return {
        type: 'modifica_gender',
        payload: texto
    }
}

export const modificaPhone = (texto) => {
    return {
        type: 'modifica_phone',
        payload: texto
    }
}

export const modificaPhoto = (texto) => {
    return {
        type: 'modifica_photo',
        payload: texto
    }
}

export const saveProfile = (profile) => {
    try {
      AsyncStorage.setItem('profile_name', profile.name.toString());
      AsyncStorage.setItem('profile_email', profile.email.toString());
      AsyncStorage.setItem('profile_phone', profile.phone.toString());
      AsyncStorage.setItem('profile_gender', profile.gender.toString());
      AsyncStorage.setItem('profile_minyear', profile.minYear.toString());
      AsyncStorage.setItem('profile_maxyear', profile.maxYear.toString());
    } catch (error) {
      console.log(error)
    }
    return {
        type: 'sucesso'
    }
}
