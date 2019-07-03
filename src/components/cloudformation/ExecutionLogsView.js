import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Tabs, Tab, AppBar, Container, Typography } from '@material-ui/core';
import MaterialTable from 'material-table';

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
    const { logs, selectedLogTab, executeRow, stackEvents, onChangeTab, fetchStackEvents } = props;
    const indexSelectedLogTab = logs.cloud_accounts.indexOf(selectedLogTab);

    const updateLogs = (cloud_account_id) => {
        if (!logs) return
        const { stackName, date } = logs;
        if (!stackName || !cloud_account_id) return
        fetchStackEvents({ stackName, cloud_account_id, date })
    }

    return (<Container>
        <AppBar position="static" color="default">
            <Tabs
                value={selectedLogTab}
                onChange={onChangeTab}
                indicatorColor="primary"
                textColor="primary"
                variant="scrollable"
                scrollButtons="auto"
            >
                {logs.cloud_accounts.map((ca_id) => <Tab value={ca_id} label={executeRow.cloudAccounts.find(ca => (ca.id == ca_id)).name} />)}
            </Tabs>
        </AppBar>
        {logs.cloud_accounts_responses[indexSelectedLogTab].error && <Typography>{logs.cloud_accounts_responses[indexSelectedLogTab].error.message}</Typography>}
        {!logs.cloud_accounts_responses[indexSelectedLogTab].error && <MaterialTable
            title={`Execution logs from ${logs.stackName}`}
            columns={['ResourceStatus', 'LogicalResourceId', 'PhysicalResourceId', 'ResourceType', 'ResourceProperties', 'ResourceStatusReason', 'Timestamp'].map(a => ({ field: a, title: a }))}
            data={stackEvents}
            actions={[
                //FREE ACTIONS
                {
                    icon: 'update',
                    tooltip: 'Force update',
                    onClick: () => updateLogs(selectedLogTab),
                    isFreeAction: true
                },
            ]}
        />}
    </Container>)
}