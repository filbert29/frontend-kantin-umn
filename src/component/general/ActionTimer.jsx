import moment from "moment"
import { useTimer } from "react-timer-hook"

const ActionTimer = ({ time, onFinish }) => {
    const rejectTimer = useTimer({
        expiryTimestamp: moment(time) + 1000 * 60 * 10,
        autoStart: true,
        onExpire: () => {
            onFinish()
        }
    })

    return (
        <span>
            {rejectTimer.minutes}:{rejectTimer.seconds}
        </span>
    )
}

export default ActionTimer