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
  iconColor = '#4A6572',
  index,
  row,
  prevOpenedRow,
  onUpdateRow,
  onUpdatePrevOpenedRow,
  backgroundColor = '#fff7e0',
}) => {
  const closeRow = index => {
    if (prevOpenedRow && prevOpenedRow !== row[index]) {
      prevOpenedRow.close();
    }
    onUpdatePrevOpenedRow(row[index]);
  };

  const renderActions = () => {
    return (
      <>
        {onDelete ? (
          <RectButton
            style={[styles.swipeableButton, styles.swipeableDelete]}
            onPress={() =>
              Alert.alert(
                'Delete',
                `Are you sure you want to remove ${title}?`,
                [{text: 'Yes', onPress: () => onDelete()}, {text: 'No'}],
              )
            }>
            <Animated.Text
              style={[styles.actionText, styles.swipeableDeleteText]}>
              Delete
            </Animated.Text>
          </RectButton>
        ) : null}
        {onEdit ? (
          <RectButton
            onPress={() => onEdit()}
            style={[styles.swipeableButton, styles.swipeableEdit]}>
            <Animated.Text
              style={[styles.actionText, styles.swipeableEditText]}>
              Edit
            </Animated.Text>
          </RectButton>
        ) : null}
      </>
    );
  };

  return (
    <Swipeable
      renderRightActions={renderActions}
      friction={1.5}
      ref={ref => {
        row[index] = ref;
        onUpdateRow(row);
      }}
      onSwipeableOpen={() => {
        closeRow(index);
      }}>
      <List.Item
        style={styles.itemContainer(backgroundColor)}
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
  itemContainer: backgroundColor => ({
    backgroundColor: backgroundColor,
  }),
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
