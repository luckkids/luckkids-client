import React from 'react';
import { L, SvgIcon} from "@design-system";
import {Image, TouchableWithoutFeedback} from "react-native";
import useNavigationService from "@hooks/navigation/useNavigationService";

export const GardenNavbar=()=>{
    const navigation = useNavigationService();
    return <L.Row ph={20} pv={10} justify={'space-between'}>
        <Image
            source={require('@design-system/assets/images/nav-logo.png')}
            style={{
                resizeMode: 'contain',
                width: 113,
                height: 20,
            }}
        />
        <TouchableWithoutFeedback
            onPress={() => navigation.navigate('HomeAlarm')}
        >
            <SvgIcon name={'bell_badge'} size={20} />
        </TouchableWithoutFeedback>
    </L.Row>;
}
