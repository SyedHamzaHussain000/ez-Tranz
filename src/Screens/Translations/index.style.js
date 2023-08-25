import {StyleSheet} from 'react-native';
import {COLORS} from '../../Constants/theme';

export const styles = StyleSheet.create({
    main_container: {
      paddingBottom:290,
      },
      flatlist_container: {
        flex: 1,
        bottom:0
      },
      header:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:'center',
        paddingRight:20,
        alignContent:'center',
        marginTop:15
      },
      card_view:{
        height:170,
        backgroundColor:COLORS.text_white,
        marginHorizontal:20,
        marginTop:18,
        borderRadius:10,
        paddingHorizontal:15,
      },
      Search_field: {
        height: 70,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: COLORS.text_white,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
      },
      flag_container_list:{
        height:40,
        width:40,
        resizeMode:'center'
      },
      card_:{
        height:60,
        backgroundColor:COLORS.text_white,
        marginHorizontal:20,
        marginTop:20,
        borderRadius:10,
        paddingHorizontal:15,
        alignItems:'center',
        justifyContent:'center',
        width:70
      },
      
})