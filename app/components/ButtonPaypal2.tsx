import React, { useRef, useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { Toast } from 'primereact/toast';

interface AppProps {
    price?: string; // Parámetro de precio
    closeModal: () => void;
    showSuccess: () => void;
    showError: () => void;
}

const ButtonPaypal2: React.FC<AppProps> = ({ price, closeModal, showSuccess, showError }) => {
    const [scriptLoaded, setScriptLoaded] = useState(false);

    const addPaypalScript = () => {
        if (window.paypal) {
            setScriptLoaded(true);
            return;
        }
        const script = document.createElement("script");
        script.src = "https://www.paypal.com/sdk/js?client-id=AZ5C-Gw8a5RACIX7TkCkmzRsSTcZBWAIHvIrz_ZSrg2dbEpEH57h5QYX7r4MbhBf8tF1HiekDERAE8WH";
        script.type = "text/javascript";
        script.async = true;
        script.onload = () => setScriptLoaded(true);
        document.body.appendChild(script);
    };

    const createOrder = (data: any, actions: any) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: price
                    }
                }
            ]
        });
    };

    const onApprove = async (data: any, actions: any) => {
        const order = await actions.order?.capture();
        console.log(order)

        try {
            showSuccess();
        } catch (error) {
            console.error("Error al procesar la orden:", error);
            showError();
        } finally {
            closeModal();
        }
    };

    if (!scriptLoaded) {
        addPaypalScript();
    }

    return (
        <>
            {scriptLoaded && (
                <PayPalButtons
                    style={{
                        layout: "horizontal",
                        shape: "pill",
                        label: "buynow"
                    }}
                    createOrder={createOrder}
                    onApprove={onApprove}
                />
            )}
        </>
    );
};

export default ButtonPaypal2;