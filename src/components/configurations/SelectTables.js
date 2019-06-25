import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button } from '@material-ui/core/';
import DynamoList from './DynamoList'
import _ from 'lodash'
const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
});

export default function SelectTables(props) {
    const classes = useStyles();
    const { all_tables, all_persisted_tables } = props;

    React.useEffect(() => {
        let newChecked = [];
        all_tables.forEach(table => {
            if (_.findIndex(all_persisted_tables, (o) => o.table_name === table && o.active) !== -1) {
                newChecked.push(table)
            }
        })
        console.log('newChecked', newChecked);
        setChecked(newChecked)
    }, [all_tables, all_persisted_tables]);

    const [checked, setChecked] = React.useState([]);

    const handleToggle = value => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        console.log(newChecked)
        setChecked(newChecked);
    };

    const saveTables = () => {

    }

    return (<div>
        <Grid item xs={12}>
            <DynamoList all_persisted_tables={all_persisted_tables} all_tables={all_tables} handleToggle={handleToggle} checked={checked} />
        </Grid>
    </div>)
}