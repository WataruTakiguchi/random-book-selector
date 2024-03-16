import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { fetchBookInfo } from '../bookInfoFetcher/bookInfoFetcher';

const mockAxios = new MockAdapter(axios);

describe('関数fetchBookInfoのテスト', () => {
  it('書籍の情報が正常に取得できること', async () => {
    // モックのセットアップ
    const mockData = [{ summary: { title: 'Sample Book', author: 'John Doe' } }];
    mockAxios.onGet(/https:\/\/api.openbd.jp\/v1\/get/).reply(200, mockData);

    // テスト実行
    const bookInfo = await fetchBookInfo();

    // 期待される結果
    const expectedBookInfo = { title: 'Sample Book', author: 'John Doe' };

    // 結果のアサーション
    expect(bookInfo).toEqual(expectedBookInfo);
  });

  it('書籍の情報が取得できなかった場合、リトライされること', async () => {
    // モックのセットアップ（404エラーを返す）
    mockAxios.onGet(/https:\/\/api.openbd.jp\/v1\/get/).reply(404);

    // テスト実行
    const promise = fetchBookInfo();

    // モックされたAPI呼び出しを待機することを確認
    await expect(promise).rejects.toThrow();

    // モックされたAPI呼び出しが2回以上行われたことを確認
    expect(mockAxios.history.get.length).toBeGreaterThan(1);
  });
});
