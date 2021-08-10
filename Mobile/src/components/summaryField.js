import React from 'react';
import {StyleSheet} from 'react-native';
import {Card, Paragraph} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SummaryField = ({
  text,
  iconName,
  iconColor = '#4A6572',
  iconSize = 20,
}) => {
  return (
    <Card.Content style={styles.flexDirectionRow}>
      <Icon name={iconName} size={iconSize} color={iconColor} />
      <Paragraph> {text}</Paragraph>
    </Card.Content>
  );
};

const styles = StyleSheet.create({
  flexDirectionRow: {
    flexDirection: 'row',
  },
});

export default SummaryField;
