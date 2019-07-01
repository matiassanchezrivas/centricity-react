import React from 'react';
import { Grid } from '@material-ui/core/';
import DynamoList from './DynamoList'
import _ from 'lodash'
import { axiosConfigurations } from '../../config/axios'

export default function SelectTables(props) {
    const { all_tables, all_persisted_tables, cloud_account_id, customer_id, fetchPersistedTables } = props;
    const [checked, setChecked] = React.useState([]);

    React.useEffect(() => {
        console.log('useEffect')
        let newChecked = [];
        all_tables.forEach(table => {
            if (_.findIndex(all_persisted_tables, (o) => o.table_name === table && o.active) !== -1) {
                newChecked.push(table)
            }
        })
        setChecked(newChecked)
    }, [all_tables, all_persisted_tables]);


    const handleToggle = value => async () => {
        const currentIndex = checked.indexOf(value);
        if (currentIndex === -1) {
            await updateTable(value, cloud_account_id, customer_id, true)
                .then(() => fetchPersistedTables(customer_id, cloud_account_id))
        } else {
            await updateTable(value, cloud_account_id, customer_id, false)
                .then(() => fetchPersistedTables(customer_id, cloud_account_id))
        }
    };

    const updateTable = async (tableName, cloud_account_id, customer_id, active) => {
        return axiosConfigurations.put('/updateConfigurationDynamoTableStatus', { tableName, cloud_account_id, customer_id, active })
    }

    return (<div>
        <Grid item xs={12}>
            <DynamoList all_persisted_tables={all_persisted_tables} all_tables={all_tables} handleToggle={handleToggle} checked={checked} />
        </Grid>
    </div>)
}