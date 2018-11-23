import { createStackNavigator } from 'react-navigation'
import { Loading, Main, Login, SignUp } from './component/index'

const Routes = createStackNavigator(
    {
        Loading: { screen: Loading },
        SignUp: { screen: SignUp },
        Login: { screen: Login },
        Main: { screen: Main },
    },
    {
        initialRouteName: "Loading",
        backBehavior: 'initialRoute',
        navBarHidden: true,
        headerMode: "none",
        navigationOptions: {
            gesturesEnabled: false
        }
    }
);

export default Routes