import {Text, View, Button, TouchableOpacity} from "react-native";
import { useNavigation } from "@react-navigation/core";



const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <View className="justify-around items-center flex-1 bg-red-200" >
      <Text>This is the HomeScreen component</Text>
   
    
      <TouchableOpacity
      className="border-2 p-4 rounded border-solid bg-blue-400 border-blue-500"
        onPress={() => {
          navigation.navigate("Profile", { userId: 123 });
        }}
      >
        <Text>Go to profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;