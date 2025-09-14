import { useEffect, useState } from "react";

export default function Alert({ message }) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (message) {
            setShow(true);
            const timer = setTimeout(() => setShow(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    if (!show) return null;

    return (
        <div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">
            {message}
        </div>
    );
}
