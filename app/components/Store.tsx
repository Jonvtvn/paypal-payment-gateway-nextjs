import { useState, useEffect, useRef } from 'react';
import { Toast } from 'primereact/toast';
import { ModalConfirmBuy } from './ModalConfirmBuy';

interface StoreItem {
    id: number;
    title: string;
    original_price: number;
    Item_image: string;
}

interface Items {
    items: StoreItem[];
}

export const Store = () => {
    const [items, setItems] = useState<Items>({ items: [] });
    const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
    const toast = useRef<Toast>(null);
    useEffect(() => {
        const fakeItems: StoreItem[] = [
            {
                id: 1,
                title: 'Auriculares Sony WH-1000XM5',
                original_price: 349.99,
                Item_image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcS9B_7VS0NGnqKNWpLHNLL1wSTWRRw-iZ-ZjXGUMRJF7ZaEzYwREYcRChTgs1WBoSDGjmxdmReIXTPHQBaH_v1l0MYmXyqZNrTctUm63zqWItuGQ1R-p4n0tQ',
            },
            {
                id: 2,
                title: 'Teclado Mecánico Logitech G PRO X',
                original_price: 129.99,
                Item_image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSg6poJisTnnttlR7flm8TRfT97sFvIBzQ9d8qGEOZQ5oRA01gJ4LyBozJMqlTSpXFx3nBjw2TBBMlcU4GiFH3FMnZvlKkV3zL4iOIVqNqDT57XnNAnYKf8BQ',
            },
            {
                id: 3,
                title: 'Mouse Logitech MX Master 3S',
                original_price: 99.99,
                Item_image: 'data:image/webp;base64,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',
            },
            {
                id: 4,
                title: 'Monitor ASUS ROG Strix 27"',
                original_price: 399.99,
                Item_image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTL7FH5yZUQPav0dxj6lO5Bdd2BEav-qlOzK-AX3o79ha3ePPjBizZaueMT1iCuW1THVzMBNPXDfTRzHIgrQSjXwCnicqxiKwaVWgM83e9IInXrYF3qTSRt8g',
            },
            {
                id: 5,
                title: 'Webcam Logitech C920 HD Pro',
                original_price: 69.99,
                Item_image: 'data:image/webp;base64,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',
            },
        ];

        setItems({ items: fakeItems });
    }, []);






    const showSuccess = () => {
        toast.current?.show({ severity: 'success', summary: 'Compra Realizada', detail: 'Tus DynaCoins serán cargadas a la brevedad.', life: 5000 });
    }

    const showError = () => {
        toast.current?.show({ severity: 'error', summary: 'Error en la compra', detail: 'Vuelve a Intentarlo, o contactate con nosotros para ayudarte.', life: 5000 });
    }

    const openModal = (itemId: number) => {
        setSelectedItemId(itemId);
    };

    const closeModal = () => {
        setSelectedItemId(null);
    };

    return (
        <div className="p-4">
            <Toast ref={toast} />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {items.items.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-4 flex flex-col items-center text-center"
                    >
                        <img
                            src={item.Item_image}
                            alt={item.title}
                            className="w-full h-48 object-contain mb-4"
                        />
                        <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                        <p className="text-teal-600 font-bold text-md mt-2 mb-4">${item.original_price.toFixed(2)}</p>
                        <button
                            onClick={() => openModal(item.id)}
                            className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-full transition-colors"
                        >
                            Comprar
                        </button>

                        <ModalConfirmBuy
                            showError={showError}
                            isOpen={selectedItemId === item.id}
                            showSuccess={showSuccess}
                            closeModal={closeModal}
                            amount={item.original_price}
                            key={item.id}
                            title={item.title}
                        />
                    </div>
                ))}
            </div>
        </div>
    )

}