import * as burst_api from "../../../utils/api";
import {useState} from "@wordpress/element";
import Hyperlink from "../../../utils/Hyperlink";
import { __experimentalConfirmDialog as ConfirmDialog } from '@wordpress/components';
import {toast} from "react-toastify";

const ButtonControl = ({label, field, disabled}) => {
    const [ isOpen, setIsOpen ] = useState( false );

    let text = field.button_text ? field.button_text : field.label;

    if ( field.action ) {
        const clickHandler = async (e) => {
            if (field.warn) {
                setIsOpen( true );
            } else {
                await executeAction();
            }
        }

        const handleConfirm = async () => {
            setIsOpen( false );
            await executeAction();
        };

        const handleCancel = () => {
            setIsOpen( false );
        };

        const executeAction = async (e) => {
            let data = {};
            await burst_api.doAction(field.action, data).then((response) => {
                console.log(response);
                if (response.success) {
                    toast.success(response.message);
                }
            });
        }

        return (
            <>
                <button
                    className="burst-button burst-button--secondary"
                    disabled={disabled}
                    onClick={(e)=>clickHandler(e)}
                >{text}</button>
                <ConfirmDialog
                    isOpen={ isOpen }
                    onConfirm={ handleConfirm }
                    onCancel={ handleCancel }
                >
                    {field.warn}
                </ConfirmDialog>
            </>
        )
    } else {
        return (
            <Hyperlink className="burst-button burst-button--secondary" text={text} disabled={disabled} url={field.url}/>
        )
    }
}
export default ButtonControl
