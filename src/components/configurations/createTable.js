import React from 'react';
import { withStyles } from '@material-ui/styles';
import { Typography, Grid, TextField, Divider, FormControl, MenuItem, IconButton, Button } from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => ({
    root: {
        // JSS uses px as the default units for this CSS property.
        padding: 16, // = 8 * 2
    },
    margin: {
        margin: 8
    }
});

function CenteredTabs(props) {
    // const classes = useStyles();
    // const [value, setValue] = React.useState(0);
    const { newTable, addKey, deleteKey, handleChangeInside, confirmCreateTable, classes, edition } = props;

    return (<div className={classes.root} >
        <Typography variant="h6">
            {!edition && "Create table"}
            {edition && `Edit table ${newTable.name}`}
        </Typography>
        <Typography variant="subtitle1" id="simple-modal-description">
            {!edition && "Define table name and at least the primary key"}
            {edition && "The table you selected is not yet Define at least the primary key"}
        </Typography>

        <Grid item xs={12}>
            <TextField
                id="tableName"
                label="Name"
                style={{ width: '100%' }}
                className={classes.margin}
                name='name'
                value={newTable.name}
                disabled={!handleChangeInside}
                onChange={(e) => handleChangeInside(e, 'newTable')}
                margin="normal"
            />
        </Grid>
        {newTable && newTable.keys && newTable.keys.map((k, i) => {
            return <Grid container >
                <Grid item xs={6} className={classes.margin}>
                    <FormControl style={{ width: '100%' }}>
                        <TextField
                            label="Name"
                            name='name'
                            value={newTable.keys[i].name}
                            onChange={(e) => handleChangeInside(e, 'newTable', 'name', i)}
                            margin="normal"
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={4} className={classes.margin}>
                    <FormControl style={{ width: '100%' }}>
                        <TextField
                            select
                            label="Type"
                            name='type'
                            value={newTable.keys[i].type}
                            onChange={(e) => handleChangeInside(e, 'newTable', 'key', i)}
                            margin="normal"
                        >
                            {['String', 'Number', 'Binary'].map((option, i) => <MenuItem key={i} value={option}>{option}</MenuItem>)}

                        </TextField>
                    </FormControl>
                </Grid>

                {i !== 0 && <IconButton onClick={(e) => deleteKey(i)} aria-label="Delete">
                    <DeleteIcon />
                </IconButton>}
                <Divider />
            </Grid>

        })}
        <Button
            className={classes.margin}
            onClick={addKey}
            style={{ width: '100%' }}
            variant="contained"
        >addKey</Button>
        <Button
            className={classes.margin}
            variant="contained" color="primary"
            onClick={confirmCreateTable}
            style={{ width: '100%' }}
        >{edition ? "Save" : "Confirm"}</Button>
    </div>)


}

export default withStyles(styles)(CenteredTabs);