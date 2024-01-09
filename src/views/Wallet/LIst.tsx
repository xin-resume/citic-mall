import { useCallback } from 'react';
import { FlatList, ListRenderItemInfo, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Empty, Spin, Ticket, Link, Typography } from '@/components';
import { useInfiniteScroll } from '@/hooks';
import request from '@/utils/request';

interface ProductListProps {
  service: string;
  contentContainerStyle?: StyleProp<ViewStyle>
}

const WalletList = ({ service, contentContainerStyle }: ProductListProps) => {
  const [state, actions] = useInfiniteScroll(async (index: number) => {
    const result = await request.get<API.Ticket[]>(service, {
      pageIndex: index
    });
    return {
      data: result || [],
      count: (result as any)?.total,
    }
  });

  const renderItem = useCallback((info: ListRenderItemInfo<API.Ticket>) => {
    return (
      <Ticket
        ticket={info.item}
        disabled={info.item.state !== 1}
        extra={(
          <Link style={styles.button}>
            {info.item.state === 1 && (
              <LinearGradient style={styles.buttonInner} colors={['#ffaf31', '#ff8400']} end={{ x: 1, y: 0 }}>
                <Typography.Text size="small" color="white">去使用</Typography.Text>
              </LinearGradient>
            )}
          </Link>
        )}
      />
    )
  }, []);

  if (!state.data?.length) {
    return (
      <Spin spinning={state.loading}>
        <Empty
          style={styles.empty}
          image={require('@/assets/images/empty/ticket.png')}
          title="您还未领取过该类型卡券"
        />
      </Spin>
    )
  }

  return (
    <FlatList
      data={state.data}
      renderItem={renderItem}
      keyExtractor={(item) => `${item.id}`}
      onEndReachedThreshold={0.1}
      onEndReached={actions.loadMore}
      contentContainerStyle={contentContainerStyle}
    />
  )
}

const styles = StyleSheet.create({
  empty: {
    flex: 1,
    margin: 10,
    borderRadius: 6,
    paddingTop: 30,
    marginBottom: 0,
    backgroundColor: '#fff',
  },
  button: {
    width: 36,
  },
  buttonInner: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
    borderStartEndRadius: 4,
    borderEndEndRadius: 4,
  }
})

export default WalletList;
