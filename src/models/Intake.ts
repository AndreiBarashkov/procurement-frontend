export interface Order {
    description: string;
    unitPrice: number;
    amount: number;
    unit: string;
    totalPrice: number;
}

export type IntakeStatus = 'Open' | 'In Progress' | 'Closed';

export interface Intake {
    id: string;
    requestorName: string;
    title: string;
    vendorName: string;
    vatId: string;
    commodityGroup: string;
    department: string;
    totalCost: number;
    status: IntakeStatus;
    orders: Order[];
}

export interface OrderRequest {
    description: string;
    amount: number;
    unit: string;
    unitPrice: number;
}

export interface IntakeRequest {
    requestorName: string;
    title: string;
    vendorName: string;
    vatId: string;
    commodityGroup: string;
    department: string;
    orders: OrderRequest[];
}

