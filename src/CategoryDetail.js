import React from 'react';
import {View, StyleSheet, Text, useWindowDimensions} from 'react-native';

import Edit from './assets/edit.svg';
import EditLight from './assets/edit_light.svg';
import CateogryListItem from './CurrentListItem';
import {mix, useValue, onGestureEvent, timing} from 'react-native-redash';
import CategoryItem from './CategoryItem';
import Animated, {
  interpolate,
  Extrapolate,
  useCode,
  cond,
  eq,
  set,
  sub,
  add,
  min,
  max,
  lessThan,
  call,
  greaterOrEq,
} from 'react-native-reanimated';
import {PanGestureHandler, State} from 'react-native-gesture-handler';

const TOP_MARGIN = 60;
const DISTANCE_FOR_DISMISS = 200;

export default ({
  item: {color: backgroundColor, theme, title, items},
  progress,
  startPosition: {x, y, width: elementWidth, height: elementHeight} = {},
  onDismiss,
}) => {
  const opacity = interpolate(progress, {
    inputRange: [0, 0.01],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP,
  });
  const summaryOpacity = interpolate(progress, {
    inputRange: [0, 0.5],
    outputRange: [1, 0],
    extrapolate: Extrapolate.CLAMP,
  });
  const bodyOpacity = interpolate(progress, {
    inputRange: [0.7, 1],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP,
  });
  const state = useValue(State.UNDETERMINED);
  const translationY = useValue(0);
  const translateY = useValue(0);
  const {width: appWidth, height: appHeight} = useWindowDimensions();
  const width = mix(progress, elementWidth, appWidth);
  const height = mix(progress, elementHeight, appHeight - TOP_MARGIN);
  const left = mix(progress, x, 0);
  const top = mix(progress, y, add(TOP_MARGIN, translateY));

  useCode(() => {
    return cond(
      eq(state, State.ACTIVE),
      [
        set(translateY, max(0, translationY)),
        cond(
          greaterOrEq(translateY, DISTANCE_FOR_DISMISS),
          call([], onDismiss),
        ),
      ],
      cond(
        eq(state, State.END),
        cond(
          lessThan(translateY, DISTANCE_FOR_DISMISS),
          set(translateY, timing({from: translationY, to: 0, duration: 200})),
        ),
      ),
    );
  }, []);

  useCode(
    () =>
      cond(eq(progress, 0), [
        set(translateY, 0),
        set(state, State.UNDETERMINED),
      ]),
    [],
  );

  const pointerEvents = cond(eq(progress, 1), 'auto', 'none');

  return (
    <PanGestureHandler {...onGestureEvent({state, translationY})}>
      <Animated.View
        {...{pointerEvents}}
        style={[
          styles.container,
          {backgroundColor, opacity, width, height, left, top},
        ]}>
        <View style={styles.indicator} />
        <Animated.View style={{opacity: bodyOpacity}}>
          <Header {...{theme, items, title}} />
          {items?.map((item, index) => (
            <CateogryListItem key={`${index}`} {...item} {...{theme}} />
          ))}
        </Animated.View>
        <Animated.View
          style={[styles.summaryContainer, {opacity: summaryOpacity}]}>
          <CategoryItem {...{color: backgroundColor, items, title, theme}} />
        </Animated.View>
      </Animated.View>
    </PanGestureHandler>
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
  summaryContainer: {
    ...StyleSheet.absoluteFillObject,
    top: -8,
  },
});
