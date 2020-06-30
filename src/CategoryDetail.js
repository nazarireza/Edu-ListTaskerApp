import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

import Edit from './assets/edit.svg';
import EditLight from './assets/edit_light.svg';
import CateogryListItem from './CurrentListItem';

const TOP_MARGIN = 60;

export default ({item: {color: backgroundColor, theme, title, items}}) => {
  return (
    <View style={[styles.container, {backgroundColor}]}>
      <View style={styles.indicator} />
      <View>
        <Header {...{theme, items, title}} />
        {items?.map((item, index) => (
          <CateogryListItem key={`${index}`} {...item} {...{theme}} />
        ))}
      </View>
    </View>
  );
};

const Header = ({theme, items, title}) => {
  const isDark = theme === 'DARK';
  const color = isDark ? 'rgba(0,0,0,.9)' : '#FFFFFF';
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerTextContainer}>
        <Text style={[styles.titleText, {color}]}>{title}</Text>
        <Text
          style={[
            styles.subTitleText,
            {color},
          ]}>{`${items?.length} tasks`}</Text>
      </View>
      {isDark ? <Edit /> : <EditLight />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    top: TOP_MARGIN,
    borderRadius: 8,
  },
  indicator: {
    width: 40,
    height: 5,
    marginTop: 7,
    backgroundColor: 'rgba(0,0,0,.2)',
    alignSelf: 'center',
    borderRadius: 3,
  },
  headerContainer: {
    flexDirection: 'row',
    marginLeft: 60,
    marginRight: 16,
    marginVertical: 16,
  },
  headerTextContainer: {
    flex: 1,
  },
  titleText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  subTitleText: {
    fontSize: 16,
    opacity: 0.5,
  },
});
