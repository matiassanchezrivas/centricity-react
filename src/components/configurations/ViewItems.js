import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, FormControl, MenuItem, InputLabel, Select, Tabs, Tab, Paper } from '@material-ui/core/';
import TableViewer from '../TableViewer'
import EditTable from './CreateTable'
import { axiosConfigurations } from '../../config/axios'

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
    const { updateDynamoTableKeys, selectedTable, all_persisted_tables, fetchItems, keys, items, selectedAccount, currentClient, handleChange } = props;

    const [newTable, setNewTable] = React.useState({});
    const [tab, setTab] = React.useState("list");

    const addKey = () => {
        const tableKeys = [...newTable.keys];
        tableKeys.push(tableKeys.length ? { name: '', type: 'String' } : { name: '', type: 'String', primaryKey: true });
        let updatedNewTable = { ...newTable };
        updatedNewTable.keys = tableKeys;
        setNewTable(updatedNewTable);
    }

    const deleteKey = (i) => {
        let keysRemaining = [...newTable.keys];
        keysRemaining.splice(i, 1);
        let updatedNewTable = { ...newTable };
        updatedNewTable.keys = keysRemaining;
        setNewTable(updatedNewTable);
    }

    const handleChangeInside = (e, obj, type, i) => {
        const { value, name } = e.target;
        console.log(value, name)
        let updatedNewTable = { ...newTable };
        let tableKeys = [...newTable.keys];
        tableKeys = tableKeys.map((k, index) => (i === index) ? { ...k, [name]: value } : k)
        updatedNewTable.keys = tableKeys;
        setNewTable(updatedNewTable);
    }

    const confirmCreateTable = () => {
        if (!newTable.keys || !Array.isArray(newTable.keys) || newTable.keys.length <= 0) return;

        newTable.keys.map(k => {
            if (k.type === 'Number') k.type = 'N'
            else if (k.type === 'Binary') k.type = 'B'
            else k.type = 'S'
            return k
        })

        axiosConfigurations.put('/updateConfigurationDynamoTable', {
            customer_id: currentClient ? currentClient.id : null,
            cloud_account_id: selectedAccount,
            tableName: newTable.name,
            keys: JSON.stringify(newTable.keys),
            active: true
        }).then(() => {
            updateDynamoTableKeys(newTable.name)
        })
    }

    //Changes newTable name
    console.log('keys', keys)
    React.useEffect(() => {
        let updatedNewTable = { ...newTable };
        updatedNewTable.name = selectedTable
        setNewTable(updatedNewTable);
    }, [selectedTable]);

    React.useEffect(() => {
        if (!keys) {
            let updatedNewTable = { ...newTable };
            updatedNewTable.keys = [{ name: '', type: 'String', primaryKey: true }]
            setNewTable(updatedNewTable);
            setTab('edit')
        }
        else {
            const ks = keys.map(k => {
                if (k.type === 'N') k.type = 'Number'
                else if (k.type === 'B') k.type = 'Binary'
                else k.type = 'String'
                return k
            })
            let updatedNewTable = { ...newTable };
            updatedNewTable.keys = ks;
            setNewTable(updatedNewTable);
        }
    }, [keys]);

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
        <Grid item xs={12}>
            {selectedAccount && selectedTable && < div > <Paper position="static">
                <Tabs value={tab} onChange={(e, value) => setTab(value)} indicatorColor="primary"
                    textColor="primary"
                    centered>
                    <Tab disabled={!keys} value={"list"} label="List" wrapped />
                    <Tab value={"edit"} label="Edit keys" />
                </Tabs>
            </Paper>
                {tab === 'list' && keys && <TableViewer
                    fetchItems={fetchItems}
                    selectedTable={selectedTable}
                    keys={keys.map(key => key.name)}
                    columns={keys.map(key => {
                        return { title: key.name, field: key.name, type: key.type === 'N' ? 'numeric' : 'string' }
                    })}
                    data={items ? items.Items : []}
                    selectedAccount={selectedAccount}
                    currentClient={currentClient}
                />}

                {tab === 'edit' && <EditTable newTable={newTable} handleChangeInside={handleChangeInside} addKey={addKey} deleteKey={deleteKey} confirmCreateTable={confirmCreateTable} edition />}
            </div>}
        </Grid>

        {/* <Grid item xs={12} className={classes.margin}>

        </Grid> */}
    </div >)


}