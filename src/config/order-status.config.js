const ORDER_STATUS = {
    created: {
        label: "Pending",
        color: "warning"
    },
    preparing: {
        label: "Dalam Proses",
        color: "secondary"
    },
    ready: {
        label: "Siap Diambil",
        color: "success"
    },
    completed: {
        label: "Selesai",
        color: "primary"
    },
    rejected: {
        label: "Dibatalkan",
        color: "error"
    }
}

export default ORDER_STATUS;

        