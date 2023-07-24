import { StyleSheet } from "react-native";
import { COLORS } from "../../Constants/theme";


export const styles = StyleSheet.create({
    App_title_txt:{
        fontSize:28,
        fontWeight:'bold',
    },
    title_txt:{
        fontSize:19,
        fontWeight:'bold',
        marginTop:15
    },
    container: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor:'white',
        borderRadius:10,
        marginTop:10,
        alignContent:'center',
        flexDirection:'row'
      },
      txt:{
        color:'black'
      },
      container_Email:{
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor:COLORS.primary,
        borderRadius:10,
        marginTop:15,
        alignContent:'center',
        flexDirection:'row'
      },
      devider_View:{
        height:2,
        backgroundColor:'#D4D4D4',
        marginTop:30,
        borderRadius:10
      },
      
}) 