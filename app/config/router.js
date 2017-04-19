import { StackNavigator } from 'react-navigation';
import MessageList from '../components/Message/List';

export const Root = StackNavigator({
  MessageList: {
    name: 'Messages',
    screen: MessageList
  }
}, {
  initialRouteName: 'MessageList',
});
