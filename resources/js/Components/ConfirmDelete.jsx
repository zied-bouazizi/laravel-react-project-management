import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import DangerButton from "@/Components/DangerButton";

export default function ConfirmDelete({ 
    show = false, 
    onClose = () => {}, 
    onDelete = () => {}, 
    processing = false, 
    itemName = "item", 
    description = null,
    maxWidth = "md" 
}) {
    return (
        <Modal show={show} onClose={onClose} maxWidth={maxWidth}>
            <form 
                onSubmit={(e) => {
                    e.preventDefault();
                    onDelete();
                }}
                className="p-6"
            >
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Are you sure you want to delete this {itemName}?
                </h2>

                {description && (
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        {description}
                    </p>
                )}

                <div className="mt-6 flex justify-end">
                    <SecondaryButton onClick={onClose}>
                        Cancel
                    </SecondaryButton>

                    <DangerButton className="ms-3" disabled={processing}>
                        Delete {itemName}
                    </DangerButton>
                </div>
            </form>
        </Modal>
    );
}
