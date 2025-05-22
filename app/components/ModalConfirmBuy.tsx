import { PayPalScriptProvider } from "@paypal/react-paypal-js"
import React from 'react';
import ButtonPaypal2 from "./ButtonPaypal2";

interface ModalProps {
    isOpen: boolean;
    closeModal: () => void;
    showSuccess: () => void;
    showError: () => void;
    amount?: number;
    title: string;
}

const ID_CLIENT = process.env.CLIENT_ID;

export const ModalConfirmBuy: React.FC<ModalProps> = ({ isOpen, closeModal, amount, title, showSuccess, showError }) => {
    const price = amount !== undefined ? parseFloat(amount.toFixed(2)) : 0;
    const comission = 5.4;
    const ppDolar = 0.3;
    const tax = ((price * comission) / 100) + ppDolar;
    const total = (price + tax).toFixed(2);

    const initialOptions = {
        clientId: ID_CLIENT || "",
        currency: "USD",
        intent: "capture",
        components: "buttons",
    };

    if (!ID_CLIENT) {
        console.error("El Client ID de PayPal no está configurado. Verifica tu archivo .env.");
        return null; // O renderiza un mensaje de error
    }
    return (
        <>
            {isOpen && (
                <div className="fixed z-[9999] top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                    <div className="absolute w-full h-full bg-neutral-900 opacity-80" onClick={closeModal}></div>
                    <div className="z-[9999] bg-white p-8 rounded-xl" style={{ width: "500px" }}>
                        <h2 className="text-2xl font-bold text-gray-800 text-center">Confirmar Compra</h2>
                        <div className="mt-5">

                            <div className="flex justify-between mt-5">
                                <p>Valor de {title}s:</p>
                                <p className="text-right">${price.toFixed(2)}</p>
                            </div>
                            <div className="flex justify-between mb-5">
                                <p>Cargo por servicio:</p>
                                <p className="text-right">${tax.toFixed(2)}</p>
                            </div>

                            <div className="flex justify-between my-4">
                                <p>Total:</p>
                                <p className="text-right">${total}</p>
                            </div>

                        </div>
                        <div className="mt-4 flex flex-col justify-end gap-2 text-white">
                            <PayPalScriptProvider options={initialOptions}>
                                <ButtonPaypal2 price={total} closeModal={closeModal} showSuccess={showSuccess} showError={showError} />
                            </PayPalScriptProvider>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};