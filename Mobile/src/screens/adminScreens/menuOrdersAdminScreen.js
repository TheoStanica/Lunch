import React from 'react';
import {useSelector} from 'react-redux';
import {SafeAreaView, FlatList, StyleSheet, Text} from 'react-native';
import {Paragraph, Divider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const MenuOrdersAdminScreen = ({route}) => {
  const {orders, ordersById, allMenusById} = useSelector(state => ({
    ...state.ordersReducer,
    ...state.allMenusReducer,
  }));
  const {menuId} = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={orders.filter(order => ordersById[order].type === 'takeaway')}
        keyExtractor={order => order}
        renderItem={order => (
          <SafeAreaView>
            <SafeAreaView style={styles.flexDirectionRow}>
              <Icon name="account" size={25} color="black" />
              <Text style={styles.fullname}>
                {' '}
                {ordersById[order.item].userId.fullname} (
                {ordersById[order.item].userId.email})
              </Text>
            </SafeAreaView>
            <FlatList
              data={allMenusById[menuId].menu}
              keyExtractor={option => option.courseCategory}
              renderItem={option => (
                <SafeAreaView style={styles.course}>
                  <Paragraph style={styles.courseCategory}>
                    {option.item.courseCategory} -{' '}
                  </Paragraph>
                  <Paragraph style={styles.capitalizedText}>
                    {ordersById[order.item].menuOptions[
                      option.item.courseCategory
                    ] !== undefined
                      ? option.item.courses[
                          ordersById[order.item].menuOptions[
                            option.item.courseCategory
                          ]
                        ].description
                      : ''}
                  </Paragraph>
                </SafeAreaView>
              )}
            />
            <Divider style={styles.orderDivider} />
          </SafeAreaView>
        )}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF1CA',
  },
  course: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 20,
  },
  courseCategory: {
    fontSize: 16,
    textTransform: 'capitalize',
  },
  capitalizedText: {
    textTransform: 'capitalize',
  },
  fullname: {
    fontSize: 20,
  },
  flexDirectionRow: {
    marginLeft: 20,
    flexDirection: 'row',
    marginVertical: 10,
  },
  orderDivider: {
    marginTop: 10,
    borderWidth: 0.5,
    borderColor: '#4A6572',
    marginHorizontal: 10,
  },
});

export default MenuOrdersAdminScreen;
