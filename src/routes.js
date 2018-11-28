import {
    createStackNavigator,
    createBottomTabNavigator,
    NavigationScreenProps,
    TabScene,
    StackViewTransitionConfigs,
    createSwitchNavigator
} from 'react-navigation'
import { Loading, Main, Login, SignUp, HomeScreen, SettingsScreen } from './component/index'
import { Platform } from 'react-native'
import { Icon } from "react-native-elements";
import React from 'react'
import Ionicons from 'react-native-vector-icons/Entypo';

const IOS_MODAL_ROUTES = ["OptionsScreen"];

let dynamicModalTransition = (
    transitionProps,
    prevTransitionProps
) => {
    return StackViewTransitionConfigs.defaultTransitionConfig(
        transitionProps,
        prevTransitionProps,
        IOS_MODAL_ROUTES.some(
            screenName =>
                screenName === transitionProps.scene.route.routeName ||
                (prevTransitionProps && screenName === prevTransitionProps.scene.route.routeName)
        )
    );
};

const HomeStack = createStackNavigator(
    { HomeScreen, },
    {
        initialRouteName: "HomeScreen",
        transitionConfig: dynamicModalTransition,
        backBehavior: 'initialRoute',
        navBarHidden: true,
        headerMode: "none",
        navigationOptions: {
            gesturesEnabled: false
        }
    }
);

HomeStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
        tabBarVisible = false;
    }

    let drawerLockMode = "unlocked";
    if (navigation.state.index > 0) {
        drawerLockMode = "locked-closed";
    }

    return {
        tabBarLabel: "Home",
        tabBarIcon: ({ tintColor }) => (
            <Icon name="ios-home" type="ionicon" color={tintColor} />
        ),
        tabBarVisible,
        drawerLockMode,
        // drawerLabel: homeStrings.homeTitle,
        drawerIcon: ({ tintColor }) => (
            <Icon name="md-home" type="ionicon" color={tintColor} />
        )
    };
};

const SettingsStack = createStackNavigator(
    { SettingsScreen },
    {
        backBehavior: 'initialRoute',
        navBarHidden: true,
        headerMode: "none",
        navigationOptions: {
            gesturesEnabled: false
        }
    }
);

SettingsStack.navigationOptions = {
    tabBarLabel: "Friends",
    tabBarIcon: ({ tintColor }) => <Ionicons name="chat" type="ionicon" size={20} color={tintColor} />,
    drawerIcon: ({ tintColor }) => <Icon name="md-cog" type="ionicon" color={tintColor} />
};

const AppStack = Platform.select({
    android: createBottomTabNavigator({ HomeStack, SettingsStack }),
});

const LoginStack = createStackNavigator(
    {
        Loading: Loading,
        Login: Login,
        SignUp: SignUp
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

const RootSwitch = createSwitchNavigator(
    {
        LoginStack: LoginStack,
        Main: AppStack
    },
    {
        initialRouteName: "LoginStack",
        backBehavior: 'initialRoute',
        navBarHidden: true,
        headerMode: "none",
        navigationOptions: {
            gesturesEnabled: false
        }
    }
);
export default RootSwitch;

// const TabNavigator = createBottomTabNavigator(
//     {
//         Home: HomeScreen,
//         Settings: SettingsScreen,
//     },
//     {
//         defaultNavigationOptions: ({ navigation }) => ({
//             tabBarIcon: ({ focused, horizontal, tintColor }) => {
//                 const { routeName } = navigation.state;
//                 let iconName;
//                 if (routeName === 'Home') {
//                     iconName = `ios-information-circle${focused ? '' : '-outline'}`;
//                 } else if (routeName === 'Settings') {
//                     iconName = `ios-options${focused ? '' : '-outline'}`;
//                 }

//                 // You can return any component that you like here! We usually use an
//                 // icon component from react-native-vector-icons
//                 return <Ionicons name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
//             },
//         }),
//         tabBarOptions: {
//             activeTintColor: 'tomato',
//             inactiveTintColor: 'gray',
//         },
//     }
// );


// const Routes = createStackNavigator(
//     {
//         Loading: { screen: Loading },
//         SignUp: { screen: SignUp },
//         Login: { screen: Login },
//         Main: { screen: TabNavigator },
//     },
//     {
//         initialRouteName: "Loading",
//         backBehavior: 'initialRoute',
//         navBarHidden: true,
//         headerMode: "none",
//         navigationOptions: {
//             gesturesEnabled: false
//         }
//     }
// );

// export default Routes