# Myコーディング規約

## React

### Quotes

- JSX属性: ダブルクォート(`"`)
- その他全てのJS: シングルクォート(`'`)

例:

```jsx
<input
    type="text"
    id="name"
    name="name"
    value={data.name}
    className={`input-field ${errors.name ? 'is-invalid' : ''}`}
    onChange={e => setData('name', e.target.value)}
/>
```
