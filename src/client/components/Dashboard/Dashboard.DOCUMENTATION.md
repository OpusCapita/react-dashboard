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
    collapsed={false}
    w={2}
    h={1}
  >
    <Collapsible
       title="Attachements 1"
       collapsed={false}
       onCollapse={() => {}}
    >
       <AttachementsList
         attachements={_scope.state.demoData.attachements}
       />
    </Collapsible>
  </DashboardWidget>

  <DashboardWidget
    id="attachements-2"
    w={1}
    h={1}
  >
    <Collapsible
       title="Attachements 2"
       collapsed={false}
       onCollapse={() => {}}
    >
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

