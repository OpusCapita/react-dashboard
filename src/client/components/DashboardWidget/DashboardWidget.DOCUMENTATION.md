### Synopsis

DashboardWidget is component which

### Props Reference

| Name                           | Type                    | Description                                                 |
| ------------------------------ | :---------------------- | ----------------------------------------------------------- |
| className                      | string                  | Default behavior                                            |
| children                       | node                    | Default behavior                                            |
| collapsed                      | bool                    |                                                             |
| title                          | string                  | Title displayed in header                                   |
| onCollapse                       | func                    | Callback `(e) => {}` fires on press collapse toggle button   |

### Code Example

```
<div style={{ maxHeight: '300px', display: 'flex' }}>
  <DashboardWidget
    title="Approval status"
    collapsed={_scope.state.collapsed}
    onCollapse={_scope.toggleCollapse.bind(_scope)}
  >
    <div>
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>
      <ul>
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
      </ul>
          <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>
          <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>
          <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>
          <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>
          <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>
    </div>
  </DashboardWidget>
</div>
```

### Component Name

DashboardWidget

### License

Licensed by © 2017 OpusCapita
