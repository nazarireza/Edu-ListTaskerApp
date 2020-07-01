import React, {useRef} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

export default ({
  color: backgroundColor,
  theme,
  title,
  items: {length: itemCount} = {length: 0},
  onPress,
  onGetPosition,
}) => {
  const isDark = theme === 'DARK';
  const color = isDark ? 'rgba(0,0,0,.9)' : '#FFFFFF';

  const element = useRef(null);
  const onLayout = () => {
    element.current.measure((fx, fy, width, height, px, py) => {
      onGetPosition?.({x: px, y: py, width, height});
    });
  };

  return (
    <TouchableOpacity
      ref={element}
      {...{onPress, onLayout}}
      activeOpacity={0.7}
      style={[styles.categoryContainer, {backgroundColor}]}>
      <Text style={[styles.categoryTitleText, {color}]}>{title}</Text>
      <Text
        style={[
          styles.categoryItemsCountText,
          {color},
        ]}>{`${itemCount} task`}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    borderRadius: 10,
    marginTop: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  categoryTitleText: {
    fontSize: 19,
    fontWeight: 'bold',
  },
  categoryItemsCountText: {
    opacity: 0.5,
    fontSize: 14,
  },
});
