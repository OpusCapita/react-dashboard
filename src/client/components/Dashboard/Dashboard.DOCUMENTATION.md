### Synopsis

Dashboard is
*Write here a short introduction and/or overview that explains **what** component is.*

### Props Reference

| Name                           | Type                    | Description                                                 |
| ------------------------------ | :---------------------- | ----------------------------------------------------------- |
| onChangeLayout                 | function (optional)     | Callback of signature <(layout) => any> which gets executed on every layout change.|
| layout                         | array of objects (optional) | React-grid configs for embedded widgets                 |

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

