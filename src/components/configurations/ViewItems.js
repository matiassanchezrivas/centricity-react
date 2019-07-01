import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, FormControl, MenuItem, InputLabel, Select } from '@material-ui/core/';
import TableViewer from '../TableViewer'
const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    margin: {
        margin: 8
    }
});


export default function CenteredTabs(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const { selectedTable, all_persisted_tables, fetchItems, keys, items, selectedAccount, currentClient, handleChange } = props;

    return (<div>
        <Grid item xs={12} className={classes.margin}>
            <FormControl style={{ width: '100%' }}>
                <InputLabel >Select a table</InputLabel>
                <Select
                    name='selectedTable'
                    value={selectedTable}
                    onChange={(e) => handleChange(e)}
                >
                    {all_persisted_tables.map((option, i) => (option.active) ? <MenuItem key={i} value={option.table_name}>{option.table_name}</MenuItem> : null)}
                </Select>
            </FormControl>
        </Grid>
        <Grid item xs={12} className={classes.margin}>
            <TableViewer
                fetchItems={fetchItems}
                selectedTable={selectedTable}
                keys={keys.map(key => key.name)}
                columns={keys.map(key => {
                    return { title: key.name, field: key.name, type: key.type === 'N' ? 'numeric' : 'string' }
                })}
                data={items ? items.Items : []}
                selectedAccount={selectedAccount}
                currentClient={currentClient}
            />
        </Grid>
    </div>)


}