/**
 * 配列内の各オブジェクトに対して、null値を空文字列に変換する。
 * フォームのinputのデフォルト値valueにnullがセットされるのを防ぐために使用する。
 *
 * @param {Object[]} array - 変換するオブジェクトの配列。
 * @returns {Object[]} - null値が空文字列に変換された新しいオブジェクトの配列。
 */
export function convertNullToEmptyString(array) {
  return array.map(item => {
    const newItem = { ...item };
    Object.keys(newItem).forEach(key => {
      if (newItem[key] === null) {
        newItem[key] = '';
      }
    });
    return newItem;
  });
}
