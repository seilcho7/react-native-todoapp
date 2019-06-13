import React from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';

export default class Weather extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: '',
            lat: '',
            lon: '',
            temp: ''
        }
    }

    componentDidMount() {   
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const lon = position.coords.longitude.toFixed(2);
                const lat = position.coords.latitude.toFixed(2);
                this.setState({
                    lon,
                    lat
                }, this._getWeather)
            });
        }
    }

    render() {
        return (
            <View>
                {this.state.data ? 
                    <View style={styles.weather}>
                        <Image 
                            source={{uri: `http://openweathermap.org/img/w/${this.state.data.weather[0].icon}.png`}}
                            style={{width: 50, height: 50}} />
                        <Text>{Math.round(this.state.temp)}°F</Text>
                        <View style={styles.textContainer}>
                            <Text>{this.state.data.weather[0].main}: {this.state.data.weather[0].description}</Text>
                        </View>
                    </View> : null}
            </View>
        )
    }

    _getWeather = async () => {
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${this.state.lat}&lon=${this.state.lon}&appid=544e633f1a1d6d7bb3378ec526f12f59`);
        const data = await response.json();
        const temp = (data.main.temp - 273.15) * (9/5) + 32;
        this.setState({
            data,
            temp
        })
    }
}

const styles = StyleSheet.create({
    weather: {
        flexDirection: 'row',
    },
    textContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 15
    }
})