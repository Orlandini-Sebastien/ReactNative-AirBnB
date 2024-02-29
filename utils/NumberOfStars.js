import { Entypo } from '@expo/vector-icons';
const NumberOfStars = (number) => {
    const array = [];
    for (let i = 0; i < number; i++) {
        array.push(<Entypo name="star" size={24} color="orange" />);
    }
    for (let i = number; i < 5; i++) {
        array.push(<Entypo name="star-outlined" size={24} color="orange" />);
    }
    return array;
};

export default NumberOfStars