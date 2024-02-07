import { StyleSheet, View, ScrollView, ViewProps } from 'react-native';
import { Link, Typography } from '@/components';
import { TabsItemProps } from '@/typings';
import { useTabs } from '@/hooks';
import { isTrue } from '@/utils';

interface TabsProps extends ViewProps {
  activeKey?: any;
}

const Tabs = (props: TabsProps) => {
  const { style, ...restProps } = props;
  const { tabs, activeKey, setActiveKey } = useTabs(props);

  return (
    <View style={[{ flex: 1 }, style]} {...restProps}>
      <View>
        <ScrollView style={{ height: 58, flex: 0 }} contentContainerStyle={styles.tabs} horizontal>
          {tabs.map(({ key, title }) => {
            const isCurrent = activeKey === key;
            return (
              <Link
                style={styles.tab}
                onPress={() => setActiveKey(key)}
                key={key}
              >
                <Typography.Text color={isCurrent ? 'primary' : 'secondary'} strong={isCurrent}>{title}</Typography.Text>
              </Link>
            )
          })}
        </ScrollView>
      </View>
      <View style={styles.main}>
        {tabs.map(({ key, children }) => (
          <View style={[styles.content, isTrue(activeKey !== key, styles.hidden)]} key={key}>{children}</View>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  tabs: {
    height: 58,
    alignItems: 'center',
  },
  tab: {
    paddingHorizontal: 10,
  },
  main: {
    flex: 1,
    flexDirection: 'row',
  },
  content: {
    flex: 1,
  },
  hidden: {
    display: 'none'
  }
});

Tabs.Item = (props: TabsItemProps) => null;

export default Tabs;
