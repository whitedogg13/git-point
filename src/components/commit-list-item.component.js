import React from 'react';
import { StyleSheet, TouchableHighlight, View } from 'react-native';
import { ListItem } from 'react-native-elements';

import { colors, fonts, normalize } from 'config';
import { t, relativeTimeToNow } from 'utils';

type Props = {
  commitNode: Object,
  locale: string,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingRight: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: colors.greyLight,
  },
  listItemContainer: {
    flex: 1,
    borderBottomWidth: 0,
  },
  title: {
    color: colors.primaryDark,
    ...fonts.fontPrimarySemiBold,
  },
  subtitle: {
    marginTop: 2,
    marginRight: -30,
    fontSize: normalize(12),
    fontWeight: '400',
    color: colors.greyBlue,
  },
});

export const CommitListItem = ({ commitNode, locale }: Props) => (
  <TouchableHighlight
    onPress={
      () => 0
      // navigation.navigate('Issue', {
      //   issue,
      //   isPR: !!issue.pull_request,
      //   locale,
      // })
    }
    underlayColor={colors.greyLight}
  >
    <View style={styles.container}>
      <ListItem
        containerStyle={styles.listItemContainer}
        title={commitNode.messageHeadline}
        subtitle={t('{user} committed {time} ago', locale, {
          user: commitNode.author.name,
          time: relativeTimeToNow(commitNode.author.date),
        })}
        leftIcon={{
          name: 'git-commit',
          size: 36,
          color: colors.green,
          type: 'octicon',
        }}
        hideChevron
        titleStyle={styles.title}
        subtitleStyle={styles.subtitle}
      />
    </View>
  </TouchableHighlight>
);
