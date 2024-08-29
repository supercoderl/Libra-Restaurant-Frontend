import { SingleResponse } from "@/type/objectTypes"
import { apiPost } from "../api"

const CLASS_ITEM_NAME = 'PaymentHistory'

export function updatePayment(body: any): Promise<SingleResponse | undefined> {
    return apiPost<SingleResponse>({
        url: `/${CLASS_ITEM_NAME}`,
        params: null
    }, body)
}