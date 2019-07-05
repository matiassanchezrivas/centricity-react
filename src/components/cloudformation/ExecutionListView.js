import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import { axiosCloudformation } from '../../config/axios'
import Modal from '../Modal'
import ExecutionLogsView from './ExecutionLogsView'

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
    const [openModal, setOpenModal] = React.useState(false)
    const [loadingLogs, setLoadingLogs] = React.useState(true)
    const [executeRow, setRow] = React.useState({})
    const [logs, setLogs] = React.useState({})

    const { clickExecuteTemplate, currentClient, clickViewRow, fetchStackEvents, stackEvents } = props;

    const fetchExecutions = async () => {
        let ex = await axiosCloudformation.post('/getExecutions', { customer_id: currentClient.id }).then(response => response.data)
        ex = ex.map(execution => { execution.originalDate = execution.date; execution.date = (new Date(execution.date)).toLocaleString(); return execution })
        setExecutions(ex);
    }

    const loadLogs = async (e, row) => {
        //LOADING
        setLoadingLogs(true)
        //FETCH
        let { stackname, originalDate, cloud_account_id } = row;
        setLogs({ stackname, cloud_account_id, date: originalDate });
        fetchStackEvents({ stackname, cloud_account_id, date: originalDate })
            .then(() => { setLoadingLogs(false); setOpenModal(true) })
            .catch(() => setLoadingLogs(false)) //setearError
    }

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
                {
                    icon: 'notes',
                    tooltip: 'View Stack Logs',
                    onClick: loadLogs,
                },
            ]}
        />
        <Modal
            open={openModal}
            handleClose={() => setOpenModal(false)}
        >
            <div>
                <ExecutionLogsView
                    executeRow={executeRow}
                    stackEvents={stackEvents}
                    fetchStackEvents={fetchStackEvents}
                    logs={logs}
                />
            </div>
        </Modal>
    </div>)
}