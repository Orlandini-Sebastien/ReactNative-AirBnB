import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';

const logo = () => {
	const navigation = useNavigation();

	return <FontAwesome5 name="airbnb" size={24} color="red" />


};

export default logo;
