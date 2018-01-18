### Synopsis

Dashboard is a dynamic grid of widgets. Positions of widgets on grid are defined by `layout` prop.

`layout` is an array of objects, where each object defines size and dimentions of a single widget.

Its shape is the following:

```
{
  "i": 'id' of the widget; every widget must have unique 'id' attribute set,
  "h": widget height,
  "w": widget width,
  "x": widget x position,
  "y": widget y position
}
```

`x`, `y`, `w` and `h` are relative values.

Horizontal axis has 12 columns, so `w` can span from 1 to 12 (and `x` makes sense from 0 to 11). If `w = 12` the widget will take all available width. If `w = 6` it'll take a half of width; `w = 2` corresponds to a widget which takes up `1/6` of available width. `h` is also a relative value: widget with `h = 2` twice as big as widget with `h = 1`.

`x` and `y` are used for positioning on the grid. Top left corner is `x = 0, y = 0` point, `x` is horizontal axis and `y` is vertical axis. By default `x = 0`. It means that if `x` is not defined the widget will stick to the left side of a page.

For example, two adjusted widgets can be described as `x = 0, y = 0, w = 6, h = 4` and `x = 6, y = 0, w = 6, h = 4`. If you need to center a widget with width equal to 1/3 of available width, you can define it like `x = 4, y = 0, w = 4, h = 3` - note `x = 4` to move widget 4 columns to the right, and `w = 4` to set its width to 1/3 of a screen width (4/12 = 1/3).

### Props Reference

| Name                           | Type                    | Description                                                 |
| ------------------------------ | :---------------------- | ----------------------------------------------------------- |
| onChangeLayout                 | function (optional)     | Callback of signature <(layout) => any> which gets executed on every layout change.|
| layout                         | array of objects (optional) | React-grid configs for embedded widgets                 |
| breakpoints                     | object                  | Object of shape `{ lg: 1200, md: 992, sm: 768, xs: 576, xxs: 0 }` |
| breakpoint                      | string                  | A screen size breakpoint when layout falls back to a skyscraper. One of 'lg', 'md', 'sm', 'xs', 'xxs'. |

### Code Example

```
<Dashboard
  onChangeLayout={layout => console.log({ layout })}
  layout={[
    {
      "i": "attachements-1",
      "h": 4,
      "w": 3,
      "x": 0,
      "y": 0
    },
    {
      "i": "attachements-2",
      "h": 4,
      "w": 3,
      "x": 0,
      "y": 7
    },
    {
      "i": "attachements-3",
      "h": 4,
      "w": 3,
      "x": 6,
      "y": 7
    },
    {
      "i": "attachements-4",
      "h": 4,
      "w": 3,
      "x": 3,
      "y": 0
    },
    {
      "i": "attachements-5",
      "h": 4,
      "w": 3,
      "x": 3,
      "y": 7
    },
    {
      "i": "attachements-6",
      "h": 3,
      "w": 9,
      "x": 0,
      "y": 4
    },
    {
      "i": "attachements-7",
      "h": 4,
      "w": 3,
      "x": 6,
      "y": 0
    }
  ]}
>
  <DashboardWidget
    id="attachements-1"
  >
    <Collapsible title="Attachements 1">
       <AttachementsList
         attachements={_scope.state.demoData.attachements}
       />
    </Collapsible>
  </DashboardWidget>

  <DashboardWidget
    id="attachements-2"
  >
    <Collapsible title="Attachements 2">
       <AttachementsList
         attachements={_scope.state.demoData.attachements}
       />
    </Collapsible>
  </DashboardWidget>

  <DashboardWidget
    id="attachements-3"
  >
    <Collapsible title="Attachements 3">
       <AttachementsList
         attachements={_scope.state.demoData.attachements}
       />
    </Collapsible>
  </DashboardWidget>

  <DashboardWidget
    id="attachements-4"
  >
    <Collapsible title="Attachements 4">
       <AttachementsList
         attachements={_scope.state.demoData.attachements}
       />
    </Collapsible>
  </DashboardWidget>

  <DashboardWidget
    id="attachements-5"
  >
    <Collapsible title="Attachements 5">
       <AttachementsList
         attachements={_scope.state.demoData.attachements}
       />
    </Collapsible>
  </DashboardWidget>

  <DashboardWidget
    id="attachements-6"
  >
    <Collapsible title="Attachements 6">
       <AttachementsList
         attachements={_scope.state.demoData.attachements}
       />
    </Collapsible>
  </DashboardWidget>

  <DashboardWidget
    id="attachements-7"
  >
    <Collapsible title="Attachements 7">
       <AttachementsList
         attachements={_scope.state.demoData.attachements}
       />
    </Collapsible>
  </DashboardWidget>

</Dashboard>
```

### Component Name

Dashboard

### License

Licensed by © 2017 OpusCapita

