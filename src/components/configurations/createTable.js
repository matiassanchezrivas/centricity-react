import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, TextField, Divider, FormControl, MenuItem, IconButton, Button } from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
});

export default function CenteredTabs(props) {
    // const classes = useStyles();
    // const [value, setValue] = React.useState(0);
    const { newTable, addKey, deleteKey, handleChangeInside, confirmCreateTable } = props;

    return (<div>
        <Typography variant="h6">
            Create table
                </Typography>
        <Typography variant="subtitle1" id="simple-modal-description">
            Define table name and at least the primary key
                </Typography>

        <Grid item xs={12}>
            <TextField
                id="tableName"
                label="Name"
                style={{ width: '100%' }}
                // className={classes.textField}
                name='name'
                value={newTable.name}
                onChange={(e) => handleChangeInside(e, 'newTable')}
                margin="normal"
            />
        </Grid>
        {newTable && newTable.keys && newTable.keys.map((k, i) => {
            return <Grid container>
                <Grid item xs={6}>
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
                <Grid item xs={4}>
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
            onClick={addKey}
            style={{ width: '100%' }}
            variant="contained"
        >addKey</Button>
        <Button
            variant="contained" color="primary"
            onClick={confirmCreateTable}
            style={{ width: '100%' }}
        >Confirm</Button>
    </div>)


}