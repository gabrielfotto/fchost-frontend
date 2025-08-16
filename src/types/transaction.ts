import type { ETransactionType } from '@/enums/transaction-types'
import type { TInvoice } from './invoices'

export type TTransaction = {
	createdAt: Date
	type: ETransactionType
	value: number
	invoice: TInvoice
}
