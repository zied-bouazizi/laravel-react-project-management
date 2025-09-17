import { useState } from "react";

export default function useFlashAlert() {
    const [trigger, setTrigger] = useState(0);

    const flash = () => {
        setTrigger(prev => prev + 1);
    };

    return {
        trigger,
        flash,
    };
}
