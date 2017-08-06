### Synopsis

Dashboard is 
*Write here a short introduction and/or overview that explains **what** component is.*

### Props Reference

| Name                           | Type                    | Description                                                 |
| ------------------------------ | :---------------------- | ----------------------------------------------------------- |
| demoProp                       | string                  | Write a description of the property                         |

### Code Example

```
<Dashboard>
  <DashboardWidget
    id="attachements-1"  
    collapsed={true}
    w={2}
    h={4}
  >
    <Collapsible title="Attachements 1">
       <AttachementsList
         attachements={_scope.state.demoData.attachements}
       />
    </Collapsible>
  </DashboardWidget>

  <DashboardWidget
    id="attachements-2"
    collapsed={true}
    w={1}
    h={4}
  >
    <Collapsible title="Attachements 2">
       <AttachementsList
         attachements={_scope.state.demoData.attachements}
       />
    </Collapsible>
  </DashboardWidget>

  <DashboardWidget
    id="attachements-3"
    collapsed={true}
    w={1}
    h={4}
  >
    <Collapsible title="Attachements 3">
       <AttachementsList
         attachements={_scope.state.demoData.attachements}
       />
    </Collapsible>
  </DashboardWidget>

  <DashboardWidget
    id="attachements-4"
    collapsed={true}
    w={1}
    h={3}
  >
    <Collapsible title="Attachements 4">
       <AttachementsList
         attachements={_scope.state.demoData.attachements}
       />
    </Collapsible>
  </DashboardWidget>

  <DashboardWidget
    id="attachements-5"
    collapsed={true}
    w={1}
    h={1}
  >
    <Collapsible title="Attachements 5">
       <AttachementsList
         attachements={_scope.state.demoData.attachements}
       />
    </Collapsible>
  </DashboardWidget>

  <DashboardWidget
    id="attachements-6"
    collapsed={true}
    w={1}
    h={5}
  >
    <Collapsible title="Attachements 6">
       <AttachementsList
         attachements={_scope.state.demoData.attachements}
       />
    </Collapsible>
  </DashboardWidget>

  <DashboardWidget
    id="attachements-7"
    collapsed={true}
    w={1}
    h={1}
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

