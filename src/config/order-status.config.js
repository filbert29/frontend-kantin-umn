const ORDER_STATUS = {
    created: {
        label: "Pending",
        color: "warning"
    },
    confirm: {
        label: "Dalam Proses",
        color: "secondary"
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
    complete: {
        label: "Selesai",
        color: "primary"
    },
    reject: {
        label: "Dibatalkan",
        color: "error"
    },
    rejected: {
        label: "Dibatalkan",
        color: "error"
    },
}

export default ORDER_STATUS;

        