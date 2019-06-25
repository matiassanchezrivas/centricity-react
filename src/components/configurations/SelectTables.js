import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button } from '@material-ui/core/';
import DynamoList from './DynamoList'
const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
});

export default function CenteredTabs(props) {
    const classes = useStyles();
    const { items } = props;
    const [checked, setChecked] = React.useState([]);

    const handleToggle = value => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const saveTables = () => {
        
    }

    return (<div>
        <Grid item xs={12}>
            <DynamoList items={items} handleToggle={handleToggle} checked={checked} />
            <Button onClick={saveTables}>Save</Button>
        </Grid>
    </div>)
}