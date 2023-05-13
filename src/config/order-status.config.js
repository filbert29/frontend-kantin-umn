const ORDER_STATUS = {
    created: {
        label: "Pending",
        color: "warning"
    },
    preparing: {
        label: "On Progress",
        color: "secondary"
    },
    ready: {
        label: "Ready to Pickup",
        color: "success"
    },
    completed: {
        label: "Completed",
        color: "primary"
    },
    rejected: {
        label: "Rejected",
        color: "error"
    }
}

export default ORDER_STATUS;

        