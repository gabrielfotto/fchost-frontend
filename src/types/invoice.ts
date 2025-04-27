import type { EInvoiceStatus } from '@/enums/invoice-status'
import type { TAccount } from './account'

export type TInvoice = {
	// account: TAccount
	amount: number
	description: string
	// paymentType: string
	status: EInvoiceStatus
	cardLastDigits: string
	createdAt: string
}
