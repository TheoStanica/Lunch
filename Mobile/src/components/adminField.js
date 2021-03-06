import React from 'react';
import {List} from 'react-native-paper';
import {StyleSheet, View, Animated, Alert} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Swipeable from 'react-native-gesture-handler/Swipeable';

const AdminField = ({
  onEdit,
  onDelete,
  onPress,
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

  const renderActions = index => {
    return (
      <>
        {onDelete ? (
          <RectButton
            style={[styles.swipeableButton, styles.swipeableDelete]}
            onPress={() =>
              Alert.alert(
                'Delete',
                `Are you sure you want to remove ${title}?`,
                [
                  {
                    text: 'Yes',
                    onPress: () => {
                      row[index].close();
                      onDelete();
                    },
                  },
                  {text: 'No'},
                ],
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
            onPress={() => {
              onEdit();
              row[index].close();
            }}
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
      renderRightActions={() => renderActions(index)}
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
        onPress={() => (onPress ? onPress() : null)}
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
    backgroundColor: '#A52630',
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
