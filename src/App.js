import React, {useRef, useState} from 'react';
import {StyleSheet, View, Text, StatusBar, ScrollView} from 'react-native';
import {currentList, categories} from './Constants';
import More from './assets/more.svg';
import CurrentListItem from './CurrentListItem';
import CategoryItem from './CategoryItem';
import CategoryDetail from './CategoryDetail';
import {useTimingTransition, mix} from 'react-native-redash';
import Animated, {Easing} from 'react-native-reanimated';

const App = () => {
  const categoriesLayout = useRef([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const progress = useTimingTransition(isOpen, {
    duration: 700,
    easing: Easing.bezier(0.1, 0.45, 0.2, 1),
  });

  const scale = mix(progress, 1, 0.9);
  const opacity = mix(progress, 1, 0.7);
  const borderRadius = mix(progress, 0, 16);

  return (
    <>
      <StatusBar hidden />
      <View style={styles.mainContainer}>
        <Animated.View
          style={[
            styles.container,
            {transform: [{scale}], opacity, borderRadius},
          ]}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContentContainer}>
            <Header />
            <CurrentList />
            <CategoryList
              onItemPress={(i) => {
                setSelectedIndex(i);
                setIsOpen(true);
              }}
              onGetItemPosition={({index, data}) => {
                categoriesLayout.current[index] = data;
              }}
            />
          </ScrollView>
        </Animated.View>
        <CategoryDetail
          {...{progress}}
          item={categories[selectedIndex]}
          startPosition={categoriesLayout.current[selectedIndex]}
          onDismiss={() => setIsOpen(false)}
        />
      </View>
    </>
  );
};

const Header = () => {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.titleText}>Today</Text>
      <More />
    </View>
  );
};

const CurrentList = () => {
  return currentList.map((item, index) => (
    <CurrentListItem key={`${index}`} {...item} theme="DARK" />
  ));
};

const CategoryList = ({onItemPress, onGetItemPosition}) => {
  return (
    <View style={styles.categoriesContainer}>
      <Text style={styles.categoriesTitleText}>Lists</Text>
      {categories.map((item, index) => (
        <CategoryItem
          key={`${index}`}
          {...item}
          onPress={() => onItemPress?.(index)}
          onGetPosition={(data) => {
            onGetItemPosition?.({index, data});
          }}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollContentContainer: {
    paddingVertical: 30,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 24,
  },
  titleText: {
    flex: 1,
    fontSize: 32,
    marginLeft: 48,
    color: '#252A31',
    fontWeight: 'bold',
  },
  categoriesContainer: {
    marginLeft: 58,
    marginRight: 16,
    marginTop: 32,
  },
  categoriesTitleText: {
    color: 'rgba(0,0,0,.3)',
    fontSize: 16,
    marginBottom: 7,
  },
});

export default App;
