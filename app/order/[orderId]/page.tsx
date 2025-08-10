
import getOrder from "./get-order";
import OrderDetail from "./orderDetail"

export default async function OrderDetailPage({ params }: {params: Promise<{ orderId: string }>}) {
    const { orderId } = await params;
    console.log("Order Id: " + orderId)
    const foundOrder = await getOrder(+orderId)

    if (!foundOrder) {
        return <div>Order not found</div>
    }

    return <OrderDetail order={foundOrder} />
}
