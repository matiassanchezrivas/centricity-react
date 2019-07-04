import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import { axiosCloudformation } from '../../config/axios'

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    margin: {
        margin: 8
    }
});

const columns = [
    { field: "date", title: "Date" },
    { field: "template_name", title: "Template Name" },
    { field: "stackname", title: "StackName" },
    { field: "parameters", title: "Parameters" },
    { field: "user_name", title: "Executed by" },
    { field: "cloud_account_name", title: "On Cloud Account" },
]

export default function ExecutionListView(props) {
    const [executions, setExecutions] = React.useState([])
    const [limit, setLimit] = React.useState(20)
    const [page, set] = React.useState(0)

    const { clickExecuteTemplate, currentClient } = props;

    const fetchExecutions = async () => {
        let ex = await axiosCloudformation.post('/getExecutions', { customer_id: currentClient.id }).then(response => response.data)
        ex = ex.map(execution => { execution.date = (new Date(execution.date)).toLocaleString(); return execution })
        setExecutions(ex);
    }

    const clickViewRow = () => { }

    React.useEffect(() => {
        fetchExecutions();
    }, [])

    return (<div>
        <MaterialTable
            title={`Execution logs registered on Customer: ${currentClient.name}`}
            columns={columns}
            data={executions}
            options={{ paginationType: "stepped" }}
            actions={[
                // ROW ACTIONS
                {
                    icon: 'play_circle_filled',
                    tooltip: 'Execute template',
                    onClick: clickExecuteTemplate,
                },
                {
                    icon: 'edit',
                    tooltip: 'Edit template',
                    onClick: clickViewRow,
                },
            ]}
        />
    </div>)
}