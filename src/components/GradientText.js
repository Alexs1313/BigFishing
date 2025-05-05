import MaskedView from '@react-native-masked-view/masked-view';
import React from 'react';
import {Text} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

const GradientText = ({colors, ...rest}) => {
  return (
    <MaskedView maskElement={<Text {...rest} />}>
      <LinearGradient colors={colors} start={{x: 1, y: 0}} end={{x: 1, y: 1}}>
        <Text
          {...rest}
          style={[
            rest.style,
            {
              opacity: 0,
            },
          ]}
        />
      </LinearGradient>
    </MaskedView>
  );
};

export default GradientText;
