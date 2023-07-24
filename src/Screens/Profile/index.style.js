import {StyleSheet} from 'react-native';
import { COLORS } from '../../Constants/theme';

export const styles = StyleSheet.create({
    title:{
        fontSize:30,
        fontWeight:'400',
        marginTop:30,
        marginHorizontal:25
    },
    name_view:{
        marginHorizontal:20,
        marginTop:20,
        borderRadius:10,
        borderWidth:2,
        height:50,
        justifyContent:'center',
        paddingHorizontal:15,
        borderColor:COLORS.primary
    }
});
