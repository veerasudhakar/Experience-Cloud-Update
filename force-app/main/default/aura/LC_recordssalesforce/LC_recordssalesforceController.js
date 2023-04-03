({
    doInit : function(component, event, helper) {
        var actions = [
            {label: 'View', Name: 'view'},
            {label: 'Edit', Name: 'edit'},
            {label: 'Delete', Name: 'delete'}
        ];
        component.set('v.mycolumns', [
            {label: 'Name', fieldName: 'courseName', },
            {label: 'AccountNumber', fieldName: 'name'},
            {label: 'Industry', fieldName: 'programType'},
            
            {type: 'action', typeAttributes: { rowActions: actions } } 
        ]);
        helper.pullData(component);
    },
    
    handleRowAction: function (component, event, helper) {
        var action = event.getParam('action');
        switch (action.Name) {
            case 'view':
                helper.viewRecord(component, event);
                break;
            case 'edit':
                helper.editRecord(component, event);
                break;
            case 'delete':
                helper.deleteRecord(component, event);
                break;
        }
    },
 })