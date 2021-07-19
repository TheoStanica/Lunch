import {List} from 'react-native-paper';
import React from 'react';
import {StyleSheet, View, Animated, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {RectButton} from 'react-native-gesture-handler';

const AdminField = ({
  onEdit,
  onDelete,
  title,
  description,
  icon,
  iconColor = '#FBBC00',
}) => {
  const renderActions = () => {
    return (
      <>
        <RectButton
          style={[styles.swipeableButton, styles.swipeableDelete]}
          onPress={() => {
            Alert.alert(
              'Are you sure?',
              `Are you sure you want to remove ${title}?`,
              [
                {text: 'Yes', onPress: () => (onDelete ? onDelete() : null)},
                {text: 'No'},
              ],
            );
          }}>
          <Animated.Text
            style={[styles.actionText, styles.swipeableDeleteText]}>
            Delete
          </Animated.Text>
        </RectButton>
        <RectButton
          onPress={() => (onEdit ? onEdit() : null)}
          style={[styles.swipeableButton, styles.swipeableEdit]}>
          <Animated.Text style={[styles.actionText, styles.swipeableEditText]}>
            Edit
          </Animated.Text>
        </RectButton>
      </>
    );
  };

  return (
    <Swipeable renderRightActions={renderActions}>
      <List.Item
        style={styles.itemContainer}
        title={title}
        titleStyle={styles.title}
        description={description}
        descriptionStyle={styles.description}
        left={() =>
          icon ? (
            <View style={styles.icon}>
              <Icon size={40} name={icon} color={iconColor} />
            </View>
          ) : null
        }
      />
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    textTransform: 'capitalize',
  },
  itemContainer: {
    backgroundColor: 'white',
  },
  swipeableButton: {
    justifyContent: 'center',
  },
  swipeableEdit: {
    backgroundColor: '#FCBB00',
  },
  swipeableDelete: {
    backgroundColor: 'red',
  },
  swipeableEditText: {
    color: 'black',
  },
  swipeableDeleteText: {
    color: 'white',
  },
  description: {
    textTransform: 'capitalize',
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionText: {
    fontSize: 18,
    width: 80,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

export default AdminField;
