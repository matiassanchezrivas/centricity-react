import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button } from '@material-ui/core/';
import DynamoList from './DynamoList'
import _ from 'lodash'
import { axiosConfigurations } from '../../config/axios'
const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
});

export default function SelectTables(props) {
    const classes = useStyles();
    const { all_tables, all_persisted_tables, tableName, cloud_account_id, customer_id } = props;


    React.useEffect(() => {
        let newChecked = [];
        all_tables.forEach(table => {
            if (_.findIndex(all_persisted_tables, (o) => o.table_name === table && o.active) !== -1) {
                newChecked.push(table)
            }
        })
        setChecked(newChecked)
    }, [all_tables, all_persisted_tables]);

    const [checked, setChecked] = React.useState([]);

    const handleToggle = value => async () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
        console.log(value)

        if (currentIndex === -1) {
            await updateTable(value, cloud_account_id, customer_id, true)
                .then(() => newChecked.push(value))

        } else {
            await updateTable(value, cloud_account_id, customer_id, false)
                .then(() => newChecked.splice(currentIndex, 1))

        }
        console.log(newChecked)
        setChecked(newChecked);
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