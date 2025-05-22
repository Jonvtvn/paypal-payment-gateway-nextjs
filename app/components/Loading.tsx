import { ProgressSpinner } from 'primereact/progressspinner';
import React from 'react';

export default function Loading() {
    return (
        <div style={{ height: 'calc(70vh - 70px)' }} className="top-0 left-0 w-full bg-opacity-80 flex justify-center items-center z-50">
            <div className='flex content-center justify-center flex-col flex-wrap items-center'>
                <ProgressSpinner style={{ width: '70px', height: '70px', stroke: 'white' }} strokeWidth="5" fill="var(--surface-ground)" animationDuration="1.0s" />
                <p className='mt-5'>Cargando Tienda...</p>
            </div>
        </div>
    )
}