"use client"
import React, { useState, useEffect } from "react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Loading from "./Loading";
import { Store } from "./Store";

// Componente de carga

export const Offers = () => {
    const [scriptLoaded, setScriptLoaded] = useState(false);

    useEffect(() => {
        const handleRouteChange = () => {
            const pathname = window.location.pathname;
            if (pathname === "/") {
                const script = document.createElement("script");
                script.src = "https://www.paypal.com/sdk/js?client-id=AZ5C-Gw8a5RACIX7TkCkmzRsSTcZBWAIHvIrz_ZSrg2dbEpEH57h5QYX7r4MbhBf8tF1HiekDERAE8WH";
                script.type = "text/javascript";
                script.async = true;
                script.onload = () => setScriptLoaded(true);
                document.body.appendChild(script);

                return () => {
                    if (script.parentNode) {
                        script.parentNode.removeChild(script);
                        setScriptLoaded(false);
                    }
                };
            } else {
                const script = document.querySelector('script[src="https://www.paypal.com/sdk/js?client-id=AZ5C-Gw8a5RACIX7TkCkmzRsSTcZBWAIHvIrz_ZSrg2dbEpEH57h5QYX7r4MbhBf8tF1HiekDERAE8WH"]');
                if (script && script.parentNode) {
                    script.parentNode.removeChild(script);
                    setScriptLoaded(false);
                }
            }
        };

        // Check current route on mount
        handleRouteChange();

        // Listen for route changes
        window.addEventListener('popstate', handleRouteChange);
        window.addEventListener('pushstate', handleRouteChange);

        return () => {
            window.removeEventListener('popstate', handleRouteChange);
            window.removeEventListener('pushstate', handleRouteChange);
        };
    }, []);

    return (
        <PayPalScriptProvider
            options={{
                clientId: process.env.CLIENT_ID ?? "",
                components: "buttons",
                currency: "USD"
            }}
        >
            {scriptLoaded ? <Store /> : <Loading />}
        </PayPalScriptProvider>
    );
};
