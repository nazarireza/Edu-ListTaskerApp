import React from 'react';
import {StyleSheet, View, Text, StatusBar, ScrollView} from 'react-native';
import {currentList, categories} from './Constants';
import More from './assets/more.svg';
import CurrentListItem from './CurrentListItem';
import CategoryItem from './CategoryItem';
import CategoryDetail from './CategoryDetail';

const App = () => {
  return (
    <>
      <StatusBar hidden />
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContentContainer}>
            <Header />
            <CurrentList />
            <CategoryList onItemPress={(i) => console.log(`${i} Pressed!`)} />
          </ScrollView>
          {/* <CategoryDetail item={categories[3]} /> */}
        </View>
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

const CategoryList = ({onItemPress}) => {
  return (
    <View style={styles.categoriesContainer}>
      <Text style={styles.categoriesTitleText}>Lists</Text>
      {categories.map((item, index) => (
        <CategoryItem
          key={`${index}`}
          {...item}
          onPress={() => onItemPress?.(index)}
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
